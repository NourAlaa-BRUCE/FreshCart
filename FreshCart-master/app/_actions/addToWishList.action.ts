"use server"

import { wishlistRes } from "@/types/wishList";
import { getMyToken } from "@/utils/getMyToken"
import { redirect } from "next/navigation";

export async function AddToWishList(id:string) : Promise<wishlistRes|null>{
    const token = (await getMyToken())?.token
    if (!token) {
        redirect("/login")
        return null
    }
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
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