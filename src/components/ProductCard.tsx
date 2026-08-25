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
            <div className="group flex flex-col cursor-pointer">
                <h1 className="font-semibold text-lg leading-tight transition-colors duration-300 ease-in-out group-hover:text-gray-500">{title}</h1>
                <span className="font-light text-sm text-gray-500 leading-relaxed line-clamp-2 group-hover:text-gray-500">{description}</span>
                <span className="mt-2 font-bold text-xl">{formatCurrency(price)}</span>
            </div>
        </div>
    )
}