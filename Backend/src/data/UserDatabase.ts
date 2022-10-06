import { CustomError } from "../busines/errors/CustomError";
import { Database } from "./baseDataBase"


export class UserDatabase extends Database {

    public insertOrder = async (data: any) => {
        try {

            const {order, price, userName} = data
            
            await Database.connection()
            .insert({
                userName,
                price,
                order
            }).into('ShopperOrders')

        } catch (error:any) {
            throw new CustomError(500,error.sqlMessage);
        }
    }

    public insertProduct = async () => {
        try {
            
        } catch (error:any) {
            
        }
    }

    public populate = async (data: any) => {
        try {

        data.forEach(async (item:any) => {
                await Database.connection()
                .insert({
                    id: item.id,
                    name: item.name,
                    price: Number(item.price),
                    qty_stock: Number(item.qty_stock)
                }).into('ShopperProducts')
            });

        } catch (error:any) {
            throw new CustomError(500,error.sqlMessage);    
        }
    }

    public updateOrder = async () => {
        try {
            
        } catch (error:any) {
            
        }
    }

    public getallOrders = async () => {
        try {
            
        } catch (error:any) {
            
        }
    }

    public delOrder = async () => {
        try {
            
        } catch (error:any) {
            
        }
    }

    public removeProduct = async () => {
        try {
            
        } catch (error:any) {
            
        }
    }
}