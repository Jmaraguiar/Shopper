
import { OrderInterfaceDTO } from "../controller/interfaces/OrderInterfaceDTO";
import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "./errors/CustomError";


export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase
    ){}

    public makeOrder = async (input: OrderInterfaceDTO) => {

        const {order,price} = input
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

        //Formatar lista em JSON

        // Criar Pedido Formatado
        
        // Adicionar Pedido ao DB

        console.log(order)
    }

    public AddProduct = async () => {
        
    }

    public populate = async () => {
        
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