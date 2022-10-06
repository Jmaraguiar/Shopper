export interface OrderInterfaceDTO {
    userName: string,
    order: item[],
    price: number
}

type item = {
    name: string,
    qty: number
}