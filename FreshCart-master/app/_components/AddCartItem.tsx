"use client"
import { FaCartShopping } from 'react-icons/fa6'
import { AddItemToCart } from '../_actions/addToCart.action'
import { toast } from 'sonner';
import { useContext, useState } from 'react';
import { CartItemsContext } from '../_context/CartContextProvider';
import { CartResponseType } from '@/types/cart.type';

export default function AddCartItem({ id }: { id: string }) {
    const { setdataOfCartItems } = useContext(CartItemsContext)!
    const [loadingAddToCart, setloadingAddToCart] = useState(false)
    async function AddItemToCartHandle() {
        setloadingAddToCart(true)
        try {
            const data : CartResponseType = await AddItemToCart(id)
            console.log(data);
            setdataOfCartItems(data)
            toast.success(data?.message, { position: "top-center", richColors: true })

        } catch (error) {

            toast.error("Please try again", { position: "top-center", richColors: true })
        }
        setloadingAddToCart(false)
    }

    return (
        <button disabled={loadingAddToCart} onClick={() => AddItemToCartHandle()} className="cursor-pointer flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-600 disabled:bg-green-300 text-white hover:bg-green-700">
            <FaCartShopping className="text-xs" />
            <span className="md:hidden lg:inline">{loadingAddToCart ? "Loading..." : "Add to Cart"}</span>
        </button>
    )
}
