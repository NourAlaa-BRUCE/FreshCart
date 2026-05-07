"use client"
import React, { useContext, useState } from 'react'
import { DeleteFromWishList } from '../_actions/deleteFromWishList.action';
import { WishListItemsContext } from '../_context/WishListContextProvider';
import { toast } from 'sonner';
import { FaTrash } from 'react-icons/fa6';
import { RotatingLines } from 'react-loader-spinner';

export default function DeleteItemFromWishList({ id }: { id: string }) {
    const { RefreshWishListData } = useContext(WishListItemsContext)!
    const [Deleteloading, setDeleteloading] = useState(false)
    async function DeleteItemFromWishListHandle() {
        setDeleteloading(true)
        try {
            const data = await DeleteFromWishList(id)
            console.log(data);
            toast.success(data?.message, { position: "top-center", richColors: true })
            RefreshWishListData()
        } catch (error) {
            console.log(error)
            toast.error("Please try again", { position: "top-center", richColors: true })
        }
        setDeleteloading(false)
    }
    if (Deleteloading) {
        return <button className="cursor-pointer w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400" title="Remove">
            <RotatingLines
                visible={true}
                width={25}
                height={25}
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass="flex justify-center"
            />
        </button>
    }
    return (
        <button onClick={DeleteItemFromWishListHandle} className="cursor-pointer w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50" title="Remove">
            <FaTrash className="text-xs" />
        </button>
    )
}
