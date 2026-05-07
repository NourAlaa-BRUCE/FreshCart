import { FaBox, FaCalendarWeek, FaClock, FaHashtag, FaLocationDot, FaMoneyBill, FaPhone, FaReceipt } from 'react-icons/fa6';
import { getAllOrders } from '../_actions/orders.action'
import Image from 'next/image';

export default async function Page() {
    const data = await getAllOrders()
    console.log(data);
    function DateFormate(createdAt:string){
        const date = new Date(createdAt);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        
    }
    return (
        data.map((order) => {
            return <div key={order.id} className="bg-green-100 m-3 border-t-8! border-t-green-600! rounded-2xl border transition-all duration-300 overflow-hidden border-green-200 shadow-lg shadow-olive-900-100/50">
                <div className="p-5 sm:p-6">
                    <div className="flex gap-5">

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 rounded-lg mb-2">
                                        <FaClock className='text-amber-600' />
                                        <span className="text-xs font-semibold text-amber-600">Processing</span></div>
                                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                        <FaHashtag className='text-gray-400' />
                                        {order.id}</h3>
                                </div>
                                <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                                    <FaMoneyBill className='text-gray-500' />
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4"><span className="flex items-center gap-1.5">
                                <FaCalendarWeek />
                                {DateFormate(order.createdAt)}</span><span className="w-1 h-1 rounded-full bg-gray-300" /><span className="flex items-center gap-1.5">
                                    <FaBox />
                                    {order.cartItems.length} items</span><span className="w-1 h-1 rounded-full bg-gray-300" /><span className="flex items-center gap-1.5">
                                    <FaLocationDot />
                                    {order.shippingAddress.city}</span></div>
                            <div className="flex items-center justify-between gap-4">
                                <div><span className="text-2xl font-bold text-gray-900">{order.totalOrderPrice}</span><span className="text-sm font-medium text-gray-400 ml-1">EGP</span></div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-100 bg-gray-50/50">
                    <div className="p-5 sm:p-6">
                        <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                                <FaReceipt className='text-green-600' />
                            </div>Order Items
                        </h4>
                        {order.cartItems.map((item)=>{
                            return <div key={item._id} className="my-1">
                            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                                <div className="relative w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                                    <Image fill loading='lazy' alt={item.product.description || 'Image Item'} className="w-full h-full object-contain" src={item.product.imageCover} /></div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{item.product.title}</p>
                                    <p className="text-sm text-gray-500 mt-1"><span className="font-medium text-gray-700">{item.count}</span> × {item.price}
                                        EGP</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-lg font-bold text-gray-900">{item.count * item.price}</p>
                                    <p className="text-xs text-gray-400">EGP</p>
                                </div>
                            </div>
                        </div>
                            })}
                    </div>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-xl border border-gray-100">
                            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <FaLocationDot className='text-xs text-blue-600' />
                                </div>Delivery Address
                            </h4>
                            <div className="space-y-2">
                                <p className="font-medium text-gray-900">{order.shippingAddress.city}</p>
                                <p className="text-sm text-gray-600 leading-relaxed">{order.shippingAddress.details}</p>
                                <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                                    <FaPhone className='text-xs text-gray-400' />
                                    {order.shippingAddress.phone}</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-100 border border-amber-200">
                            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
                                    <FaClock className='text-xs text-white' />
                                </div>Order Summary
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-medium">{order.totalOrderPrice} EGP</span></div>
                                <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="font-medium">{order.shippingPrice||"Free"}</span></div>
                                <hr className="border-gray-200/50 my-2" />
                                <div className="flex justify-between pt-1"><span className="font-semibold text-gray-900">Total</span><span className="font-bold text-lg text-gray-900">{order.shippingPrice? order.shippingPrice+order.totalOrderPrice:order.totalOrderPrice} EGP</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })

    )
}
