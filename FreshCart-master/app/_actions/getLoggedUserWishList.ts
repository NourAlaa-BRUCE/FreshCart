"use server"

import { getLoggedUserWishListType } from "@/types/wishList"
import { getMyToken } from "@/utils/getMyToken"

export async function getLoggedUserWishList():Promise<getLoggedUserWishListType>{
  const token = (await getMyToken())?.token
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
      method:"get",
        headers:{
            "Content-Type":"application/json",
            token: token as string
        }
    })
    const data = await res.json()
    console.log("data from getLoggedUserWishList ",data);
    return data
}