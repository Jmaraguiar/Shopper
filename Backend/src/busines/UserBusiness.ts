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
        order.forEach(item=>{
            // pegar item no estoque pelo nome
            // subtrair quantidade
            // atualizar estoque
        })

        //Criar Pedido Formatado com lista em JSON.stringfy
        const newOrder = {
            userName,
            order: JSON.stringify(order),
            price
        }

        // Adicionar Pedido ao DB
        this.userDatabase.insertOrder(newOrder)
    }

    public AddProduct = async () => {
        
    }

    public populate = async (data:any) => {
        this.userDatabase.populate(data)
    }

    public updateOrder = async () => {
        
    }

    public getOrders = async () => {
        
    }

    public delOrder = async () => {
        
    }

    public removeProduct = async () => {
        
    }
}