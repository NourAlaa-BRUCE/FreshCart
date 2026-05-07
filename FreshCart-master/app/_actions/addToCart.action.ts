"use server"

import { CartResponseType } from "@/types/cart.type";
import { getMyToken } from "@/utils/getMyToken"
import { redirect } from "next/navigation";

export async function AddItemToCart(id:string) : Promise<CartResponseType>{
    const token = (await getMyToken())?.token
    if (!token) {
        redirect("/login")
    }
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart",{
        method:"Post",
        headers:{
            "Content-Type":"application/json",
            token: token as string
        },
        body:JSON.stringify({productId: id})
    })
    const data = await res.json();
    console.log("data from add to cart  ",data);
    return data;
    
}