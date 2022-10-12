import { AddItem } from "../controller/interfaces/AddProductInterfaceDTO";
import { OrderInterfaceDTO } from "../controller/interfaces/OrderInterfaceDTO";
import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "./errors/CustomError";
import { Order } from "./types";


export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase
    ){}

    public makeOrder = async (input: OrderInterfaceDTO) => {

        const {order,price, userName} = input
        // verificações
        if(!order || !price || price === 0){
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
        const newOrder = {
            userName,
            order: JSON.stringify(order),
            price
        }

        // Adicionar Pedido ao DB
        this.userDatabase.insertOrder(newOrder)
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

    public updateOrder = async () => {
        
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

    public delOrder = async (id: number) => {

        if(!id || id == NaN){
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