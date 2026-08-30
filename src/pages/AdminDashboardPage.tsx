import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";
import ProductCardAdminList from "../components/ProductCardAdminList";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categories";
import Accordion from "../components/accordion/Accordion";
import Slider from '@mui/material/Slider';
import RangeSlider from "../components/slider/FieldRangeSlider";
import FieldRangeSlider from "../components/slider/FieldRangeSlider";
import { formatCurrency } from "../utils/money";

function pricetext(price: number) {
  return `R$${price}`;
}

function stocktext(price: number) {
  return `${price}`;
}

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

const MIN_STOCK = 0;
const MAX_STOCK = 200;

export default function AdminDashboardPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") ?? "";
    const categoryIds = searchParams.getAll("category_id");
    const page = Number(searchParams.get("page")) || 1;

    const minPrice = Number(searchParams.get("min_price")) || MIN_PRICE;
    const maxPrice = Number(searchParams.get("max_price")) || MAX_PRICE;
    const [priceFilter, setPriceFilter] = useState<number[]>([    
        Math.min(minPrice, maxPrice),
        Math.max(minPrice, maxPrice)
    ])

    const stock = {
        minStock: Number(searchParams.get("min_stock")) || MIN_STOCK,
        maxStock: Number(searchParams.get("max_stock")) || MAX_STOCK
    }
    const [stockFilter, setStockFilter] = useState<number[]>([    
        Math.min(stock.minStock, stock.maxStock),
        Math.max(stock.minStock, stock.maxStock)
    ])

    const [isCategoryAccordionOpen, setIsCategoryAccordionOpen] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
                const params = new URLSearchParams(searchParams);

                params.set("min_price", String(priceFilter[0]));
                params.set("max_price", String(priceFilter[1]));

                setSearchParams(params);
        }, 1000);

        return () => clearTimeout(timer);
    }, [priceFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
                const params = new URLSearchParams(searchParams);

                params.set("min_stock", String(stockFilter[0]));
                params.set("max_stock", String(stockFilter[1]));

                setSearchParams(params);
        }, 1000);

        return () => clearTimeout(timer);
    }, [stockFilter]);

    const handlePageChange = (page: number) => {
        setSearchParams((current) => {
            current.set("page", String(page));
            return current;
        });
    };
    

    const handlePriceFilter = (e: Event, newPrice: number[]) => {
        setPriceFilter(newPrice);
    }

    const handleStockFilter = (e: Event, newStock: number[]) => {
        setStockFilter(newStock);
    }

    const {
        data: products = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products", search, page, categoryIds, minPrice, maxPrice, stock],
        queryFn: () => 
            getProducts(
                search, 
                categoryIds.map(categoryId => Number(categoryId)), 
                minPrice,
                maxPrice,
                stock,
                page, 
                6
            ),
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
            <div className="flex flex-col">
                <div className="w-full flex justify-end mb-4">
                    <Button
                        type="button"
                        text="Adicionar produto"
                        onClick={() => console.log("Criar novo produto")}
                    />
                </div>

                <div className="flex flex-row gap-4">
                    <div className="max-w-48 w-full">
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

                    <div className="flex flex-col">
                        <FieldRangeSlider 
                            title="Preço"
                            value={priceFilter}
                            min={MIN_PRICE}
                            max={MAX_PRICE}
                            valuetext={pricetext}
                            onChange={handlePriceFilter}
                        />
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-sm">
                                {`${formatCurrency(priceFilter[0])}`}
                            </span>
                            <span className="text-sm">
                                {`${formatCurrency(priceFilter[1])}`}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <FieldRangeSlider 
                            title="Estoque"
                            value={stockFilter}
                            min={MIN_STOCK}
                            max={MAX_STOCK}
                            valuetext={stocktext}
                            onChange={handleStockFilter}
                        />
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-sm">
                                {`${stockFilter[0]}`}
                            </span>
                            <span className="text-sm">
                                {`${stockFilter[1]}`}
                            </span>
                        </div>
                    </div>

                    </div>

                    <ProductCardAdminList 
                        products={products}
                        maxProductsPerPage={6}
                        currentPage={page}
                        currentCategory={Number(categoryIds[0])}
                        categories={categories}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            
            
        </main>
    )
}