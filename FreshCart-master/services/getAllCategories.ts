import { category } from '../types/product.type';
export async function getAllCategories(): Promise<category[]> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories",{cache:"force-cache"})
  const final = await res.json()
  return final.data
}