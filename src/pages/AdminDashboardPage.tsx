import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";
import ProductCardAdminList from "../components/ProductCardAdminList";
import Button from "../components/Button";
import { useState } from "react";
import { getCategories } from "../services/categories";
import Accordion from "../components/accordion/Accordion";

export default function AdminDashboardPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") ?? "";
    const categoryIds = searchParams.getAll("category_id");
    const page = Number(searchParams.get("page")) || 1;


    const [isCategoryAccordionOpen, setIsCategoryAccordionOpen] = useState(false)

    const navigate = useNavigate();

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

    console.log(categoryIds)
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

    const handleCategorySelect = (categoryId: number) => {
        const params = new URLSearchParams(searchParams)

        if (categoryIds.includes(categoryId.toString())) {
            params.delete("category_id")

            categoryIds
                .filter(id => id !== categoryId.toString())
                .forEach(id => params.append("category_id", id))
        } else {
            params.append("category_id", categoryId.toString())
        }

        params.set("page", "1")

        setSearchParams(params)
    }

    return (
        <main className="py-8">
            <Accordion 
                title="Categorias"
                items={categories.map((category) => ({
                    id: category.id,
                    text: category.name
                }))}
                isOpen={isCategoryAccordionOpen}
                setIsOpen={setIsCategoryAccordionOpen}
                selectedItems={categoryIds.map((categoryId) => Number(categoryId))}
                onChange={handleCategorySelect}
            />
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