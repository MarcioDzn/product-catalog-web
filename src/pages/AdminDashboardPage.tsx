import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";
import ProductCardAdminList from "../components/ProductCardAdminList";
import Button from "../components/Button";
import { useState } from "react";
import { getCategories } from "../services/categories";

export default function AdminDashboardPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") ?? "";
    const categoryIds = searchParams.getAll("category_id");
    const page = Number(searchParams.get("page")) || 1;

    const handlePageChange = (page: number) => {
        setSearchParams((current) => {
            current.set("page", String(page));
            return current;
        });
    };

    const {
        data: products = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products", search, page, categoryIds],
        queryFn: () => getProducts(search, categoryIds.map(categoryId => Number(categoryId)), page, 6),
    });

    const {
        data: categories = [],
        isLoading: isLoadingCategory,
        isError: isErrorCategory,
    } = useQuery({
        queryKey: ["categories", search],
        queryFn: () => getCategories(search),
    });

    if (isLoading) {
        return <p>Carregando produtos...</p>;
    }

    if (isError) {
        return <p>Erro ao carregar produtos.</p>;
    }


    return (
        <main className="py-8">
            <div className="w-full flex justify-end mb-4">
                <Button
                    type="button"
                    text="Adicionar produto"
                    onClick={() => console.log("Criar novo produto")}
                />
            </div>

            <ProductCardAdminList 
                products={products}
                maxProductsPerPage={6}
                currentPage={page}
                currentCategory={Number(categoryIds[0])}
                categories={categories}
                onPageChange={handlePageChange}
            />
        </main>
    )
}