export type ProductImage = {
    id: number
    url: string
    is_cover: boolean
}

export type Category = {
    id: number
    name: string
}

export type Product = {
    id: number
    images: ProductImage[]
    title: string;
    description: string;
    category: Category;
    stock: number;
    price: number;
}