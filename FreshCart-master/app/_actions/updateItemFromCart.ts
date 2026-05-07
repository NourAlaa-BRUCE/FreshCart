"use server"

import { CartResponseType } from "@/types/cart.type";
import { getMyToken } from "@/utils/getMyToken"

export async function updateItemFromCart(id:string , count : number) : Promise<CartResponseType>{
    const token = (await getMyToken())?.token
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            token: token as string
        },
        body:JSON.stringify({count})
    })
    const data = await res.json();
    console.log("data from add to cart  ",data);
    return data;
    
}