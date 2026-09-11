import ProductCardList from "../components/ProductCardList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Product } from "../types/Products";
import Accordion from "../components/accordion/Accordion";
import Divider from "../components/Divider";
import FieldRangeSlider from "../components/slider/FieldRangeSlider";
import AccordionSelectionItem from "../components/accordion/AccordionSelectionItem";
import { getCategories } from "../services/categories";
import { formatCurrency, maskCurrencyInput, parseCurrency } from "../utils/money";
import Select from "../components/select/Select";

function pricetext(price: number) {
  return `R$${price}`;
}

const MIN_PRICE = 0;
const MAX_PRICE = 500;

const ITEMS_PER_PAGE = 6

export default function ProductListPage() {
    const [searchParams, setSearchParams] = useSearchParams();

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

    const [isCategoryAccordionOpen, setIsCategoryAccordionOpen] = useState(true)
    const [isPriceAccordionOpen, setIsPriceAccordionOpen] = useState(true)

    const navigate = useNavigate();

    const handleProductClick = (id: number) => {
        navigate("/products/" + id)
    }

    const applyPriceFilter = () => {
        setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            params.set("min_price", String(priceFilter[0]));
            params.set("max_price", String(priceFilter[1]));

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

    const {
        data: categories = [],
        isLoading: isLoadingCategory,
        isError: isErrorCategory,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });



    const {
        data: products,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products", search, page, categoryIds, price, currentSortFilter],
        queryFn: () => getProducts(
            search, 
            categoryIds.map(categoryId => Number(categoryId)), 
            price,
            {
                minStock: 0,
                maxStock: 1000000
            },
            currentSortFilter,
            page, 
            ITEMS_PER_PAGE
        ),
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

    if (isLoading) {
        return <p>Carregando produtos...</p>;
    }

    if (isError) {
        return <p>Erro ao carregar produtos.</p>;
    }

    return (
        <main className="py-8">
            <div className="flex justify-between ">

                <div>
                    <h2 className="text-4xl font-bold mb-4">Produtos</h2>
                    <span className="block text-left text-md pb-8">
                        {
                            <>
                                Resultados para: "<strong>{search}</strong>"
                            </>
                        }
                    </span>
                </div>

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
                </div>

                <div className="flex-1 min-w-0">
                    <ProductCardList 
                        products={products ? products?.products : [] as Product[]}
                        currentPage={page}
                        pageQuantity={products ? products?.total_pages : 0}
                        onPageChange={handlePageChange}
                        onProductClick={handleProductClick}
                    />
                </div>

            </div>

        </main>

    )
    
}