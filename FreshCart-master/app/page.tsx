import { FaRedo, FaShieldAlt } from "react-icons/fa";
import { FaApple, FaArrowRight, FaGooglePlay, FaLeaf, FaTag, FaTruck } from "react-icons/fa6";
import { IoHeadset } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";
import  HomeSlider from "./_components/HomeSlider";
import { category , product } from '../types/product.type';
import { getAllCategories } from "@/services/getAllCategories";
import Image from "next/image";
import { getAllProducts } from '@/services/getAllProducts'
import image from "../assets/images/HeroSection.png"
import Product from "./_components/Product";
import { getMyToken } from "@/utils/getMyToken";

export default async function Home() {
  
  
    

  const images = [
   {img:image.src,header:"Fresh Products Delivered to your Door",text:"Get 20% off your first order",buttons:[{color:"text-green-500",text:"Shop Now"},{text:"View Deals"}]}
  ,{img:image.src,header:"Premium Quality Guaranteed",text:"Fresh from farm to your table",buttons:[{color:"text-blue-500",text:"Shop Now"},{text:"Learn More"}]}
  ,{img:image.src,header:"Fast & Free Delivery",text:"same day delivery available",buttons:[{color:"text-purple-500",text:"Order Now"},{text:"Delivery Info"}]}]
  const categories: category[] = await getAllCategories()
  const products: product[] = await getAllProducts()
  
  return (
    <main>
      <section className="relative overflow-hidden">
        <HomeSlider
        images={images} 
        spaceBetween={0}
        slidesPerView={1}/>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-5 xl:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ opacity: 1, transform: 'none' }}>
              <div className="text-2xl  bg-blue-50 text-blue-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <FaTruck />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Free Shipping</h3>
                <p className="text-xs text-gray-500">On orders over 500 EGP</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ opacity: 1, transform: 'none' }}>
              <div
                className="text-2xl bg-emerald-50 text-emerald-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <FaShieldAlt />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Secure Payment</h3>
                <p className="text-xs text-gray-500">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ opacity: 1, transform: 'none' }}>
              <div
                className="text-2xl bg-orange-50 text-orange-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <FaRedo />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Easy Returns</h3>
                <p className="text-xs text-gray-500">14-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ opacity: 1, transform: 'none' }}>
              <div
                className="text-2xl bg-purple-50 text-purple-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <IoHeadset />

              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">24/7 Support</h3>
                <p className="text-xs text-gray-500">Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div className="flex  items-center gap-3 my-8">
              <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Shop By <span className="text-emerald-600">Category</span></h2>
            </div> <Link className="text-green-600 self-end sm:self-auto hover:text-green-700 font-medium flex items-center cursor-pointer" href="categories">View All Categories
              <FaArrowRight className="ps-2 box-content"/>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              return <Link key={category._id} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer" href="/categories/6439d61c0049ad0b52b90051">
                <div className="h-20 w-20 overflow-hidden bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition">
                  <Image alt={category.name} width={300} height={300} className="w-full h-full object-cover" src={category.image} />
                </div>
                <h3 className="font-medium">{category.name}</h3>
              </Link>
            })}
          </div>
        </div>
      </section>


      <section className="py-10">
        <div className="container mx-auto px-5 xl:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-white" style={{ opacity: 1, transform: 'none' }}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2">
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2">
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                  <span>🔥</span><span>Deal of the Day</span></div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Fresh Organic Fruits</h3>
                <p className="text-white/80 mb-4">Get up to 40% off on selected organic fruits</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold">40% OFF</div>
                  <div className="text-sm text-white/70">Use code: <span className="font-bold text-white">ORGANIC40</span>
                  </div>
                </div><Link className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors" href="/products">Shop Now
                  <FaArrowRight />
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-rose-500 p-8 text-white" style={{ opacity: 1, transform: 'none' }}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2">
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2">
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                  <span>✨</span><span>New Arrivals</span></div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Exotic Vegetables</h3>
                <p className="text-white/80 mb-4">Discover our latest collection of premium vegetables</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold">25% OFF</div>
                  <div className="text-sm text-white/70">Use code: <span className="font-bold text-white">FRESH25</span>
                  </div>
                </div><Link className="inline-flex items-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors" href="/products?sort=newest">Explore Now

                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
            <div className="container mx-auto px-5 xl:px-6">
                        <div className="flex items-center gap-3 my-8">
                            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
                            <h2 className="text-3xl font-bold text-gray-800">Featured <span className="text-emerald-600">Products</span></h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {products.map((product) => {
                                return <Product key={product._id} product={product}/>
                            })}
                        </div>
                    </div>

      </section>


      <section className="py-16 bg-linear-to-b from-white to-gray-50 overflow-hidden">
        <div className="container mx-auto px-5 xl:px-6">
          <div className="relative">
            <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 rounded-[2.5rem] border border-emerald-100/50 shadow-2xl shadow-emerald-500/10 overflow-hidden" style={{ opacity: 1, transform: 'none' }}>
              <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none">
              </div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-teal-200/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none">
              </div>
              <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14">
                <div className="lg:col-span-3 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <IoMdMail className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">Newsletter
                      </h3>
                      <p className="text-xs text-gray-500">50,000+ subscribers</p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">Get the Freshest
                      Updates <span className="text-emerald-600"> Delivered Free</span></h2>
                    <p className="text-gray-500 mt-3 text-lg">Weekly recipes, seasonal offers &amp; exclusive member
                      perks.</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
                      <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center">
                        <FaLeaf className="text-sm text-green-600" />
                      </div><span className="text-sm font-medium text-gray-700">Fresh Picks
                        Weekly</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
                      <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center">
                        <FaTruck className="text-sm text-green-600" />
                      </div><span className="text-sm font-medium text-gray-700">Free Delivery
                        Codes</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
                      <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center">
                        <FaTag className="text-sm text-green-600" />
                      </div><span className="text-sm font-medium text-gray-700">Members-Only
                        Deals</span>
                    </div>
                  </div>
                  <form className="pt-2">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1"><input type="email" placeholder="you@example.com" className="w-full pl-5 pr-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-base shadow-sm" required /></div>
                      <button type="submit" className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 shadow-lg bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:scale-[1.02]"><span>Subscribe</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-all" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 pl-1">✨ Unsubscribe anytime. No spam, ever.</p>
                  </form>
                </div>
                <div className="lg:col-span-2 lg:border-l lg:border-emerald-100 lg:pl-8">
                  <div className="h-full flex flex-col justify-center">
                    <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl">
                      </div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl">
                      </div>
                      <div className="relative space-y-5">
                        <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30">
                          📱 MOBILE APP</div>
                        <h3 className="text-2xl font-bold leading-tight">Shop Faster on Our App</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Get app-exclusive deals &amp; 15%
                          off your first order.</p>
                        <div className="flex flex-col gap-3 pt-2">
                          <Link href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]">
                            <FaApple className="text-xl" />
                            <div className="text-left">
                              <div className="text-[10px] text-gray-400 uppercase tracking-wide">Download
                                on</div>
                              <div className="text-sm font-semibold -mt-0.5">App Store</div>
                            </div>
                          </Link><Link href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]">
                            <FaGooglePlay className="text-xl" />
                            <div className="text-left">
                              <div className="text-[10px] text-gray-400 uppercase tracking-wide">Get it on
                              </div>
                              <div className="text-sm font-semibold -mt-0.5">Google Play</div>
                            </div>
                          </Link></div>
                        <div className="flex items-center gap-2 pt-2 text-sm"><span className="text-yellow-400">★★★★★</span><span className="text-gray-400">4.9 • 100K+
                          downloads</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      


    </main>
  );
}
