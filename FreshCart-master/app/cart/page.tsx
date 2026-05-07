"use client"
import React, { useContext, useState} from 'react'
import { CartItemsContext } from '../_context/CartContextProvider'
import Link from 'next/link'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { FaBagShopping, FaBoxOpen, FaLock, FaShieldHalved, FaTag, FaTrash, FaTruck } from 'react-icons/fa6'
import { CartItemType, CartResponseType } from '@/types/cart.type'
import ItemInCart from '../_components/itemInCart'
import { toast } from 'sonner'
import { clearItemsFromCart } from '../_actions/clearItemsFromCart'
import { RotatingLines } from 'react-loader-spinner'
import LoadingComponent from '../_components/LoadingComponent'

export default function Page() {
    const { dataOfCartItems,setdataOfCartItems,loadingContext} = useContext(CartItemsContext)!
    const [loadingClear, setloadingClear] = useState(false)
    console.log(dataOfCartItems);
    
    async function clearItems(){
        setloadingClear(true)
        try {
            const res:CartResponseType = await clearItemsFromCart()
            console.log(res);
            setdataOfCartItems(res)
            toast.success("Cart has been cleared successfuly", { position: "top-center", richColors: true })
        } catch (error) {
            console.log(error);
            toast.error("Please try again", { position: "top-center", richColors: true })
        }
        setloadingClear(false)
    }
    if (loadingContext) return <LoadingComponent message={"Loading Cart items"}/>
        return (
        <>
            {
                dataOfCartItems?.numOfCartItems ?
                    <div className="bg-gray-50 min-h-screen py-8">
                        <div className="container mx-auto px-4">
                            <div className="mb-8">
                                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4"><Link className="hover:text-green-600 transition" href="/">Home</Link><span>/</span><span className="text-gray-900 font-medium">Shopping Cart</span></nav>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3"><span className="bg-linear-to-r from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                                            <ShoppingCart />
                                        </span>Shopping Cart</h1>
                                        <p className="text-gray-500 mt-2">You have <span className="font-semibold text-green-600">{dataOfCartItems.numOfCartItems} items </span>
                                            in your cart</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    {
                                        dataOfCartItems?.data?.products.map((item: CartItemType) => {
                                            return <ItemInCart key={item._id} item={item}/>
                                            
                                        })
                                    }

                                    <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                                        <Link className="cursor-pointer text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2" href="/"><span>←</span> Continue Shopping</Link>
                                        <button disabled={loadingClear} onClick={clearItems} className="cursor-pointer group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50">
                                            {loadingClear ? 
                                            <RotatingLines
                                                    visible={true}
                                                    color='#99a1af'
                                                    width={20}
                                                    height={20}
                                                    animationDuration="0.75"
                                                    ariaLabel="rotating-lines-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                />
                                            :<FaTrash />}
                                            <span>Clear all items</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="lg:col-span-1">
                                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
                                        <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                                <FaBagShopping />
                                                Order Summary</h2>
                                            <p className="text-green-100 text-sm mt-1">{dataOfCartItems.numOfCartItems} items in your cart</p>
                                        </div>
                                        <div className="p-6 space-y-5">
                                            <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full text-green-600 bg-green-100 flex items-center justify-center">
                                                    <FaTruck />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-green-700">Free Shipping!</p>
                                                    <p className="text-sm text-green-600">You qualify for free delivery</p>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-medium text-gray-900">{dataOfCartItems.data.totalCartPrice}</span></div>
                                                <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="font-medium text-green-600">FREE</span></div>
                                                <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                                                    <div className="flex justify-between items-baseline"><span className="text-gray-900 font-semibold">Total</span>
                                                        <div className="text-right"><span className="text-2xl font-bold text-gray-900">{dataOfCartItems.data.totalCartPrice}</span><span className="text-sm text-gray-500 ml-1">EGP</span></div>
                                                    </div>
                                                </div>
                                            </div><button className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50/50 transition-all">
                                                <FaTag />
                                                <span className="text-sm font-medium">Apply Promo Code</span></button><Link className="w-full bg-linear-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]" href="/checkout">
                                                <FaLock />
                                                <span>Secure Checkout</span></Link>
                                            <div className="flex items-center justify-center gap-4 py-2">
                                                <div className=" flex items-center gap-1.5 text-xs text-gray-500">
                                                    <FaShieldHalved className='text-green-500' />
                                                    <span>Secure Payment</span></div>
                                                <div className="w-px h-4 bg-gray-200" />
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500"> <FaTruck className='text-green-500' /> <span>Fast Delivery</span></div>
                                            </div><Link className="block text-center text-green-600 hover:text-green-700 text-sm font-medium py-2" href="/">← Continue Shopping</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
            }
        </>

    )
}
