import { product } from "./product.type"

export interface wishlistRes {
    data: string[]
    message: string
    status: string
}
export interface getLoggedUserWishListType {
    data: product[]
    count: number
    status: string
}