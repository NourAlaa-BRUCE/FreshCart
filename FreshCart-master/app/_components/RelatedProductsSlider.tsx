"use client"
// import Swiper core and required modules
import { Navigation} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { product } from '@/types/product.type';
import Product from './Product';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
interface RelatedProductsProps{
    filteredproducts:product[]
}
export default function RelatedProductsSlider({filteredproducts}:RelatedProductsProps){
  return (<>
    <div className="relative">
      <button className="custom-prev hover:scale-110 hover:opacity-100 hover:text-green-600 transition-all absolute -top-15 right-18 z-10 cursor-pointer p-3 rounded-full bg-gray-100 text-green-500 text-2xl">
        <IoIosArrowBack />
      </button>
      <button className="custom-next hover:scale-110 hover:opacity-100 hover:text-green-600 transition-all absolute -top-15 right-5 z-10 cursor-pointer p-3 rounded-full bg-gray-100 text-green-500 text-2xl">
          <IoIosArrowForward />
      </button>
    </div>  
    <Swiper
      // install Swiper modules
      modules={[Navigation]}
      className='w-full'
      spaceBetween={10}
      breakpoints={{
        0: {
        slidesPerView: 1,
        },
        500: {
        slidesPerView: 2,
        },
        640: {
        slidesPerView: 3,
        },
        1024: {
        slidesPerView: 4,
        },
        1124: {
        slidesPerView: 5,
        }
    }}
      navigation={{
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    }}
    >
      {filteredproducts.map((product , idx)=>
        {return <SwiperSlide key={idx} className='h-auto!'><Product product={product}/></SwiperSlide>}
        )}
    </Swiper>
    
  </>);
};