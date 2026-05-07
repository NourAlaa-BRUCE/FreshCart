"use client"
import logo from "../../assets/images/Component 1.svg"
import { useContext, useState } from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { IoHeadset, IoSearchSharp } from "react-icons/io5"
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { FiUser } from "react-icons/fi"
import { HiMenu } from "react-icons/hi"
import { signOut, useSession } from "next-auth/react"
import { CartItemsContext } from "../_context/CartContextProvider"
export default function NavBar() {
  const session = useSession()
  console.log(session.data);
  const { dataOfCartItems } = useContext(CartItemsContext)!
  const numberOfCartItems = dataOfCartItems?.numOfCartItems
  const [listUserData, setlistUserData] = useState(false)
  return (
    <NavigationMenu className="py-2 xl:px-2 sm:px-10  sticky top-0 z-50 w-full block max-w-none  pr-4 bg-white shadow">
      <NavigationMenuList className="flex justify-between w-full gap-4">

        <NavigationMenuItem>
          <NavigationMenuLink asChild className="hover:bg-transparent">
            <Link href="/"><img src={logo.src} alt="LogoSite" className="shrink-0" /></Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden lg:block flex-1 w-full">
          <NavigationMenuLink asChild className="hover:bg-transparent">
            <div className="relative">
              <IoSearchSharp className="absolute right-3.5 text-white rounded-full p-2.5 cursor-pointer hover:bg-[#138e40] transition-all bg-[#16A34A] box-content" />
              <input type="text" placeholder="Search for products, prands and more..."
                className="w-full transition-all focus:border focus:border-[#16A34A] focus:outline-3 focus:outline-emerald-100 rounded-full py-3 pl-5 pr-12 border border-[#E5E7EB]" />
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <div className="xl:flex items-center gap-6 text-[16px] text-[#364153] mx-2 hidden ">
            <Link href="/" className="cursor-pointer hover:text-green-500 transition-all">Home</Link>
            <Link href="/products" className="cursor-pointer hover:text-green-500 transition-all">Shop</Link>
            <Link href="/categories" className="cursor-pointer hover:text-green-500 transition-all">Categories</Link>
            <Link href="/brands" className="cursor-pointer hover:text-green-500 transition-all">Brands</Link>
          </div>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:opacity-70 transition-all">
            <IoHeadset className="rounded-full p-3 text-[#0e923c] bg-[#0eb5351a] box-content" />
            <div className="text-[12px]">
              <div className="text-gray-400">Support</div>
              <div >24/7 Help</div>
            </div>
          </div>
          <span className="hidden lg:flex w-px h-8 bg-gray-200"></span>
          <div className="flex items-center gap-2">
            <Link href={"/wishlist"} className="cursor-pointer hover:text-green-600 transition-all p-3 rounded-full text-gray-500 text-xl hover:bg-gray-100">
              <FaRegHeart />
            </Link>
            <Link href={"/cart"} className="relative cursor-pointer hover:text-green-600 transition-all p-3 rounded-full text-gray-500 text-xl hover:bg-gray-100">
              <div className={`${!numberOfCartItems ? "hidden" : ""} border-2 border-white absolute top-1 right-0 text-white bg-red-500 rounded-full px-1 text-[12px]`}>{numberOfCartItems}</div>
              <FaShoppingCart />
            </Link>
          </div>
          {
            session.data ?
              <div className="relative cursor-pointer hover:text-green-600 transition-all p-3 rounded-full text-gray-500 text-xl hover:bg-gray-100">
                <FaRegUserCircle onClick={() => setlistUserData(!listUserData)} />
                <div className={`absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl transition-all duration-200 origin-top-right opacity-100 scale-100 ${listUserData ? "" : "hidden"}`}>
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center"><FaRegUserCircle /></div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{session.data.user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{session.data.user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/profile"><svg data-prefix="far" data-icon="user" className="svg-inline--fa fa-user w-4 text-gray-400" role="img" viewBox="0 0 448 512" aria-hidden="true">
                      <path fill="currentColor" d="M144 128a80 80 0 1 1 160 0 80 80 0 1 1 -160 0zm208 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0zM48 480c0-70.7 57.3-128 128-128l96 0c70.7 0 128 57.3 128 128l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8c0-97.2-78.8-176-176-176l-96 0C78.8 304 0 382.8 0 480l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8z">
                      </path>
                    </svg>My Profile</Link>
                    <Link className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/allorders">
                      <svg data-prefix="fas" data-icon="box-open" className="svg-inline--fa fa-box-open w-4 text-gray-400" role="img" viewBox="0 0 640 512" aria-hidden="true">
                        <path fill="currentColor" d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z">
                        </path>
                      </svg>My Orders</Link>
                      <Link className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/wishlist"><svg data-prefix="far" data-icon="heart" className="svg-inline--fa fa-heart w-4 text-gray-400" role="img" viewBox="0 0 512 512" aria-hidden="true">
                        <path fill="currentColor" d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z">
                        </path>
                      </svg>My Wishlist</Link><Link className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/profile/addresses"><svg data-prefix="far" data-icon="address-book" className="svg-inline--fa fa-address-book w-4 text-gray-400" role="img" viewBox="0 0 512 512" aria-hidden="true">
                        <path fill="currentColor" d="M384 48c8.8 0 16 7.2 16 16l0 384c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16L80 64c0-8.8 7.2-16 16-16l288 0zM96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM240 248a56 56 0 1 0 0-112 56 56 0 1 0 0 112zm-32 40c-44.2 0-80 35.8-80 80 0 8.8 7.2 16 16 16l192 0c8.8 0 16-7.2 16-16 0-44.2-35.8-80-80-80l-64 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 192c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64z">
                        </path>
                      </svg>Addresses</Link><Link className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/profile/settings"><svg data-prefix="fas" data-icon="gear" className="svg-inline--fa fa-gear w-4 text-gray-400" role="img" viewBox="0 0 512 512" aria-hidden="true">
                        <path fill="currentColor" d="M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z">
                        </path>
                      </svg>Settings</Link></div>
                  <div className="border-t border-gray-100 py-2"><button onClick={() => signOut({ redirect: true, callbackUrl: "/" })} className="cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"><svg data-prefix="fas" data-icon="right-from-bracket" className="svg-inline--fa fa-right-from-bracket w-4" role="img" viewBox="0 0 512 512" aria-hidden="true">
                    <path fill="currentColor" d="M505 273c9.4-9.4 9.4-24.6 0-33.9L361 95c-6.9-6.9-17.2-8.9-26.2-5.2S320 102.3 320 112l0 80-112 0c-26.5 0-48 21.5-48 48l0 32c0 26.5 21.5 48 48 48l112 0 0 80c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2L505 273zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z">
                    </path>
                  </svg>Sign Out</button></div>
                </div>

              </div>
              :
              <Button className="cursor-pointer hover:bg-green-700 rounded-full text-white bg-green-600 p-5 hidden lg:flex">
                <Link href="/login" className="flex items-center gap-3">
                  <FiUser />
                  <span>Sign In</span>
                </Link>
              </Button>
          }

          <Button className="cursor-pointer hover:bg-green-700 rounded-full text-white bg-green-600 px-3 py-5 flex lg:hidden">
            <HiMenu />
          </Button>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

