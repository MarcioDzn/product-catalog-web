import type { ProductImage } from "../types/Products";
import { formatCurrency } from "../utils/money";

type Props = {
    image: ProductImage | undefined;
    title: string;
    description: string;
    price: number;
}

export default function ProductCard({ image, title, description, price }: Props) {
    return (
        <div className="flex flex-col gap-4 w-full overflow-hidden bg-white pb-4">
            <div className="group relative h-64 w-full overflow-hidden rounded-xl flex justify-center items-center cursor-pointer">

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
            
            {/* O "group" nesta div vai controlar o hover dos elementos filhos */}
            <div className="group flex flex-col cursor-pointer">
                <h1 className="relative w-fit font-semibold text-lg leading-tight">
                    {title}

                    {/* Mudei de "hover:scale-x-100" para "group-hover:scale-x-100" */}
                    <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </h1>
                <span className="font-light text-sm text-gray-500 leading-relaxed line-clamp-2 group-hover:text-gray-500">{description}</span>
                <span className="mt-2 font-bold text-xl">{formatCurrency(price)}</span>
            </div>
        </div>
    )
}