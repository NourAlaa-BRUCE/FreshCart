import React from 'react'
import { Circles } from 'react-loader-spinner'

export default function loading() {
  return (
    <div className='flex items-center justify-center bg-green-50 left-0 w-full h-screen text-center'>
        <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
  )
}
