import type { ProductImage } from "../types/Products";
import { formatCurrency } from "../utils/money";
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
    onClick: (id: number) => void;
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
    onClick
}: Props) {
    return (
        <div 
            className="flex h-fit w-full flex-row items-center gap-4 border-b border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 cursor-pointer"
            onClick={() => onClick(id)}
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
            <div className="flex shrink-0 items-center justify-center pl-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 focus:outline-none">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2} 
                        stroke="currentColor" 
                        className="h-5 w-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                </button>
            </div>

        </div>
    );
}