"use server"

import { CartResponseType } from "@/types/cart.type";
import { getMyToken } from "@/utils/getMyToken"

export async function deleteItemFromCart(id:string) : Promise<CartResponseType>{
    const token = (await getMyToken())?.token
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            token: token as string
        },
    })
    const data = await res.json();
    return data;
    
}