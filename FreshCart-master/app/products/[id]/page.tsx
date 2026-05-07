import ProductDetails from '@/app/_components/ProductDetails'
import RelatedProductsSlider from '@/app/_components/RelatedProductsSlider'
import { getAllProducts } from '@/services/getAllProducts'
import { getProductDetails } from '@/services/getProductDetails'
import { product } from '@/types/product.type'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}
export default async function Page({params}:Props) {
    const {id} = await params
    const product:product = await getProductDetails(id)
    if (!product) redirect("/not-found")
    console.log(product);
    const relatedProduts = (await getAllProducts()).filter((Filteredproduct)=>product?.category?.name === Filteredproduct?.category?.name && product._id !== Filteredproduct._id)
    
    return (
        <main>
            <ProductDetails product={product}/>


            <section id="similar-products" className="py-10">
                <div className="mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
                            <h2 className="text-2xl font-bold text-gray-800">You May Also <span className="text-emerald-600">Like</span>
                            </h2>
                        </div>
                        
                    </div>
                    <RelatedProductsSlider filteredproducts={relatedProduts}/>
                </div>
            </section>

        </main>
    )
}
