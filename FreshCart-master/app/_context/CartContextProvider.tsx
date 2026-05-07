"use client"
import { createContext, ReactNode, useEffect, useState } from "react"
import { getLoggedUserCart } from "../_actions/getLoggedUserCart.action"
import { CartResponseType } from "@/types/cart.type";

export const CartItemsContext = createContext<CartItemsContextType|null>(null)
export default function CartContextProvider({children}:{children:ReactNode}){
  const [dataOfCartItems, setdataOfCartItems] = useState<CartResponseType|null>(null);
const [loadingContext, setLoadingContext] = useState(true);
async function RefreshCartItems(){
  const res = await getLoggedUserCart()
  setdataOfCartItems(res)
} 
useEffect(() => {
  getLoggedUserCart().then((itemsCart) => {
    setdataOfCartItems(itemsCart)
    setLoadingContext(false)
  })
}, [])
  return (
    <CartItemsContext.Provider value={{dataOfCartItems,setdataOfCartItems,loadingContext,RefreshCartItems}}>
      {children}
    </CartItemsContext.Provider>
  )
}

export interface CartItemsContextType {
  dataOfCartItems: CartResponseType|null,
  setdataOfCartItems: (value: CartResponseType) => void,
  loadingContext:boolean,
  RefreshCartItems: ()=>void
}