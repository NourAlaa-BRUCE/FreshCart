"use client"
import { useContext } from "react"
import { WishListItemsContext } from "../_context/WishListContextProvider"
import Link from "next/link";
import { FaBoxOpen, FaHeart } from "react-icons/fa6";
import { product } from "@/types/product.type";
import Image from "next/image";
import LoadingComponent from "../_components/LoadingComponent";
import { ArrowRight } from "lucide-react";
import DeleteItemFromWishList from "../_components/DeleteWishItem";
import AddCartItem from "../_components/AddCartItem";

export default function Page() {
    const { dataOfWishListItems, loadingContext } = useContext(WishListItemsContext)!
    
         
    
    if (loadingContext) return <LoadingComponent message={"Loading WishList items"} />

    return (

        dataOfWishListItems?.count ? <div className="min-h-screen bg-gray-50/50">
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4"><Link className="hover:text-green-600 transition-colors" href="/">Home</Link><span>/</span><span className="text-gray-900 font-medium">Wishlist</span></nav>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                                <FaHeart className="text-xl text-red-500" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                                <p className="text-gray-500 text-sm">{dataOfWishListItems?.count} items saved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                {dataOfWishListItems?.data.map((item: product) => {
                    return <div key={item._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                            <div className="col-span-6">Product</div>
                            <div className="col-span-2 text-center">Price</div>
                            <div className="col-span-2 text-center">Status</div>
                            <div className="col-span-2 text-center">Actions</div>
                        </div>
                        <div className="divide-y divide-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors">
                                <div className=" md:col-span-6 flex items-center gap-4"><Link className="relative w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0" href={`/products/${item._id}`}>
                                    <Image fill alt={item.description} className="w-full h-full object-contain p-2" src={item.imageCover} /></Link>
                                    <div className="min-w-0">
                                        <Link className="font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-2" href={`/products/${item._id}`}>{item.title}</Link>
                                        <p className="text-sm text-gray-400 mt-1">{item.category.name}</p>
                                    </div>
                                </div>
                                <div className="md:col-span-2 flex md:justify-center items-center gap-2"><span className="md:hidden text-sm text-gray-500">Price:</span>
                                    <div className="text-right md:text-center">
                                        <div className="font-semibold text-gray-900">{item.price}</div>
                                    </div>
                                </div>
                                <div className="md:col-span-2 flex md:justify-center"><span className="md:hidden text-sm text-gray-500 mr-2">Status:</span><span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />In Stock</span></div>
                                <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                                    <AddCartItem id={item._id}/>
                                    
                                    <DeleteItemFromWishList id={item._id}/>
                                    </div>
                            </div>
                        </div>
                    </div>
                })}
                <div className="mt-8 flex items-center justify-between"><Link className="text-gray-500 hover:text-green-600 text-sm font-medium transition-colors" href="/products">←
                    Continue Shopping</Link></div>
            </div>
        </div>
            :
            <div className="my-4 min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <div className="relative mb-8">
                        <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto">

                            <FaBoxOpen className="w-20 h-20 rounded-full bg-linear-to-br from-gray-100 to-gray-50 text-gray-300 flex items-center justify-center mx-auto" /></div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">Looks like you haven`&apos;`t added anything to your cart yet.<br />Start
                        exploring our products!</p>
                    <Link className="inline-flex items-center gap-2 bg-linear-to-r from-green-600 to-green-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]" href="/">Start Shopping
                        <ArrowRight />
                    </Link>
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            <Link className="px-4 py-2 bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full text-sm font-medium transition-colors" href="/categories">Electronics</Link>
                            <Link className="px-4 py-2 bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full text-sm font-medium transition-colors" href="/categories">Fashion</Link>
                            <Link className="px-4 py-2 bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full text-sm font-medium transition-colors" href="/categories">Home</Link>
                            <Link className="px-4 py-2 bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full text-sm font-medium transition-colors" href="/categories">Beauty</Link>
                        </div>
                    </div>
                </div>
            </div>



    )
}
