import { product } from '@/types/product.type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {FaRegEye, FaRegStar, FaStar } from 'react-icons/fa6'
import { FiRefreshCw } from 'react-icons/fi'
import { PiStarHalfDuotone } from 'react-icons/pi'
import AddToCartBtn from './AddToCartBtn'
import AddToWishListBtn from './AddToWishListBtn'

interface productProps{
    product:product
}
export default async function Product({product}:productProps) {
    
    return (
        <div id="product-card" className="hover:shadow-xl hover:-translate-y-1.25 transition-all duration-300 bg-white border border-gray-200 rounded-lg overflow-hidden w-full h-full">
            <div className="relative"><Image width={240} height={273} className="w-full h-70 object-contain bg-white mx-auto" alt={product.description} src={product.imageCover} />
                <div className="absolute top-3 left-3">{product.priceAfterDiscount ?<span className="bg-red-500 text-white text-xs px-2 py-1 rounded">{ `${Math.round((product.priceAfterDiscount/product.price)*100) -100}%`}</span>:""}</div>
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <AddToWishListBtn productId={product._id}/>
                    <button className="cursor-pointer bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-green-600 shadow-sm">
                        <FiRefreshCw className="font-bold text-xl"/>
                    </button>
                    <Link className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-green-600 shadow-sm" href={`/products/${product._id}`}>
                        <FaRegEye className="font-bold text-xl"/>
                    </Link></div>
            </div>
            <div className="p-4">
                <div className="text-xs text-gray-500 mb-1">{product.category.name}</div>
                <h3 className="font-medium mb-1 cursor-pointer text-[#364153]" title={product.title}><Link className="line-clamp-2" href={`/products/${product._id}`}>{product.title}</Link></h3>
                <div className="flex items-center mb-2">
                    <div className="flex text-amber-400 mr-2 text-xl">
                        {[...Array(5)].map((star, index) => {
                            return <div key={index} className="text-yellow-400">
                                {index+1 <= product.ratingsAverage ?<FaStar />:Math.floor(product.ratingsAverage) === index && product.ratingsAverage !== index?<PiStarHalfDuotone /> : <FaRegStar />}
                            </div>
                        })}
                    </div><span className="text-xs text-gray-500">{product.ratingsAverage} ({product.ratingsQuantity})</span>
                </div>
                <div className="flex items-center justify-between">
                    <div><span className={`text-lg font-bold ${product.priceAfterDiscount ?"text-green-600":"text-[#1E2939]"}`}>{product.priceAfterDiscount ?  product.priceAfterDiscount:product.price} EGP</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{product.priceAfterDiscount ?  `${product.price} EGP`:""} </span></div>
                    <AddToCartBtn productId={product._id}/>
                </div>
            </div>
        </div>

    )
}
