"use client"
// import React, { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { AddItemToCart } from '../_actions/addToCart.action'
import { toast } from 'sonner';
import { useContext } from 'react';
import { CartItemsContext } from '../_context/CartContextProvider';

export default function AddToCartBtn({productId}:{productId:string}) {
     const {setdataOfCartItems} = useContext(CartItemsContext)!
     async function AddItemToCartHandle(){
         try {
            const data = await AddItemToCart(productId)
            console.log(data);
            setdataOfCartItems(data)
            toast.success(data?.message , {position: "top-center" ,richColors: true})
            
        } catch (error) {
            
            toast.error("Please try again" , {position: "top-center" ,richColors: true})
        }
    }
    
    return (
        <button onClick={AddItemToCartHandle} className="cursor-pointer h-10 w-10 rounded-full flex items-center justify-center transition bg-green-600 text-white hover:bg-green-700 disabled:opacity-70" tabIndex={0}>
            <FaPlus />
        </button>
    )
}
