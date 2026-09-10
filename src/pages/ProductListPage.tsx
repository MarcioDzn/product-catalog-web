import ProductCardList from "../components/ProductCardList";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";
import { useState } from "react";
import type { Product } from "../types/Products";

export default function ProductListPage() {
    const [searchParams] = useSearchParams();

    const search = searchParams.get("search") ?? "";

    const [categoryIds, setCategoryIds] = useState<number[]>([])


    const {
        data: products,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products", search],
        queryFn: () => getProducts(
            search, 
            categoryIds.map(categoryId => Number(categoryId)), 
            {
                minPrice: 0,
                maxPrice: 10000
            }, 
            {
                minStock: 0,
                maxStock: 10000
            },
            "default",
            1,
            6 
        ),
    });

    if (isLoading) {
        return <p>Carregando produtos...</p>;
    }

    if (isError) {
        return <p>Erro ao carregar produtos.</p>;
    }

    return (
        <main className="py-8">
            <h2 className="text-4xl font-bold mb-4">Produtos</h2>
            <span className="block text-left text-md pb-8">
                {
                    <>
                        Resultados para: "<strong>{search}</strong>"
                    </>
                }
            </span>

            <ProductCardList 
                products={products ? products?.products : [] as Product[]}
            />
        </main>

    )
    
}