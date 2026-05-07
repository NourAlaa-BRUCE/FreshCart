import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

export default function LoadingComponent({ message }: { message: string}) {
    return (
        <div className="flex items-center justify-center min-h-screen p-5 bg-green-50">
            <div className='text-center'>
               
                        <RotatingLines
                            visible={true}
                            width={50}
                            height={50}
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass="flex justify-center"
                        />

                <div className="pt-3 text-gray-500">{message}</div>
            </div>
        </div>
    )
}
