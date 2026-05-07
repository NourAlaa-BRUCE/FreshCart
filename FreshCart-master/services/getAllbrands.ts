import { brand } from '../types/product.type';
export async function getAllBrands(): Promise<brand[]> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands",{cache:"force-cache"})
  const final = await res.json()
  return final.data
}