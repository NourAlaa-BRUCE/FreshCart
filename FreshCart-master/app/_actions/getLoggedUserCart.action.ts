"use server"

import { CartResponseType } from "@/types/cart.type"
import { getMyToken } from "@/utils/getMyToken"

export async function getLoggedUserCart():Promise<CartResponseType>{
  const token = (await getMyToken())?.token
  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart",{
      method:"get",
        headers:{
            "Content-Type":"application/json",
            token: token as string
        }
    })
    const data = await res.json()
    console.log("data from getLoggedUserCart ",data);
    return data
}