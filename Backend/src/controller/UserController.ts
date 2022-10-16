import { Request, Response } from "express";
import { UserBusiness } from "../busines/UserBusiness";
import { OrderInterfaceDTO } from "./interfaces/OrderInterfaceDTO";
import data from '../productsList.json'
import { AddItem } from "./interfaces/AddProductInterfaceDTO";
import { UpdateOrderDTO } from "./interfaces/UpdateOrderDTO";



export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ){}

    public makeOrder = async (req: Request, res: Response) => {
        try {
            const {order, price, userName,date,address} = req.body 
            const input: OrderInterfaceDTO = {
                userName,
                order,
                price,
                date,
                address
            }
            const productID = await this.userBusiness.makeOrder(input)
            res.status(201).send({productID,message: "Pedido Realizado e armazenado com sucesso!"})

        } catch (error:any) {
            res.status(500).send(error.message)
        }
    }

    public AddProducts = async (req: Request, res: Response) => {
        try {

            const {products} = req.body

            await this.userBusiness.AddProducts(products)
            res.status(201).send("Produto adicionado com sucesso")

        } catch (error:any) {
            res.status(error.statusCode).send(error.message)
        }
    }

    public populate = async (req: Request, res: Response) => {
        try {

            this.userBusiness.populate(data)
            res.status(200).send('ok')
            
        } catch (error:any) {
            res.status(error.statusCode || 500).send(error.message)
        }
    }

    public orderCompleteUpdate = async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            
            await this.userBusiness.orderCompleteUpdate(id)
            res.status(200).send("Pedido entregue e concluído")

        } catch (error:any) {
            res.status(error.statusCode || 500).send(error.message)
        }
    }

    public UpdateOrder = async (req: Request, res: Response) => {
        try {
            const {id,date,order,price} = req.body

            const input: UpdateOrderDTO = {
                id,
                date,
                order,
                price
            }
            
            await this.userBusiness.UpdateOrder(input)
            res.status(200).send("Pedido alterado com sucesso")

        } catch (error:any) {
            res.status(error.statusCode || 500).send(error.message)
        }
    }

    public getAllOrders = async (req: Request, res: Response) => {
        try {
            
            const orders = await this.userBusiness.getAllOrders()
            res.status(200).send({orders, message: "Pedidos encontrados com sucesso"})

        } catch (error:any) {
            res.status(error.statusCode || 500).send(error.message)
        }
    }

    public getAllProducts = async (req: Request, res: Response) => {
        try {
            
            const products = await this.userBusiness.getAllProducts()
            res.status(200).send({products,message: 'Produtos encontrados com sucesso'})

        } catch (error:any) {
            res.status(error.statusCode || 500).send(error.message)
        }
    }

    public delOrder = async (req: Request, res: Response) => {
        try {
            const {id} = req.params

            await this.userBusiness.delOrder(id)
            res.status(200).send('Pedido deletado do sistema')

        } catch (error:any) {
            res.status(error.statusCode || 500).send(error.message)
        }
    }

    public removeProduct = async (req: Request, res: Response) => {
        try {
            const {id} = req.params

            await this.userBusiness.removeProduct(Number(id))
            res.status(200).send('Produto deletado do sistema')

        } catch (error:any) {
            res.status(error.statusCode || 500).send(error.message)
        }
    }
}