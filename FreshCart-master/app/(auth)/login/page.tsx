"use client"
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import image from "../../../assets/images/login.png"
import { FaClock, FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaStar, FaTruck, FaUsers } from 'react-icons/fa6'
import { FaShieldAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { IoLockClosed } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, SigninType } from './loginSchema'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { CartItemsContext } from '@/app/_context/CartContextProvider'
import { WishListItemsContext } from '@/app/_context/WishListContextProvider'
export default function Login() {
  const router = useRouter()
  const {RefreshCartItems} = useContext(CartItemsContext)!
  const {RefreshWishListData} = useContext(WishListItemsContext)!
  const [loading, setloading] = useState(false)
  const {register , handleSubmit , formState} = useForm({
      defaultValues:{
        email:"",
        password:""
      },
      resolver: zodResolver(loginSchema)
    })
  
    const [error, seterror] = useState('')
    async function handleLogin(values: SigninType){
      console.log(values);
      setloading(true)
      const res = await signIn("credentials", {redirect: false,  callbackUrl:"/" , ...values})
      console.log(res);
      

      if(res?.error){
          seterror(res.error)
      }else{
        seterror('')
        toast.success("logged in successfully" , {position: "top-right" ,richColors: true})
        RefreshCartItems()
        RefreshWishListData()
        router.refresh()
        router.push("/")

      }
      setloading(false)
    }
  return (
    <div className="container py-16 mx-auto px-4" id="login-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div className="hidden lg:block">
          <div className="text-center space-y-6"><img className="w-full h-96 object-cover rounded-2xl shadow-lg" alt="fresh vegetables and fruits shopping cart illustration, modern clean style, green theme" src={image.src} />
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">FreshCart - Your One-Stop Shop for Fresh Products</h2>
              <p className="text-lg text-gray-600">Join thousands of happy customers who trust FreshCart for their
                daily grocery needs</p>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FaTruck className=" text-green-600" />
                  Free Delivery</div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt className=" text-green-600" />
                  Secure Payment</div>
                <div className="flex items-center gap-2">
                  <FaClock className=" text-green-600" />
                  24/7 Support</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4"><span className="text-3xl font-bold text-green-600">Fresh<span className="text-gray-800">Cart</span></span></div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
              <p className="text-gray-600">Sign in to continue your fresh shopping experience</p>
            </div>
            <div className="space-y-3 mb-6">
              <button type="button" className="cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200">
                <FaGoogle className='text-red-500 text-xl' />
                <span className="font-medium text-gray-700">Continue with Google</span>
              </button>
              <button type="button" className="cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200">
                <FaFacebook className='text-blue-600 text-xl' />
                <span className="font-medium text-gray-700">Continue with Facebook</span>
              </button></div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500 font-medium">OR CONTINUE WITH EMAIL</span></div>
            </div>
        <div className={`${error ? 'block' : 'hidden'} text-error bg-red-200 p-3 rounded-lg mb-4`}>{error}</div>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
              <div className="flex flex-col gap-2"><label htmlFor="email">Email</label>
                <div className="relative">
                  <input className={`w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none ${formState.errors?.email ? 'focus:border-red-500 border-red-500' : 'focus:border-green-500'} focus:ring-2 focus:ring-green-100 transition-all`} placeholder="Enter your email" id="email" type="email" {...register("email")} />
                  <MdEmail className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-xl' />
                </div>
                <div className={`${formState.errors?.email ? 'block' : 'hidden'} text-error bg-red-200 p-3 rounded-lg`}>{formState.errors?.email?.message}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <label htmlFor="password">Password</label>
                  <Link className="text-sm text-green-600 hover:text-green-700 cursor-pointer font-medium" href="/forget-password">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <input id="password" className={`w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none ${formState.errors?.password ? 'focus:border-red-500 border-red-500' : 'focus:border-green-500'} focus:ring-2 focus:ring-green-100 transition-all`} placeholder="Enter your password" type="password" {...register("password")} />
                  <IoLockClosed className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-xl' />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                    <FaEye className='absolute top-1/2 -translate-y-1/2 right-2 text-xl' />
                    {/* <FaEyeSlash className='absolute top-1/2 -translate-y-1/2 right-2 text-xl'/> */}
                  </button>
                </div>
                <div className={`${formState.errors?.password ? 'block' : 'hidden'} text-error bg-red-200 p-3 rounded-lg`}>{formState.errors?.password?.message}</div>
              </div>
          
          <div className="flex items-center justify-between"><label className="flex items-center"><input className="h-4 w-4 text-green-600 accent-green-600 border-2 border-gray-300 rounded focus:ring-green-500" type="checkbox" name="rememberMe" /><span className="ml-3 text-sm text-gray-700">Keep me
            signed in</span></label>
          </div>
          <button disabled={loading} type="submit" className={`cursor-pointer w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-600">New to FreshCart?<Link className="text-green-600 hover:text-green-700 ms-2 font-semibold cursor-pointer" href="/signup">Create an account</Link></p>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <IoLockClosed className="text-md" />
            SSL Secured</div>
          <div className="flex items-center gap-1">
            <FaUsers className="text-md" />
            50K+ Users</div>
          <div className="flex items-center gap-1">
            <FaStar className="text-md" />
            4.9 Rating</div>
        </div>
      </div>
    </div>
  </div>
    </div>

  )
}
