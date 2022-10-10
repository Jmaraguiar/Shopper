import { AddItem } from "../controller/interfaces/AddProductInterfaceDTO";
import { OrderInterfaceDTO } from "../controller/interfaces/OrderInterfaceDTO";
import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "./errors/CustomError";


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
            await this.userDatabase.updateProductByName(item.name, newQty)
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

    public delOrder = async () => {
        
    }

    public removeProduct = async () => {
        
    }
}