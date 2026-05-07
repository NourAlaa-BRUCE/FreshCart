"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination} from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';
interface ItemSliderProps{
    images: string[]
}
export default function ItemSlider({images}:ItemSliderProps){
    const [idx, setidx] = useState(1)
  return (
    <div className="relative overflow-hidden">
        <Swiper
        modules={[Pagination]}
        className='h-115 w-full'
        loop
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(swiper) => setidx(swiper.activeIndex)}
        pagination={{ clickable: true ,el:".custom-pagination",bulletClass:'swiper-pagination-bullet h-35! w-25! opacity-100! rounded-none! m-0! hover:border-cyan-700! hover:border-4 transition-all',bulletActiveClass:'swiper-pagination-bullet-active border-cyan-700! border-4!', renderBullet: function (index, className) {
      return `
        <span class="${className} w-full">
          <img src="${images[index]}" class="object-cover rounded-0 w-full h-full" />
        </span>
      `;}
    }}
        >
        {images.map((img, idx)=>{
                return <SwiperSlide key={idx}><img className='h-full w-full object-contain object-center' src={img} alt='Image Item' /></SwiperSlide>
        })}
        </Swiper>
        <div style={{ transform: `translateX(-${idx * 30}px)`,transition: `transform 0.5s ease` }} className="custom-pagination w-120! mx-auto mt-3 px-4"></div>
    </div>
  );
};