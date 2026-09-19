import type { ReactNode } from "react";
import type { ProductImage } from "../types/Products";
import { formatCurrency } from "../utils/money";

type Props = {
    id: number
    image: ProductImage | undefined;
    title: string;
    description: string;
    price: number;
    onProductClick: (id: number) => void
}

export default function ProductCard({ 
    id,
    image, 
    title, 
    description, 
    price,
    onProductClick
}: Props) {
    return (
        <div 
            onClick={(e) => {
                e.stopPropagation()
                onProductClick(id)
            }}
            className="flex flex-col gap-4 w-full overflow-hidden bg-white pb-4"
        >
            <div className="group aspect-3/4 relative w-full overflow-hidden rounded-xl flex justify-center items-center cursor-pointer">

                {
                    image &&                 
                    <img 
                        src={image.url} 
                        alt="Imagem do Produto" 
                        className="h-full w-auto max-w-none"
                    />
                }

                <div className="absolute inset-0 bg-white/30 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
            </div>
            
            <div className="group flex flex-col cursor-pointer">
                <h1 className="relative w-fit font-semibold text-lg leading-tight">
                    {title}

                    <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </h1>
                <span className="font-light text-sm text-gray-500 leading-relaxed line-clamp-2 group-hover:text-gray-500">{description}</span>
                <span className="mt-2 font-bold text-xl">{formatCurrency(price)}</span>
            </div>
        </div>
    )
}