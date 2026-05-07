export interface product{
            sold: number,
            images: string[],
            subcategory: subcategory,
            ratingsQuantity: number,
            _id: string,
            title: string,
            slug: string,
            description: string,
            quantity: number,
            price: number,
            priceAfterDiscount: number,
            imageCover: string,
            ratingsAverage: number,
            createdAt: string,
            updatedAt: string,
            id: string
            category:category
            brand:brand
            reviews:review[]
}

export interface category{
    _id: string,
    name: string,
    slug: string,
    image: string
}

export interface brand{
    _id: string,
    name: string,
    slug: string,
    image: string
}


export interface review{
    _id: string,
    review: string,
    rating: number,
    product: string,
    user: user,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface user {
        _id: string,
        name: string 
}


export interface subcategory
{
    _id: string,
    name: string,
    slug: string,
    category: string
}
