"use client"
import { product } from '@/types/product.type'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaShareAlt, FaShieldAlt, FaShippingFast } from 'react-icons/fa'
import { FaBolt, FaBox, FaCartShopping, FaMinus, FaPlus, FaRegHeart, FaRegStar, FaStar, FaTruck } from 'react-icons/fa6'
import { IoMdCheckmark, IoMdRefresh } from 'react-icons/io'
import { PiStarHalfDuotone } from 'react-icons/pi'
import ItemSlider from './ItemSlider'
interface propsOfProduct{
    product:product
}
export default function ProductDetails({product}:propsOfProduct) {

    const [quantity, setQuantity] = useState(1)
    const [tab, setTab] = useState(1)
  return (
    <>
        <section id="product-detail" className="py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div id="product-images" className="lg:w-1/4">
                            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
                                <ItemSlider images={product?.images}/>
                            </div>
                        </div>
                        <div id="product-info" className="lg:w-3/4">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex flex-wrap gap-2 mb-4"><Link className="bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-full hover:bg-green-100 transition" href="/categories/6439d58a0049ad0b52b9003f">{product.category.name}</Link><span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">{product.brand.name}</span></div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{product.title}</h1>
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((star, index) => {
                                        return <div key={index} className="text-yellow-400">
                                            {index+1 <= product.ratingsAverage ?<FaStar />:Math.floor(product.ratingsAverage) === index && product.ratingsAverage !== index?<PiStarHalfDuotone /> : <FaRegStar />}
                                        </div>
                                    })}
                                    <span className="text-sm text-gray-600 ps-2">{product.ratingsAverage} ({product.ratingsQuantity} reviews)</span>
                                </div>
                                <div className="flex items-center flex-wrap gap-3 mb-6">
                                    <span className="text-3xl font-bold text-gray-900">{product.priceAfterDiscount ?product.priceAfterDiscount:product.price} EGP</span>
                                    {product.priceAfterDiscount ?(<><span className="text-lg text-gray-400 line-through">{product.priceAfterDiscount ?product.price:""} EGP</span>
                                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">{ `Save ${100-Math.round((product.priceAfterDiscount/product.price)*100) }%`}</span></>):""}
                                    
                                    </div>
                                <div className="flex items-center gap-2 mb-6"><span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700"><span className="w-2 h-2 rounded-full bg-green-500" />In Stock</span></div>
                                <div className="border-t border-gray-100 pt-5 mb-6">
                                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                                </div>
                                <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                                            <button onClick={() => setQuantity(quantity - 1)} id="decrease-qty" className="cursor-pointer px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-green-600 transition disabled:opacity-50" disabled={quantity === 1}>
                                                <FaMinus className="text-xl" />
                                            </button>
                                            <input
                                                onChange={e => {
                                                    const val = Number(e.target.value);
                                                    if (val < 1) setQuantity(1);
                                                    else if (val > product.quantity) setQuantity(product.quantity);
                                                    else setQuantity(val);
                                                }}
                                                value={quantity}
                                                min={1}
                                                max={product.quantity}
                                                className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
                                                id="quantity"
                                                type="number"
                                            />
                                            <button onClick={() => setQuantity(quantity + 1)} id="increase-qty" className="cursor-pointer px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-green-600 transition disabled:opacity-50" disabled={quantity === product.quantity}>
                                                <FaPlus className="text-xl" />
                                            </button>
                                        </div><span className="text-sm text-gray-500">{product.quantity} available</span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <div className="flex justify-between items-center"><span className="text-gray-600">Total
                                        Price:</span><span className="text-2xl font-bold text-green-600">{product.priceAfterDiscount ?  (product.priceAfterDiscount * quantity).toFixed(2):(product.price * quantity).toFixed(2)}{} EGP</span></div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                    <button id="add-to-cart" className="cursor-pointer flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 bg-green-600">
                                        <FaCartShopping />
                                        Add to Cart</button>
                                    <button id="buy-now" className="cursor-pointer flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                        <FaBolt />
                                        Buy Now</button></div>
                                <div className="flex gap-3 mb-6">
                                    <button id="wishlist-button" className="cursor-pointer flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-green-300 hover:text-green-600">
                                        <FaRegHeart />
                                        Add to Wishlist</button>
                                    <button className="cursor-pointer border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-green-300 hover:text-green-600 transition">
                                        <FaShareAlt />
                                    </button></div>
                                <div className="border-t border-gray-100 pt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                                <FaShippingFast /></div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 text-sm">Free Delivery</h4>
                                                <p className="text-xs text-gray-500">Orders over $50</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                                <IoMdRefresh /></div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 text-sm">30 Days Return</h4>
                                                <p className="text-xs text-gray-500">Money back</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                                <FaShieldAlt /></div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 text-sm">Secure Payment</h4>
                                                <p className="text-xs text-gray-500">100% Protected</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="product-details-tabs" className="py-8">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="border-b border-gray-200">
                            <div className="flex overflow-x-auto scrollbar-hide">
                                <button onClick={() => setTab(1)} className={`cursor-pointer flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${tab === 1 ? "text-green-600 border-b-2 border-green-600 bg-green-50/50":"text-gray-600 hover:text-green-600 hover:bg-gray-50"}`}>
                                    <FaBox />
                                    Product Details</button>
                                <button onClick={() => setTab(2)} className={`cursor-pointer flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${tab === 2 ? "text-green-600 border-b-2 border-green-600 bg-green-50/50":"text-gray-600 hover:text-green-600 hover:bg-gray-50"}`}>
                                    <FaStar />
                                    Reviews ({product.reviews.length})</button>
                                <button onClick={() => setTab(3)} className={`cursor-pointer flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${tab === 3 ? "text-green-600 border-b-2 border-green-600 bg-green-50/50":"text-gray-600 hover:text-green-600 hover:bg-gray-50"}`}>
                                    <FaTruck />
                                    Shipping &amp; Returns</button></div>
                        </div>
                        <div className="p-6">
                            {tab === 1 &&<div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About this Product</h3>
                                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-3">Product Information</h4>
                                        <ul className="space-y-2">
                                            <li className="flex justify-between text-sm"><span className="text-gray-500">Category</span><span className="text-gray-900 font-medium">{product.category.name}</span></li>
                                            <li className="flex justify-between text-sm"><span className="text-gray-500">Subcategory</span><span className="text-gray-900 font-medium">{product.subcategory.name}</span></li>
                                            <li className="flex justify-between text-sm"><span className="text-gray-500">Brand</span><span className="text-gray-900 font-medium">{product.brand.name}</span></li>
                                            <li className="flex justify-between text-sm"><span className="text-gray-500">Items
                                                Sold</span><span className="text-gray-900 font-medium">{product.sold}+ sold</span></li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-sm text-gray-600"><IoMdCheckmark className='text-xl me-2 text-green-500' /> Premium Quality Product</li>
                                            <li className="flex items-center text-sm text-gray-600"><IoMdCheckmark className='text-xl me-2 text-green-500'/> 100% Authentic Guarantee</li>
                                            <li className="flex items-center text-sm text-gray-600"><IoMdCheckmark className='text-xl me-2 text-green-500'/> Fast &amp; Secure Packaging</li>
                                            <li className="flex items-center text-sm text-gray-600"><IoMdCheckmark className='text-xl me-2 text-green-500'/> Quality Tested</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>}
                            {tab === 2 &&<div className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-gray-900 mb-2">{product.ratingsAverage}</div>
                                        <div className="text-yellow-400 flex gap-1 text-xl">
                                            {[...Array(5)].map((star, index) => {
                                                return <div key={index} className="text-yellow-400">
                                                    {index+1 <= product.ratingsAverage ?<FaStar /> : <FaRegStar />}
                                                </div>
                                            })}
                                            
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">Based on {product.reviews.length} reviews</p>
                                    </div>
                                    <div className="flex-1 w-full">
                                        <div className="flex items-center gap-3 mb-2"><span className="text-sm text-gray-600 w-8">5 star</span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-400 rounded-full transition-all duration-300" style={{ width: '25%' }}>
                                                </div>
                                            </div><span className="text-sm text-gray-500 w-10">{((product.reviews.filter((review)=>Math.round(review.rating) == 5).length/product.reviews.length)*100).toFixed(2)}%</span>
                                        </div>
                                        <div className="flex items-center gap-3 mb-2"><span className="text-sm text-gray-600 w-8">4 star</span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-400 rounded-full transition-all duration-300" style={{ width: '60%' }}>
                                                </div>
                                            </div><span className="text-sm text-gray-500 w-10">{((product.reviews.filter((review)=>Math.round(review.rating) == 4).length/product.reviews.length)*100).toFixed(2)}%</span>
                                        </div>
                                        <div className="flex items-center gap-3 mb-2"><span className="text-sm text-gray-600 w-8">3 star</span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-400 rounded-full transition-all duration-300" style={{ width: '25%' }}>
                                                </div>
                                            </div><span className="text-sm text-gray-500 w-10">{((product.reviews.filter((review)=>Math.round(review.rating) == 3).length/product.reviews.length)*100).toFixed(2)}%</span>
                                        </div>
                                        <div className="flex items-center gap-3 mb-2"><span className="text-sm text-gray-600 w-8">2 star</span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-400 rounded-full transition-all duration-300" style={{ width: '5%' }} />
                                            </div><span className="text-sm text-gray-500 w-10">{((product.reviews.filter((review)=>Math.round(review.rating) == 2).length/product.reviews.length)*100).toFixed(2)}%</span>
                                        </div>
                                        <div className="flex items-center gap-3 mb-2"><span className="text-sm text-gray-600 w-8">1 star</span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-400 rounded-full transition-all duration-300" style={{ width: '5%' }} />
                                            </div><span className="text-sm text-gray-500 w-10">{((product.reviews.filter((review)=>Math.round(review.rating) == 1).length/product.reviews.length)*100).toFixed(2)}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 pt-6">
                                    <div className="text-center py-8">
                                        <FaStar className="mx-auto mb-3 text-5xl text-gray-300" />
                                        <p className="text-gray-500">Customer reviews will be displayed here.</p><button className="cursor-pointer mt-4 text-green-600 hover:text-green-700 font-medium">Write a Review</button>
                                    </div>
                                </div>
                            </div>}
                            {tab === 3 &&<div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
                                                <FaTruck className="text-white text-2xl"/>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Shipping Information</h4>
                                        </div>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                                <IoMdCheckmark className='text-xl me-2 text-green-500' />
                                                <span>Free shipping on orders over $50</span></li>
                                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                                <IoMdCheckmark className='text-xl me-2 text-green-500' />
                                                <span>Standard delivery: 3-5 business days</span></li>
                                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                                <IoMdCheckmark className='text-xl me-2 text-green-500' />
                                                <span>Express delivery available (1-2 business days)</span></li>
                                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                                <IoMdCheckmark className='text-xl me-2 text-green-500' />
                                                <span>Track your order in real-time</span></li>
                                        </ul>
                                    </div>
                                    <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
                                                <IoMdRefresh className="text-white text-3xl"/>
                                                
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Returns &amp; Refunds</h4>
                                        </div>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-2 text-sm text-gray-700"><IoMdCheckmark className='text-xl me-2 text-green-500' /><span>30-day hassle-free returns</span></li>
                                            <li className="flex items-start gap-2 text-sm text-gray-700"><IoMdCheckmark className='text-xl me-2 text-green-500' /><span>Full refund or exchange available</span></li>
                                            <li className="flex items-start gap-2 text-sm text-gray-700"><IoMdCheckmark className='text-xl me-2 text-green-500' /><span>Free return shipping on defective items</span></li>
                                            <li className="flex items-start gap-2 text-sm text-gray-700"><IoMdCheckmark className='text-xl me-2 text-green-500' /><span>Easy online return process</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
                                    <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
                                        <FaShieldAlt className='text-2xl'/>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Buyer Protection Guarantee</h4>
                                        <p className="text-sm text-gray-600">Get a full refund if your order doesn&apos;t arrive or isn&apos;t as described. We
                                            ensure your shopping experience is safe and secure.</p>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </section>
    
    </>
  )
}
