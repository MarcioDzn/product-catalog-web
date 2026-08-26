import type { Product } from "../types/Products";


export async function getProducts(
    search: string = "",
    categoryIds: number[],
    page: number,
    pageSize: number
): Promise<Product[]> {
    const url = 
        "http://localhost:8000/products?title=" + search + 
        "&page=" + page + 
        "&page_size=" + pageSize +
        categoryIds
            .map(categoryId => `&category_ids=${categoryId}`)
            .join("")

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error("Erro ao buscar produtos")
    }

    return response.json()
}