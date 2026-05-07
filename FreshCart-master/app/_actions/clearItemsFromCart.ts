"use server"

import { CartResponseType } from "@/types/cart.type";
import { getMyToken } from "@/utils/getMyToken"

export async function clearItemsFromCart() : Promise<CartResponseType>{
    const token = (await getMyToken())?.token
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            token: token as string
        },
    })
    const data = await res.json();
    return data;
    
}