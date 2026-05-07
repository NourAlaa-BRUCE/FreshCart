"use client"
// Import Swiper React components
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


interface SlideProps{
  images?: SlideDetails[],
  spaceBetween?:number,
  slidesPerView?:number
}
interface SlideDetails{
  img? : string,
  header? : string,
  text? : string,
  buttons? : button[]
}
interface button{
  color? : string
  text? : string
}
export default function HomeSlider({images , spaceBetween=0 , slidesPerView=1}:SlideProps) {
  


  return (
    <Swiper
    className='h-100 relative'
    modules={[Navigation , Pagination]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      loop
      navigation={{
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    }}
      pagination={{ clickable: true , bulletClass: 'swiper-pagination-bullet !h-3 !w-3 !bg-white !opacity-50 !hover:opacity-80 !transition-all !hover:scale-120',bulletActiveClass: 'swiper-pagination-bullet-active rounded-full! w-8! h-3! bg-white! opacity-100!'}}
      
    >
      {images?.map((image , index)=>{

       return <SwiperSlide key={index} className='relative w-full h-100'>
        <div className="h-full bg-cover bg-center min-w-full"
          style={{ backgroundImage: `linear-gradient(to right, #00C950E5, #05DF7280),url(${images[index].img})` }}
        >
          <div className="container h-full content-center p-10 md:p-20">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 max-w-96" style={{ opacity: 1, transform: 'none' }}>
              {image.header}</h2>
            <p style={{ opacity: 1, transform: 'none' }} className="text-white">{image.text}</p>
            <div className="mt-4" style={{ opacity: 1, transform: 'none' }}>
              <Link className={`bg-white border-2 border-white/50 ${image.buttons?image.buttons[0].color:""} inline-block px-6 py-2 rounded-lg hover:scale-105 transition-transform`} href="/products">{image.buttons?image.buttons[0].text:""}</Link>
              <Link className="bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg hover:scale-105 transition-transform" href="#">{image.buttons?image.buttons[1].text:""}</Link></div>
          </div>
          
        </div>
       </SwiperSlide>
      })}
      <button className="custom-prev opacity-80 hover:scale-110 hover:opacity-100 hover:text-green-600 transition-all absolute top-1/2 left-5 z-10 cursor-pointer p-3 rounded-full bg-white text-green-500 text-2xl">
          <IoIosArrowBack />
      </button>
      <button className="custom-next opacity-80 hover:scale-110 hover:opacity-100 hover:text-green-600 transition-all absolute top-1/2 right-5 z-10 cursor-pointer p-3 rounded-full bg-white text-green-500 text-2xl">
          <IoIosArrowForward />
      </button>
      {/* <div className="opacity-80 hover:scale-110 hover:opacity-100 hover:text-green-600 transition-all absolute top-1/2 right-5 z-10 cursor-pointer p-3 rounded-full bg-white text-green-500 text-2xl"> </div>
      <div className="opacity-80 hover:scale-110 hover:opacity-100 hover:text-green-600 transition-all absolute top-1/2 left-5 z-10 cursor-pointer p-3 rounded-full bg-white text-green-500 text-2xl"> </div> */}
      </Swiper>
  );
};