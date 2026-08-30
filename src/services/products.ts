import type { Product } from "../types/Products";


export async function getProducts(
    search: string = "",
    categoryIds: number[],
    minPrice: number,
    maxPrice: number,
    stock: {minStock: number, maxStock: number},
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
        "&min_price=" + minPrice +
        "&max_price=" + maxPrice +
        "&min_stock=" + stock.minStock +
        "&max_stock=" + stock.maxStock

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error("Erro ao buscar produtos")
    }

    return response.json()
}