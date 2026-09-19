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
    const [optionOpened, setOptionOpened] = useState(false);
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

    const isSelected = selectedProducts.has(id);

    return (
        <div
            className={`group relative flex w-full flex-col justify-between gap-4 rounded-xl border bg-white p-4 transition-all duration-200 ${
                isSelected ? "border-gray-400 bg-gray-50/50" : "border-gray-200 hover:border-gray-300"
            }`}
        >
            <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                    <div
                        className="flex shrink-0 cursor-pointer items-center justify-center"
                        onClick={() => toggleProduct(id)}
                    >
                        <SelectButton
                            checked={isSelected}
                            onChange={() => toggleProduct(id)}
                        />
                    </div>
                </div>

                <div ref={menuRef} className="relative">
                    <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
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
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 1 1 0-1.5 .75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5 .75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5 .75.75 0 0 1 0 1.5Z"
                            />
                        </svg>
                    </button>

                    {optionOpened && (
                        <div className="absolute right-0 top-0 z-50 min-w-35">
                            <CardOptionsModal
                                options={[
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
                                        onClick: () => {
                                            onUpdateClick(id);
                                            setOptionOpened(false);
                                        },
                                    },
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
                                        onClick: () => {
                                            onDeleteClick(id);
                                            setOptionOpened(false);
                                        },
                                    },
                                ]}
                            />
                        </div>
                    )}
                </div>
            </div>



            <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 md:grid md:grid-cols-6 md:items-center ">
                <div className="flex items-start gap-3 w-full md:col-span-3">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white md:h-16 md:w-16">
                        {image ? (
                            <img
                                src={image.url}
                                alt={title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <span className="text-[10px] font-medium text-gray-400">Sem foto</span>
                        )}
                    </div>

                    <div className="flex flex-1 flex-col min-w-0">
                        <h3 className="truncate text-sm font-bold text-gray-900 md:text-base" title={title}>
                            {title}
                        </h3>
                        <p className="line-clamp-2 text-xs text-gray-500 leading-relaxed" title={description}>
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-gray-200/60 pt-2.5 md:contents md:border-0 md:pt-0">
                    <div className="flex items-center justify-between md:flex-col md:items-start md:gap-0.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            Preço
                        </span>
                        <span className="truncate text-xs font-bold text-gray-900">
                            {formatCurrency(price)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-start md:gap-0.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            Estoque
                        </span>
                        <span className="truncate text-xs font-semibold text-gray-700">
                            {stock} un
                        </span>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-start md:gap-0.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            Criado
                        </span>
                        <span className="truncate text-xs font-medium text-gray-500">
                            Há 10 min
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-700">
                    {category}
                </span>
                <div className="flex gap-2 justify-end items-center">
                    <span className="text-xs font-medium text-gray-600">
                        Exibir na Vitrine
                    </span>

                    <Toggle
                        onChange={(enabled) => {
                            console.log("Visível na loja:", enabled);
                        }}
                    />
                </div>


            </div>
        </div>
    );
}