import type { Product } from "../types/Products";
import ProductCard from "./ProductCard";

type Props = {
    products: Product[];
};

export default function ProductCardList({ products }: Props) {
    return (
        <section className="w-full">
            { 
                products.length == 0
                ?
                <div className="flex justify-center items-center w-full h-64">
                    <h2 className="font-bold text-2xl">Nenhum produto encontrado...</h2>
                </div>
                :
                <div className="grid w-full grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {products.map((product) => (
                        <ProductCard 
                            key={product.id}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            image={product.images.find((image) => image.is_cover)}
                        />
                    ))}
                </div>
            }

        </section>
    );
}