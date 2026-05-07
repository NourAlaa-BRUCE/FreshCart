import { CartItemType } from "./cart.type";

export interface orderResponse {
    cartItems : CartItemType[],
    createdAt:string,
    id:string,
    isDelivered:boolean,
    isPaid:boolean,
    paymentMethodType: string,
    shippingAddress:{ details: string, phone: string, city: string },
    shippingPrice:number,
    taxPrice:number,
    totalOrderPrice:number,
    updatedAt:string,
    user:{ _id: string, name: string, email: string, phone: string },
}