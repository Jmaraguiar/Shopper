import { Request, Response } from "express";
import { UserBusiness } from "../busines/UserBusiness";
import { OrderInterfaceDTO } from "./interfaces/OrderInterfaceDTO";
import data from '../productsList.json'
import { AddItem } from "./interfaces/AddProductInterfaceDTO";



export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ){}

    public makeOrder = async (req: Request, res: Response) => {
        try {
            const {order, price, userName} = req.body 
            const input: OrderInterfaceDTO = {
                userName,
                order,
                price,
            }
            await this.userBusiness.makeOrder(input)
            res.status(201).send("Pedido Realizado e armazenado com sucesso!")

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
            res.send(error.statusCode || 500).send(error.message)
        }
    }

    public updateOrder = async (req: Request, res: Response) => {
        try {
            
        } catch (error:any) {
            
        }
    }

    public getAllOrders = async (req: Request, res: Response) => {
        try {
            
            const orders = await this.userBusiness.getAllOrders()
            res.status(200).send({orders, message: "Pedidos encontrados com sucesso"})

        } catch (error:any) {
            res.send(error.statusCode || 500).send(error.message)
        }
    }

    public getAllProducts = async (req: Request, res: Response) => {
        try {
            
            const products = await this.userBusiness.getAllProducts()
            res.status(200).send({products,message: 'Produtos encontrados com sucesso'})

        } catch (error:any) {
            res.send(error.statusCode || 500).send(error.message)
        }
    }

    public delOrder = async (req: Request, res: Response) => {
        try {
            
        } catch (error:any) {
            
        }
    }

    public removeProduct = async (req: Request, res: Response) => {
        try {
            
        } catch (error:any) {
            
        }
    }
}