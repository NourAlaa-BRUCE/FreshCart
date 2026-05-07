"use client"
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft, FaBagShopping, FaBox, FaBoxOpen, FaCheck, FaCircleInfo, FaCity, FaCreditCard, FaHouse, FaLocationDot, FaMoneyBill, FaPhone, FaReceipt, FaShieldHalved, FaTruck, FaWallet } from 'react-icons/fa6'
import { CartItemsContext } from '../_context/CartContextProvider'
import { CartItemType } from '@/types/cart.type'
import Image from 'next/image'
import { createCashOrder, createVisaOrder } from '../_actions/orders.action'
import { getLoggedUserCart } from '../_actions/getLoggedUserCart.action'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import LoadingComponent from '../_components/LoadingComponent'

export default function Page() {
    const { dataOfCartItems, setdataOfCartItems,loadingContext } = useContext(CartItemsContext)!
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            details: '',
            phone: '',
            city: ''
        }
    })
    const [PaymentChoice, setPaymentChoice] = useState(1)
    const [loadingOrder, setloadingOrder] = useState(false)
    async function handlaCashPayment(values: { details: string, phone: string, city: string }) {
        console.log(values);
        setloadingOrder(true)
        try {
            const res = await createCashOrder(dataOfCartItems?.cartId??null, { shippingAddress: values })
            console.log(res);
            const itemsCart = await getLoggedUserCart()
            setdataOfCartItems(itemsCart)
            toast.success("Order successfuly", { position: "top-center", richColors: true })
        } catch (error) {
            console.log(error);
            toast.error("Please try again", { position: "top-center", richColors: true })
        }
        setloadingOrder(false)
    }
    async function handlaVisaPayment(values: { details: string, phone: string, city: string }) {
        console.log(values);
        setloadingOrder(true)
        try {
            const res = await createVisaOrder(dataOfCartItems?.cartId??null, { shippingAddress: values })
            console.log(res);
            window.open(res.session.url,"self")
        } catch (error) {
            console.log(error);
            toast.error("Please try again", { position: "top-center", richColors: true })
        }
        setloadingOrder(false)
        
    }
    if (loadingContext) return <LoadingComponent message={"Loading items"}/>
    return (
        dataOfCartItems?.numOfCartItems ?
            <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6"><Link className="hover:text-green-600 transition" href="/">Home</Link><span className="text-gray-300">/</span><Link className="hover:text-green-600 transition" href="/cart">Cart</Link><span className="text-gray-300">/</span><span className="text-gray-900 font-medium">Checkout</span></nav>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3"><span className="bg-linear-to-br from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
                                    <FaReceipt />
                                </span>Complete Your Order</h1>
                                <p className="text-gray-500 mt-2">Review your items and complete your purchase</p>
                            </div><Link className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all" href="/cart">
                                <FaArrowLeft />
                                Back to Cart</Link>
                        </div>
                    </div>
                    <form>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                    <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                            <FaHouse />
                                            Shipping Address</h2>
                                        <p className="text-green-100 text-sm mt-1">Where should we deliver your order?</p>
                                    </div>
                                    <div className="p-6 space-y-5">
                                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                                <FaCircleInfo className='text-blue-600' />
                                            </div>
                                            <div>
                                                <p className="text-sm text-blue-800 font-medium">Delivery Information</p>
                                                <p className="text-xs text-blue-600 mt-0.5">Please ensure your address is accurate for
                                                    smooth delivery</p>
                                            </div>
                                        </div>
                                        <div><label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                    <FaCity className='text-gray-500' />
                                                </div>
                                                <input {...register("city", { required: "city is required", min: { value: 2, message: "City name must be at least 2 characters" } })} id="city" className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none  focus:ring-2 ${formState.errors.city ? "border-red-200 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-green-500 focus:ring-green-100"}`} placeholder="e.g. Cairo, Alexandria, Giza" type="text" name="city" />

                                            </div>
                                            {formState.errors.city && <div className="text-red-500 pt-1 text-sm">{formState.errors.city.message}</div>}
                                        </div>
                                        <div><label htmlFor="details" className="block text-sm font-semibold text-gray-700 mb-2">Street
                                            Address <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                    <FaLocationDot className='text-gray-500' />
                                                </div>
                                                <textarea {...register("details", { required: "Address is required", min: { value: 10, message: "Address details must be at least 10 characters" } })} id="details" rows={3} className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none  focus:ring-2 ${formState.errors.details ? "border-red-200 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-green-500 focus:ring-green-100"}`} placeholder="Street name, building number, floor, apartment..." name="details" defaultValue={""} />
                                            </div>
                                            {formState.errors.details && <div className="text-red-500 pt-1 text-sm">{formState.errors.details.message}</div>}
                                        </div>
                                        <div><label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number
                                            <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                    <FaPhone className='text-gray-500' />
                                                </div>
                                                <input {...register("phone", { required: "phone is required", pattern: { value: /^01[0125][0-9]{8}$/, message: "Please enter a valid Egyptian phone number" } })} id="phone" className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none  focus:ring-2 ${formState.errors.phone ? "border-red-200 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-green-500 focus:ring-green-100"}`} placeholder="01xxxxxxxxx" type="tel" name="phone" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">Egyptian
                                                    numbers only</span>
                                            </div>
                                            {formState.errors.phone && <div className="text-red-500 pt-1 text-sm">{formState.errors.phone.message}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                    <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                            <FaWallet />
                                            Payment Method</h2>
                                        <p className="text-green-100 text-sm mt-1">Choose how you&apos;d like to pay</p>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <button onClick={() => setPaymentChoice(1)} type="button" className={`cursor-pointer w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${PaymentChoice === 1 ? "border-green-500 bg-linear-to-r from-green-50 to-emerald-50 shadow-sm" : "border-gray-200 hover:border-green-200 hover:bg-gray-50"} `}>
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${PaymentChoice === 1 ? "bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
                                                <FaMoneyBill className='text-xl' />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h3 className={`font-bold ${PaymentChoice === 1 ? "text-green-700" : "text-gray-900"}`}>Cash on Delivery</h3>
                                                <p className="text-sm text-gray-500 mt-0.5">Pay when your order arrives at your doorstep
                                                </p>
                                            </div>
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${PaymentChoice === 1 ? "bg-green-600 text-white" : "border-2 border-gray-200"}`}>
                                                <FaCheck className={PaymentChoice === 1 ? "" : "hidden"} /></div>
                                        </button>
                                        <button onClick={() => setPaymentChoice(2)} type="button" className={`cursor-pointer w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${PaymentChoice === 2 ? "border-green-500 bg-linear-to-r from-green-50 to-emerald-50 shadow-sm" : "border-gray-200 hover:border-green-200 hover:bg-gray-50"} `}>
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${PaymentChoice === 2 ? "bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
                                                <FaCreditCard className='text-xl' />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h3 className={`font-bold ${PaymentChoice === 2 ? "text-green-700" : "text-gray-900"}`}>Pay Online</h3>
                                                <p className="text-sm text-gray-500 mt-0.5">Secure payment with Credit/Debit Card via
                                                    Stripe</p>
                                                <div className="flex items-center gap-2 mt-2"><img alt="Visa" className="h-5" src="https://img.icons8.com/color/48/visa.png" /><img alt="Mastercard" className="h-5" src="https://img.icons8.com/color/48/mastercard.png" /><img alt="Amex" className="h-5" src="https://img.icons8.com/color/48/amex.png" /></div>
                                            </div>
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${PaymentChoice === 2 ? "bg-green-600 text-white" : "border-2 border-gray-200"}`}>
                                                <FaCheck className={PaymentChoice === 2 ? "" : "hidden"} /></div>
                                        </button>
                                        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                <FaShieldHalved className='text-green-600' />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-green-800">Secure &amp; Encrypted</p>
                                                <p className="text-xs text-green-600 mt-0.5">Your payment info is protected with 256-bit
                                                    SSL encryption</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
                                    <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                            <FaBagShopping />
                                            Order Summary</h2>
                                        <p className="text-green-100 text-sm mt-1">{dataOfCartItems?.numOfCartItems} items</p>
                                    </div>
                                    <div className="p-5">
                                        <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                                            {dataOfCartItems?.data?.products.map((item: CartItemType) => {
                                                return <div key={item._id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                                    <div className="relative w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                                                        <Image fill loading='lazy' alt={item.product.description || "image item"} className="w-full h-full object-contain" src={item.product.imageCover} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{item.product.title}</p>
                                                        <p className="text-xs text-gray-500 mt-0.5">{item.count} × {item.price} EGP</p>
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-900 shrink-0">{item.count * item.price}</p>
                                                </div>
                                            })}
                                        </div>
                                        <hr className="border-gray-100 my-4" />
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-medium">{dataOfCartItems?.data?.totalCartPrice} EGP</span></div>
                                            <div className="flex justify-between text-gray-600"><span className="flex items-center gap-2">
                                                <FaTruck className='text-gray-400' />
                                                Shipping</span><span className="text-green-600 font-semibold">FREE</span>
                                            </div>
                                            <hr className="border-gray-100" />
                                            <div className="flex justify-between items-center"><span className="text-lg font-bold text-gray-900">Total</span>
                                                <div className="text-right"><span className="text-2xl font-bold text-green-600">{dataOfCartItems?.data?.totalCartPrice} </span><span className="text-sm text-gray-500 ml-1">EGP</span></div>
                                            </div>
                                        </div>
                                        <button disabled={loadingOrder} onClick={handleSubmit(handlaCashPayment)} type="submit" className={`${PaymentChoice === 1 ? "flex" : "hidden"} cursor-pointer w-full mt-6 disabled:bg-green-300 bg-linear-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed  items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-[0.98]`}>
                                            <FaBox />
                                            {loadingOrder?"loading...":"Place Order"}</button>
                                        <button disabled={loadingOrder} onClick={handleSubmit(handlaVisaPayment)} type="submit" className={`${PaymentChoice === 2 ? "flex" : "hidden"} cursor-pointer  w-full mt-6 disabled:bg-green-300 bg-linear-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed  items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-[0.98]`}>
                                            <FaShieldHalved />
                                            {loadingOrder?"loading...":"Proceed to Payment"}</button>
                                        <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <FaShieldHalved className='text-green-500' />
                                                <span>Secure</span></div>
                                            <div className="w-px h-4 bg-gray-200" />
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <FaTruck className='text-blue-500' />
                                                <span>Fast Delivery</span></div>
                                            <div className="w-px h-4 bg-gray-200" />
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <FaBox className='text-orange-500' />
                                                <span>Easy Returns</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
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
