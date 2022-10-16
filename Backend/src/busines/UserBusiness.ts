import { AddItem } from "../controller/interfaces/AddProductInterfaceDTO";
import { OrderInterfaceDTO } from "../controller/interfaces/OrderInterfaceDTO";
import { UpdateOrderDTO } from "../controller/interfaces/UpdateOrderDTO";
import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "./errors/CustomError";
import { IdGenerator } from "./services/IdGenerator";
import { Order } from "./types";


export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator
    ){}

    public makeOrder = async (input: OrderInterfaceDTO) => {

        const {order,price, userName,date,address} = input
        // verificações
        if(!order || !price || price === 0 || !userName || !date || !address){
            throw new CustomError(400,"Pedido ou preço faltando")
        }

        

        // atualizar estoque
        for(let item of order){
            // pegar item no estoque pelo nome
            let product = await this.userDatabase.getProductByName(item.name)

            // checar disponibilidade dos produtos
            if(item.qty > product.qty_stock){
                throw new CustomError(500,`quantidade requisitada do produto ${item.name}, exede a quantidade de estoque`);
            }
        }

        for(let item of order){

            let product = await this.userDatabase.getProductByName(item.name)

            // subtrair quantidade
            let newQty = product.qty_stock - item.qty
            
            // atualizar estoque
            await this.userDatabase.updateProductQtyByName(item.name, newQty)
        }

        //Criar Pedido Formatado com lista em JSON.stringfy
        const id = this.idGenerator.generateId()
        const newOrder = {
            id,
            userName,
            order: JSON.stringify(order),
            price,
            date,
            address
        }

        // Adicionar Pedido ao DB
        await this.userDatabase.insertOrder(newOrder)
        return id
    }

    public AddProducts = async (products: AddItem[]) => {
        if(!products || products[0] == undefined){
            throw new CustomError(400,'Nenhum produto enviado');
        }

        for(let item of products){
            await this.userDatabase.insertProduct(item)
        }

    }

    public populate = async (data:any) => {
        this.userDatabase.populate(data)
    }

    public orderCompleteUpdate = async (id: string) => {

        if(!id ){
            throw new CustomError(400,"Id não foi passada como parametro ou foi passado de forma incorreta");
        }

        await this.userDatabase.orderCompleteUpdate(id)
    }

    public UpdateOrder = async (input: UpdateOrderDTO) => {
        const {id,order,price,date} = input

        if(!id || !order || !price || !date || !input){
            throw new CustomError(400,"Id não foi passada como parametro ou foi passado de forma incorreta");
        }

        const oldOrder: Order = await this.userDatabase.getOrdersById(id)

        if (!oldOrder) {
            throw new CustomError(404,"Pedido não encontrado");  
        }

        if(oldOrder.complete !== 0){
            throw new CustomError(404,"O pedido ja foi processado e entregue ao destinatário, portanto não pode ser deletado");
        }

        const oldOrderList = JSON.parse(oldOrder.order)
        console.log(oldOrderList)
        console.log(order)

        for(let item of oldOrderList){

            // pegar Produto pelo nome
            const product = await this.userDatabase.getProductByName(item.name)
            console.log(product)
            // Devolver o valor da quatidade do pedido removido
            const newQty = Number(product.qty_stock) + Number(item.qty)
            console.log(product.qty_stock, item.qty)

            // adicionar nova quantidade aos produtos no DB
            await this.userDatabase.updateProductQtyByName(item.name, newQty)

        }

        for(let item of order){
            // pegar item no estoque pelo nome
            let product = await this.userDatabase.getProductByName(item.name)

            // checar disponibilidade dos produtos
            if(item.qty > product.qty_stock){
                throw new CustomError(500,`quantidade requisitada do produto ${item.name}, exede a quantidade de estoque`);
            }
        }

        for(let item of order){

            let product = await this.userDatabase.getProductByName(item.name)

            // subtrair quantidade
            let newQty = Number(product.qty_stock) - Number(item.qty)
            console.log(product.qty_stock, item.qty, newQty)
            
            // atualizar estoque
            await this.userDatabase.updateProductQtyByName(item.name, newQty)
        }   
            await this.userDatabase.UpdateOrder(input)
        
    }

    public getAllOrders = async () => {
        let treatedOrders = []

        const orders: any = await this.userDatabase.getallOrders()
        for(let item of orders){
            item = {...item, order: JSON.parse(item.order)}
            treatedOrders.push(item)
        }

        return treatedOrders
    }

    public getAllProducts = async () => {
        const products = await this.userDatabase.getallProducts()
        return products
    }

    public delOrder = async (id: string) => {

        if(!id){
            throw new CustomError(400,"Id não foi passada como parametro ou foi passado de forma incorreta");
        }

        const order: Order = await this.userDatabase.getOrdersById(id)

        if (!order) {
            throw new CustomError(404,"Pedido não encontrado");  
        }

        if(order.complete !== 0){
            throw new CustomError(404,"O pedido ja foi processado e entregue ao destinatário, portanto não pode ser deletado");
        }

        const orderList = JSON.parse(order.order)

        for(let item of orderList){

            // pegar Produto pelo nome
            const product = await this.userDatabase.getProductByName(item.name)

            // Devolver o valor da quatidade do pedido removido
            const newQty = product.qty_stock + item.qty

            // adicionar nova quantidade aos produtos no DB
            await this.userDatabase.updateProductQtyByName(item.name, newQty)

        }

        await this.userDatabase.delOrderByID(id)
    }

    public removeProduct = async (id: number) => {
        
        if(!id || id == NaN){
            throw new CustomError(400,"Id não foi passada como parametro ou foi passado de forma incorreta");
        }

        await this.userDatabase.removeProductByID(id)

    }
}