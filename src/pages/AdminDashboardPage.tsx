import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts } from "../services/products";
import ProductCardAdminList from "../components/ProductCardAdminList";
import Button from "../components/Button";
import { useEffect, useState, type ChangeEvent } from "react";
import { getCategories } from "../services/categories";
import Accordion from "../components/accordion/Accordion";
import FieldRangeSlider from "../components/slider/FieldRangeSlider";
import { formatCurrency, maskCurrencyInput, parseCurrency } from "../utils/money";
import Select from "../components/select/Select";
import type { Product } from "../types/Products";
import Divider from "../components/Divider";
import AccordionSelectionItem from "../components/accordion/AccordionSelectionItem";

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

const ITEMS_PER_PAGE = 6

export default function AdminDashboardPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient(); 

    const search = searchParams.get("search") ?? "";
    const categoryIds = searchParams.getAll("category_id");
    const page = Number(searchParams.get("page")) || 1;
    const currentSortFilter = searchParams.get("sort") ?? "default";

    const price = {
        minPrice: Number(searchParams.get("min_price")) || MIN_PRICE,
        maxPrice: Number(searchParams.get("max_price")) || MAX_PRICE
    }
    const [priceFilter, setPriceFilter] = useState<number[]>([    
        Math.min(price.minPrice, price.maxPrice),
        Math.max(price.minPrice, price.maxPrice)
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
    const [isPriceAccordionOpen, setIsPriceAccordionOpen] = useState(true)
    const [isStockAccordionOpen, setIsStockAccordionOpen] = useState(true)

    const navigate = useNavigate();

    const applyPriceFilter = () => {
        setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            params.set("min_price", String(priceFilter[0]));
            params.set("max_price", String(priceFilter[1]));

            setSearchParams(params);
        }, 1000);
    };

    const applyStockFilter = () => {
        setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            params.set("min_stock", String(stockFilter[0]));
            params.set("max_stock", String(stockFilter[1]));

            setSearchParams(params);
        }, 1000);
    };

    const handlePageChange = (page: number) => {
        setSearchParams((current) => {
            current.set("page", String(page));
            return current;
        });
    };



    const handleSortChange = (
        e: ChangeEvent<HTMLSelectElement>,
        value: string
    ) => {
        const params = new URLSearchParams(searchParams);

        params.set("sort", value);
        params.set("page", "1");

        setSearchParams(params);
    };
    

    const handlePriceFilter = (e: Event, newPrice: number[]) => {
        setPriceFilter(newPrice);
    }

    const handleStockFilter = (e: Event, newStock: number[]) => {
        setStockFilter(newStock);
    }


    const {
        data: products,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products", search, page, categoryIds, price, stock, currentSortFilter],
        queryFn: () => 
            getProducts(
                search, 
                categoryIds.map(categoryId => Number(categoryId)), 
                price,
                stock,
                currentSortFilter,
                page, 
                ITEMS_PER_PAGE
            ),
    });

    const {
        data: categories = [],
        isLoading: isLoadingCategory,
        isError: isErrorCategory,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    useEffect(() => {
        if (!products) return;

        if (page > products.total_pages && products.total_pages > 0) {
            setSearchParams((current) => {
                current.set("page", String(products.total_pages));
                return current;
            });
        }
    }, [products, page, setSearchParams]);

    const deleteProductMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            console.error("Erro ao remover produto:", error)
        },
    })

    if (isLoading) {
        return <p>Carregando produtos...</p>;
    }

    if (isError) {
        return <p>Erro ao carregar produtos.</p>;
    }



    const handleProductDeleteClick = (product_id: number) => {
        deleteProductMutation.mutate(product_id)
    };

    const handleProductUpdateClick = (product_id: number) => {
        navigate(String(product_id))
    };

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
        <main>     
            <div className="flex flex-col">
                <div>
                    <h2 className="font-bold text-4xl">
                        Produtos
                    </h2>
                    <p>
                        {products?.total_items} produtos encontrados.
                    </p>
                </div>

                <div className="w-full flex justify-end items-center mb-4">
                    <div className="flex gap-2 items-center justify-end">
                        <div className="flex justify-between items-center gap-2">
                            <span className="whitespace-nowrap">Ordenar por</span>
                            <Select
                                className="h-12"
                                value={currentSortFilter}  
                                options={[
                                    {
                                        value: "default",
                                        text: "Mais relevantes"  
                                    },
                                    {
                                        value: "price_desc",
                                        text: "Maior Preço"  
                                    },
                                    {
                                        value: "price_asc",
                                        text: "Menor Preço"  
                                    },
                                    {
                                        value: "stock_asc",
                                        text: "Menor Estoque"  
                                    },
                                    {
                                        value: "stock_desc",
                                        text: "Maior Estoque"  
                                    },
                                    {
                                        value: "newest",
                                        text: "Mais recentes"  
                                    },
                                    {
                                        value: "oldest",
                                        text: "Mais antigos"  
                                    }
                                ]}
                                onChange={handleSortChange}
                            />
                        </div>

                        <Button
                            type="button"
                            text="Adicionar produto"
                            onClick={() => navigate("/admin/products/new")}
                            className="h-12"
                        />
                    </div>

                </div>

                <div className="flex flex-row gap-8">
                    <div className="flex flex-col gap-4 max-w-64 w-ful">
                        <Accordion
                            title="Categorias"
                            isOpen={isCategoryAccordionOpen}
                            setIsOpen={setIsCategoryAccordionOpen}
                        >
                            {
                                categories.map((category) => ({
                                    id: category.id,
                                    text: category.name
                                }))
                                .map((item) => (
                                    <AccordionSelectionItem 
                                        key={item.id}
                                        id={item.id}
                                        value={item.text}
                                        checked={categoryIds.map((categoryId) => Number(categoryId)).includes(item.id)}
                                        onChange={handleCategorySelect}
                                    />
                                ))
                            }
                        </Accordion>

                        <Divider />

                        <Accordion
                            title="Preço"
                            isOpen={isPriceAccordionOpen}
                            setIsOpen={setIsPriceAccordionOpen}
                        >
                            <FieldRangeSlider 
                                value={priceFilter}
                                min={MIN_PRICE}
                                max={MAX_PRICE}
                                valuetext={pricetext}
                                onChange={handlePriceFilter}
                                onApply={applyPriceFilter}
                                valueFormatter={formatCurrency}
                                valueParser={parseCurrency} 
                                maskInput={maskCurrencyInput}
                            />
                        </Accordion>

                        <Divider />

                        <Accordion
                            title="Estoque"
                            isOpen={isStockAccordionOpen}
                            setIsOpen={setIsStockAccordionOpen}
                        >
                            <FieldRangeSlider 
                                value={stockFilter}
                                min={MIN_STOCK}
                                max={MAX_STOCK}
                                valuetext={stocktext}
                                onChange={handleStockFilter}
                                onApply={applyStockFilter}
                            />
                        </Accordion>
                    </div>

                    <ProductCardAdminList 
                        products={products ? products?.products : [] as Product[]}
                        maxProductsPerPage={ITEMS_PER_PAGE}
                        currentPage={page}
                        pageQuantity={products ? products?.total_pages : 0}
                        onPageChange={handlePageChange}
                        onDeleteClick={handleProductDeleteClick}
                        onUpdateClick={handleProductUpdateClick}
                    />
                </div>
            </div>
            
            
        </main>
    )
}