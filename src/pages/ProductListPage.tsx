import ProductCardList from "../components/ProductCardList";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";
import { useState } from "react";

export default function ProductListPage() {
    const [searchParams] = useSearchParams();

    const search = searchParams.get("search") ?? "";

    const [categoryIds, setCategoryIds] = useState<number[]>([])


    const {
        data: products = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products", search],
        queryFn: () => getProducts(search, categoryIds, 1, 6),
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
                products={products}
            />
        </main>

    )
    
}