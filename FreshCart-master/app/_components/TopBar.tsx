"use client"
import React from 'react'
import { FaGift, FaUser } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { PiSignOutBold } from 'react-icons/pi';
export default function TopBar() {
    const session = useSession()
    function handleLogout(){
        signOut({redirect:true , callbackUrl:"/"})
    }
  return (
    <section className='hidden lg:flex items-center justify-between px-4 py-2 text-[#6A7282] border-b border-b-[#F3F4F6] text-[14px]'>
        <div className="flex items center gap-6">
            <div className="flex items-center gap-2">
                <FaTruck className='text-[#16A34A] text-sm'/>
                <p>Free Shipping on Orders 500 EGP</p>
            </div>
            <div className="flex items-center gap-2">
                <FaGift className='text-[#16A34A] text-sm'/>
                <p>New Arrivals Daily</p>
            </div>
        </div>
        <div className="flex items center gap-6">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer hover:text-[#16A34A]">
                    <FaPhoneAlt/>
                    <p>+1 (800) 123-4567</p>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-[#16A34A]">
                    <MdMailOutline/>
                    <p>support@freshcart.com</p>
                </div>
            </div>
            <span className="w-px h-4 bg-gray-200"></span>
            {session.data?
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-[#16A34A]">
                        <FaUser />
                        <Link href="/profile">{session.data?.user?.name}</Link>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-red-500">
                        <PiSignOutBold />
                        <button onClick={handleLogout} className='cursor-pointer'>Sign out</button>
                    </div>
                </div>
            :
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer hover:text-[#16A34A]">
                    <FaRegUser/>
                    <Link href="/login">Sign In</Link>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-[#16A34A]">
                    <FaUserPlus/>
                    <Link href="/signup">Sign Up</Link>
                </div>

            </div>}
        </div>

    </section>
  )
}
