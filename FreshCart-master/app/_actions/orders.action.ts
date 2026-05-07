"use server"
import { orderResponse } from "@/types/order.type"
import { getMyToken } from "@/utils/getMyToken"

interface orderShippingType {
    shippingAddress: {
        details: string,
        phone: string,
        city: string,
    }
}
export async function createCashOrder(cartId: string|null , orderShipping: orderShippingType) {
    const token = (await getMyToken())?.token
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: token as string
        },
        body: JSON.stringify(orderShipping)
    })
    const data = await res.json();
    return data;
}

export async function createVisaOrder(cartId: string|null,orderShipping: orderShippingType) {
    const token = (await getMyToken())?.token
    
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.URL!}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: token as string
        },
        body: JSON.stringify(orderShipping)
    })
    const data = await res.json();
    return data;
}

export async function getAllOrders():Promise<orderResponse[]> {
    const token = (await getMyToken())?.token
    const id = (await getMyToken())?.id
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            token: token as string
        },
    })
    const data = await res.json();
    return data;
}