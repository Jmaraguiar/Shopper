import { CustomError } from "../busines/errors/CustomError";
import { AddItem } from "../controller/interfaces/AddProductInterfaceDTO";
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

    public insertProduct = async (product: AddItem) => {
        try {

            await Database.connection()
            .insert(product)
            .into('ShopperProducts')

        } catch (error:any) {
            throw new CustomError(500,error.sqlMessage);
        }
    }

    public updateProductByName = async (productName: string, newQty: number) => {
        try {
            await Database.connection.raw(`
                UPDATE ShopperProducts
                SET qty_Stock = ${newQty}
                WHERE name = '${productName}'
            `)
        } catch (error:any) {
            throw new CustomError(500,error.sqlMessage);
        }
    }

    public getProductByName = async (productName: string) => {
        try {
            const product = await Database.connection()
            .select('*')
            .from('ShopperProducts')
            .where({name: productName})
            return product && product[0]
        } catch (error:any) {
            throw new CustomError(500,error.sqlMessage);
        }
    }

    public populate = async (data: any) => {
        try {

        for(let item of data){
            await Database.connection()
                .insert({
                    name: item.name,
                    price: Number(item.price),
                    qty_stock: Number(item.qty_stock)
                }).into('ShopperProducts')
        }

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
            const orders = await Database.connection()
            .select('*')
            .from('ShopperOrders')

            return orders && orders
        } catch (error:any) {
            throw new CustomError(500,error.sqlMessage);
        }
    }

    public getallProducts = async () => {
        try {
            const products = await Database.connection()
            .select('*')
            .from('ShopperProducts')

            return products && products
        } catch (error:any) {
            throw new CustomError(500,error.sqlMessage);
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