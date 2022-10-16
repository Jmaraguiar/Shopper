export interface UpdateOrderDTO {
    id: string,
    order: item[],
    price: number,
    date: string,

}

type item = {
    name: string,
    qty: number
}