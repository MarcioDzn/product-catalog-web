import type { Product } from "../types/Products";


export async function getProducts(
    search: string = "",
    categoryIds: number[],
    price: {minPrice: number, maxPrice: number},
    stock: {minStock: number, maxStock: number},
    sort: string,
    page: number,
    pageSize: number
): Promise<Product[]> {
    const url = 
        "http://localhost:8000/products?title=" + search + 
        "&page=" + page + 
        "&page_size=" + pageSize +
        categoryIds
            .map(categoryId => `&category_ids=${categoryId}`)
            .join("") +
        "&min_price=" + price.minPrice +
        "&max_price=" + price.maxPrice +
        "&min_stock=" + stock.minStock +
        "&max_stock=" + stock.maxStock +
        `${sort === "default" || !sort ? "" :  "&sort=" + sort}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error("Erro ao buscar produtos")
    }

    return response.json()
}