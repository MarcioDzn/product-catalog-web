import type { Category } from "../types/Products";


export async function getCategories(
    search: string = "",
): Promise<Category[]> {
    const url = 
        "http://localhost:8000/categories?name=" + search;

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error("Erro ao buscar categorias")
    }

    return response.json()
}