import { product } from '../types/product.type';
export async function getAllProducts(): Promise<product[]> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products",{cache:"force-cache"})
  const final = await res.json()
  return final.data
}