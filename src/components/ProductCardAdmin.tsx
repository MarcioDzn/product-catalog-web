import { useEffect, useRef, useState } from "react";
import type { ProductImage } from "../types/Products";
import { formatCurrency } from "../utils/money";
import { CardOptionsModal } from "./CardOptionsModal";
import SelectButton from "./SelectButton";
import Toggle from "./Toggle";

type Props = {
    id: number;
    image: ProductImage | undefined;
    title: string;
    description: string;
    price: number;
    selectedProducts: Set<number>;
    category: string;
    stock: number;
    toggleProduct: (id: number) => void;
    onDeleteClick: (id: number) => void;
    onUpdateClick: (id: number) => void;
};

export default function ProductCardAdmin({
    id,
    image,
    title,
    description,
    price,
    selectedProducts,
    category,
    stock,
    toggleProduct,
    onDeleteClick,
    onUpdateClick
}: Props) {
    const [optionOpened, setOptionOpened] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOptionOpened(false);
            }
        }

        if (optionOpened) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [optionOpened]);

    return (
        <div 
            className="flex h-fit w-full flex-row items-center gap-4 border-b border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 cursor-pointer"
        >
            
            {/* Checkbox */}
            <div 
                className="flex shrink-0 cursor-pointer items-center justify-center"
                onClick={() => toggleProduct(id)}
            >
                <SelectButton
                    checked={selectedProducts.has(id)}
                    onChange={() => toggleProduct(id)}
                />
            </div>

            {/* Imagem (Menor e com borda sutil) */}
            <div className="group relative flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                {
                    image && 
                    <img
                        src={image.url}
                        alt="Imagem do Produto"
                        className="h-full w-full object-cover"
                    />
                }
                

            </div>

            {/* Container Principal de Informações (flex-1 para esticar e justify-between para espaçar) */}
            <div className="flex flex-1 items-center justify-between gap-6">
                
                {/* Título e Descrição */}
                <div className="flex w-28 min-w-0 shrink-0 cursor-pointer flex-col gap-0.5">
                    <h1 className="truncate text-sm font-semibold text-gray-900">
                        {title}
                    </h1>
                    <span className="truncate text-xs font-medium text-gray-500">
                        {description}
                    </span>
                </div>

                {/* Categoria */}
                <div className="flex w-24 shrink-0 flex-col gap-1">
                    <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Categoria
                    </h2>
                    <span className="block text-sm font-medium text-gray-700">
                        {category}
                    </span>
                </div>

                {/* Preço */}
                <div className="flex w-28 shrink-0 flex-col gap-1">
                    <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Preço
                    </h2>
                    <span className="block text-sm font-semibold text-gray-900">
                        {formatCurrency(price)}
                    </span>
                </div>
                
                {/* Visibilidade */}
                <div className="flex w-24 shrink-0 flex-col gap-1 justify-center">
                    <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Na Vitrine
                    </h2>
                    <Toggle
                        onChange={(enabled) => {
                            console.log("Visível na loja:", enabled);
                            //TODO: atualizar back-end
                        }}
                    />
                </div>

                <div className="flex w-32 shrink-0 flex-col gap-1">
                    <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Quantidade
                    </h2>
                    <span className="block text-sm font-medium text-gray-700">
                        {stock}
                    </span>
                </div>

                {/* Criado em */}
                <div className="flex w-32 shrink-0 flex-col gap-1">
                    <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Criado em
                    </h2>
                    <span className="block text-sm font-medium text-gray-700">
                        Há 10 min
                    </span>
                </div>
            </div>

            {/* Três Pontinhos (Ações) */}
            <div ref={menuRef} className="relative flex shrink-0 items-center justify-center pl-2">
                <button 
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 focus:outline-none cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOptionOpened((prev) => !prev);
                    }}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="size-6"
                    >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
                    />
                    </svg>
                </button>
                
                {
                    optionOpened && 
                    <div className="absolute top-0 right-32">
                        <CardOptionsModal 
                            options={[
                                {
                                    name: "Remover",
                                    icon: (
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth={1.5} 
                                            stroke="currentColor" 
                                            className="size-4"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" 
                                            />
                                        </svg>
                                    ),
                                    onClick: () => onDeleteClick(id),
                                },
                                {
                                    name: "Editar",
                                    icon: (
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth={1.5} 
                                            stroke="currentColor" 
                                            className="size-4"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" 
                                            />
                                        </svg>
                                    ),
                                    onClick: () => onUpdateClick(id),
                                },
                            ]}
                        />
                    </div>
                }
            </div>
        </div>
    );
}