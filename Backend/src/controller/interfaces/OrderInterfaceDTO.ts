export interface OrderInterfaceDTO {
    userName: string,
    order: item[],
    price: number,
    date: string,
    address: string

}

type item = {
    name: string,
    qty: number
}