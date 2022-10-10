export interface AddProductInterfaceDTO {
    products: AddItem[]
}

export type AddItem = {
    name: string,
    qty: number,
    price: number
}