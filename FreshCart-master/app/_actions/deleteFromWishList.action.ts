"use server"

import { wishlistRes } from "@/types/wishList";
import { getMyToken } from "@/utils/getMyToken"

export async function DeleteFromWishList(id:string) : Promise<wishlistRes|null>{
    const token = (await getMyToken())?.token
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            token: token as string
        },
    })
    const data = await res.json();
    console.log("data from add to cart  ",data);
    return data;
    
}