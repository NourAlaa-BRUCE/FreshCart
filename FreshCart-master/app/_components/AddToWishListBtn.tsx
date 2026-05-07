"use client"
// import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { useContext, useState } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import { WishListItemsContext } from '../_context/WishListContextProvider';
import { AddToWishList } from '../_actions/addToWishList.action';
import { product } from '@/types/product.type';
import { FaHeart } from 'react-icons/fa6';
import { DeleteFromWishList } from '../_actions/deleteFromWishList.action';

export default function AddToWishListBtn({ productId }: { productId: string }) {
    const { dataOfWishListItems, RefreshWishListData } = useContext(WishListItemsContext)!
    const WishListItems: product[] = dataOfWishListItems?.data || []
    const isWishList: boolean = WishListItems.some((item) => item._id === productId)
    const [loadingBtn, setLoadingBtn] = useState(false);
    async function AddItemToWishListHandle() {
        setLoadingBtn(true)
        try {
            const data = await AddToWishList(productId)
            console.log(data);
            toast.success(data?.message, { position: "top-center", richColors: true })
            RefreshWishListData()
        } catch (error) {
            console.log(error)
            toast.error("Please try again", { position: "top-center", richColors: true })
        }
        setLoadingBtn(false)
    }
    async function DeleteItemFromWishListHandle() {
        setLoadingBtn(true)
        try {
            const data = await DeleteFromWishList(productId)
            console.log(data);
            toast.success(data?.message, { position: "top-center", richColors: true })
            RefreshWishListData()
        } catch (error) {
            console.log(error)
            toast.error("Please try again", { position: "top-center", richColors: true })
        }
        setLoadingBtn(false)
    }
    if(loadingBtn && isWishList){
        return <button className="cursor-pointer fill-red-500 bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500" title="Add to wishlist" tabIndex={0} >
                <IoHeartOutline className="font-bold text-xl " />
            </button>
    }
    else if(loadingBtn && !isWishList){
        return <button className="cursor-pointer text-red-500 fill-red-500 bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-sm" title="Add to wishlist" tabIndex={0} >
                <FaHeart className="font-bold text-xl " />
            </button>
    }

    return (
        isWishList ?
            <button onClick={DeleteItemFromWishListHandle} className="cursor-pointer text-red-500 fill-red-500 bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-sm" title="Add to wishlist" tabIndex={0} >
                <FaHeart className="font-bold text-xl " />
            </button>
            :
            <button onClick={AddItemToWishListHandle} className="cursor-pointer fill-red-500 bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500" title="Add to wishlist" tabIndex={0} >
                <IoHeartOutline className="font-bold text-xl " />
            </button>


    )
}
