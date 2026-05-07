import { product } from "./product.type"

export interface CartResponseType{
    cartId:string,
    data:{
        cartOwner:string,
        createdAt:string,
        totalCartPrice:number,
        products:CartItemType[]
    },
    message:string,
    numOfCartItems:number,
    status:string

}

export interface CartItemType{
    count: number,
    price:number,
    product:product, 
    _id:string
}