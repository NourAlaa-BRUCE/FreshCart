"use client"
import { createContext, ReactNode, useEffect, useState } from "react"
import { getLoggedUserWishList } from "../_actions/getLoggedUserWishList";
import { getLoggedUserWishListType } from "@/types/wishList";


export const WishListItemsContext = createContext<wishlistContextType|null>(null)
export default function WishListContextProvider({ children }: { children: ReactNode }) {
  const [dataOfWishListItems, setdataOfWishListItems] = useState<getLoggedUserWishListType>();
  const [loadingContext, setLoadingContext] = useState(true);
  async function RefreshWishListData() {
    const data = await getLoggedUserWishList()
    setdataOfWishListItems(data)
  }
  useEffect(() => {
    getLoggedUserWishList().then((itemsWishList) => {
      setdataOfWishListItems(itemsWishList)
      setLoadingContext(false)
    })
  }, [])
  return (
    <WishListItemsContext.Provider value={{ dataOfWishListItems, RefreshWishListData, loadingContext }}>
      {children}
    </WishListItemsContext.Provider>
  )
}

interface wishlistContextType{
  dataOfWishListItems:getLoggedUserWishListType | undefined, 
  RefreshWishListData:()=>void, 
  loadingContext:boolean
 }
