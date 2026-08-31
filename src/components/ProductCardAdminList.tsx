import { useState } from "react"
import type { Category, Product } from "../types/Products"
import Select from "./select/Select"
import ProductCardAdmin from "./ProductCardAdmin"
import SelectButton from "./SelectButton"
import Pagination from "./pagination/Pagination"
import SearchInput from "./SearchInput"
import { useNavigate } from "react-router-dom"

type Props = {
    products: Product[]
    maxProductsPerPage: number
    currentPage: number
    onPageChange: (page: number) => void
}

export default function ProductCardAdminList({ 
    products, 
    maxProductsPerPage, 
    currentPage,
    onPageChange 
}: Props) {
    const [sort, setSort] = useState(1);
    const [search, setSearch] = useState("")

    const navigate = useNavigate();

    const handleSearch = (
        e: React.SubmitEvent<HTMLFormElement>, 
        search: string
    ) => {
        e.preventDefault();

        const params = new URLSearchParams(location.search);

        if (search) {
            params.set('search', search);
        } else {
            params.delete('search'); 
        }

        navigate(`/admin/products?${params.toString()}`);
    }

    const [selectedProducts, setSelectedProducts] = useState<Set<number>>(
        new Set()
    );
    
    function toggleAllProducts() {
        setSelectedProducts((current) => {
            const allSelected = visiblePageProducts.every((product) =>
                current.has(product.id)
            );

            if (allSelected) {
                return new Set();
            }

            return new Set(visiblePageProducts.map((product) => product.id));
        });
    }

    function toggleProduct(id: number) {
        setSelectedProducts((current) => {
            const next = new Set(current);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    }

    const visiblePageProducts = products.slice(0, maxProductsPerPage);

    const allSelected =
        visiblePageProducts.length > 0 &&
        visiblePageProducts.every((product) => selectedProducts.has(product.id));

    const someSelected =
        visiblePageProducts.some((product) => selectedProducts.has(product.id));

    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {/* Toolbar */}
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                    <div className="flex items-center gap-3 py-2">

                        <SelectButton
                            checked={allSelected}
                            indeterminate={someSelected && !allSelected}
                            onChange={toggleAllProducts}
                        />

                        <span className="text-sm font-medium text-gray-500">
                            {selectedProducts.size > 0
                                ? `${selectedProducts.size} selecionados`
                                : "Selecionar todos"}
                        </span>
                    </div>

                    <div className="flex flex-row gap-2">
                        <SearchInput 
                            value={search} 
                            placeholder="Buscar produtos..." 
                            onChange={setSearch} 
                            handleSearch={handleSearch}/>


                        {/* <Select
                            value={sort}
                            options={[
                                {
                                    value: 1,
                                    text: "Mais recentes"
                                },
                                {
                                    value: 2,
                                    text: "Maior preço"
                                },
                                {
                                    value: 3,
                                    text: "Menor Preço"
                                },

                            ]}
                            onChange={setSort}
                        /> */}

                    </div>

                </div>

                {/* Produtos */}
                {products.length === 0 ? (
                    <div className="flex h-40 items-center justify-center text-sm text-gray-400">
                        Nenhum produto encontrado.
                    </div>
                ) : (
                    <div className="flex flex-col divide-y divide-gray-100">
                        {visiblePageProducts.map((product) => (
                            <ProductCardAdmin
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                                stock={product.stock}
                                category={product.category.name}
                                image={product.images.find((image) => image.is_cover)}
                                selectedProducts={selectedProducts}
                                toggleProduct={toggleProduct}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Paginação */}
            <div className="mt-4 flex w-full justify-center">
                <Pagination
                    pageQuantity={10}
                    maxVisiblePages={5}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    )
}