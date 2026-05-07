import { getAllProducts } from '@/services/getAllProducts'
import { product } from '@/types/product.type'
import Product from '../_components/Product'
import Link from 'next/link'
import { FaBoxOpen } from 'react-icons/fa6'

export default async function page() {
    const products: product[] = await getAllProducts()
    return (<>
        <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
            <div className="container mx-auto px-4 py-10 sm:py-14">
                <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap"><Link className="hover:text-white transition-colors" href="/">Home</Link><span className="text-white/40">/</span><span className="text-white font-medium">All Products</span></nav>
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                        <FaBoxOpen className='text-3xl' />
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">All Products</h1>
                        <p className="text-white/80 mt-1">Explore our complete product collection</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="container mx-auto px-5 xl:px-6">
            <div className="flex items-center gap-3 my-8">
                <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
                <h2 className="text-3xl font-bold text-gray-800">Featured <span className="text-emerald-600">Products</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => {
                    return <Product key={product._id} product={product} />
                })}
            </div>
        </div>
    </>)
}
