import { Request, Response } from "express";
import { UserBusiness } from "../busines/UserBusiness";
import { OrderInterfaceDTO } from "./interfaces/OrderInterfaceDTO";


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
                price
            }
            this.userBusiness.makeOrder(input)
            res.status(201).send("Pedido Realizado e armazenado com sucesso!")

        } catch (error:any) {
            console.log(error.message)
        }
    }

    public AddProduct = async (req: Request, res: Response) => {
        try {
            
        } catch (error:any) {
            
        }
    }

    public populate = async (req: Request, res: Response) => {
        try {
            
        } catch (error:any) {
            
        }
    }

    public updateOrder = async (req: Request, res: Response) => {
        try {
            
        } catch (error:any) {
            
        }
    }

    public getOrders = async (req: Request, res: Response) => {
        try {
            
        } catch (error:any) {
            
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