"use client"
import React, { useContext, useState } from 'react'
import { CartItemsContext } from '../_context/CartContextProvider'
import Link from 'next/link'
import {FaCheck,FaMinus, FaPlus, FaTrash } from 'react-icons/fa6'
import { CartItemType, CartResponseType } from '@/types/cart.type'
import Image from 'next/image'
import { deleteItemFromCart } from '../_actions/deleteItemFromCart'
import { toast } from 'sonner'
import { RotatingLines } from 'react-loader-spinner'
import { updateItemFromCart } from '../_actions/updateItemFromCart'

export default function ItemInCart({item}:{item:CartItemType}) {
     const { dataOfCartItems, setdataOfCartItems } = useContext(CartItemsContext)!
        const [loadingDelete, setloadingDelete] = useState(false)
        const [loadingUpdate, setloadingUpdate] = useState(false)
        console.log(dataOfCartItems);
    
        async function deleteItem(id: string) {
            setloadingDelete(true)
            try {
                const res :CartResponseType = await deleteItemFromCart(id)
                console.log(res);
                setdataOfCartItems(res)
                toast.success(res?.message, { position: "top-center", richColors: true })
    
            } catch (error) {
                console.log(error);
                toast.error("Please try again", { position: "top-center", richColors: true })
            }
            setloadingDelete(false)
    
        }
        async function updateItem(id:string,count:number){
            setloadingUpdate(true)
            try {
                const res:CartResponseType = await updateItemFromCart(id,count)
                console.log(res);
                setdataOfCartItems(res)
                toast.success(res?.message, { position: "top-center", richColors: true })
                
            } catch (error) {
                console.log(error);
                toast.error("Please try again", { position: "top-center", richColors: true })
            }
            setloadingUpdate(false)
        } 

    return (
        <div className="my-4 ">
            <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 ">
                <div className="p-4 sm:p-5">
                    <div className="flex gap-4 sm:gap-6"><Link className="relative shrink-0 group" href="/products/6428e7ecdc1175abc65ca090">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
                            <Image loading="lazy" fill alt={item.product.description ?? "product image"} className="object-contain transition-transform duration-300 group-hover:scale-110" src={item.product.imageCover} />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <FaCheck />
                            In Stock</div>
                    </Link>
                        <div className="flex-1 min-w-0 flex flex-col">
                            <div className="mb-3"><Link className="group/title" href={`/products/${item.product._id}`}>
                                <h3 className="font-semibold text-gray-900 group-hover/title:text-green-600 transition-colors leading-relaxed text-base sm:text-lg">
                                    {item.product.title}</h3>
                            </Link>
                                <div className="flex items-center gap-2 mt-2"><span className="inline-block px-2.5 py-1 bg-linear-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-medium rounded-full">
                                    {item.product.category.name}</span></div>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-baseline gap-2"><span className="text-green-600 font-bold text-lg">{item.price} EGP</span><span className="text-xs text-gray-400">per unit</span></div>
                            </div>
                            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center">
                                    {
                                        loadingUpdate?
                                        <div className="flex items-center bg-green-500 rounded-xl p-1 border border-gray-200">
                                        <RotatingLines
                                                    visible={true}
                                                    color='#fff'
                                                    width={20}
                                                    height={20}
                                                    animationDuration="0.75"
                                                    ariaLabel="rotating-lines-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                />
                                       </div>
                                        :
                                        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                                        <button onClick={()=>updateItem(item.product._id,item.count - 1)} className="cursor-pointer h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all" aria-label="Decrease quantity">
                                            <FaMinus />
                                        </button>
                                        <span className="w-12 text-center font-bold text-gray-900">{item.count}</span>
                                        <button onClick={()=>updateItem(item.product._id,item.count + 1)} className="cursor-pointer h-8 w-8 rounded-lg bg-green-600 shadow-sm shadow-green-600/30 flex items-center justify-center text-white hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all" aria-label="Increase quantity">
                                            <FaPlus />
                                        </button>
                                    </div>
                                    }
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 mb-0.5">Total</p>
                                        <p className="text-xl font-bold text-gray-900">{item.price * item.count} <span className="text-sm font-medium text-gray-400">EGP</span></p>
                                    </div>
                                    <button disabled={loadingDelete} onClick={() => deleteItem(item.product._id)} className="cursor-pointer h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200" title="Remove item" aria-label="Remove from cart">
                                        {
                                            loadingDelete ?
                                                <RotatingLines
                                                    visible={true}
                                                    color='#f00'
                                                    width={20}
                                                    height={20}
                                                    animationDuration="0.75"
                                                    ariaLabel="rotating-lines-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                />
                                                :
                                                <FaTrash />
                                        }
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
