import { mockProducts } from "../mocks/products";
import type { Product } from "../types/Products";

export async function getProducts(
    search: string = ""
): Promise<Product[]> {
    // Simula o tempo de uma API
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!search) {
        return mockProducts;
    }

    return mockProducts.filter((product) =>
        product.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );
}