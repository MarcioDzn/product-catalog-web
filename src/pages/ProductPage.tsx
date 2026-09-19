import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/products";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../utils/money";
import { useEffect, useState } from "react";
import Button from "../components/Button";

const MAX_THUMBNAIL = 5;
const MAX_THUMBNAIL_MOBILE = 3;

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const [imageIndex, setImageIndex] = useState(0);
    const [thumbnailStart, setThumbnailStart] = useState(0);
    const [productCounter, setProductCounter] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(Number(id)),
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 639px)");

        const handleChange = () => {
            setIsMobile(mediaQuery.matches);
        };

        handleChange();
        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    const maxThumbnail = isMobile
        ? MAX_THUMBNAIL_MOBILE
        : MAX_THUMBNAIL;

    if (isLoading) return <span>Carregando...</span>;
    if (isError || !product) return <span>Produto não encontrado</span>;

    return (
        <main className="py-8 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
                <div className="md:col-span-7 flex flex-col md:flex-row gap-4 items-start w-full min-w-0">
                    <div className="flex flex-row md:flex-col items-center justify-center my-auto gap-2 shrink-0 w-full md:w-auto">
                        <button
                            onClick={() => setThumbnailStart(thumbnailStart - 1)}
                            className="hidden md:flex items-center justify-center cursor-pointer disabled:opacity-30"
                            disabled={thumbnailStart < 1}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>

                        <button
                            onClick={() => setThumbnailStart(thumbnailStart - 1)}
                            className="md:hidden h-full flex items-center justify-center cursor-pointer disabled:opacity-30"
                            disabled={thumbnailStart < 1}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <div className="flex flex-row md:flex-col gap-2 overflow-hidden">
                            {product.images
                                .slice(thumbnailStart, thumbnailStart + maxThumbnail)
                                .map((img) => {
                                    const index = product.images.findIndex(
                                        (image) => image.id === img.id
                                    );

                                    return (
                                        <div
                                            key={img.id}
                                            onClick={() => setImageIndex(index)}
                                            className={`relative w-16 md:w-20 aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer shrink-0
                                                ${
                                                    index === imageIndex
                                                        ? "border-2 border-black"
                                                        : "opacity-50 hover:opacity-100"
                                                }
                                            `}
                                        >
                                            <img
                                                src={img.url}
                                                alt="Miniatura"
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </div>
                                    );
                                })}
                        </div>

                        <button
                            onClick={() => setThumbnailStart(thumbnailStart + 1)}
                            className="hidden h-6 md:flex items-center justify-center cursor-pointer disabled:opacity-30"
                            disabled={thumbnailStart >= product.images.length - maxThumbnail}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        <button
                            onClick={() => setThumbnailStart(thumbnailStart + 1)}
                            className="md:hidden h-full flex items-center justify-center cursor-pointer disabled:opacity-30"
                            disabled={thumbnailStart >= product.images.length - maxThumbnail}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    <div className="relative w-full flex-1 aspect-3/4 rounded-lg overflow-hidden bg-gray-100 min-w-0">
                        <img
                            src={product.images[imageIndex].url}
                            alt="Imagem principal"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="md:col-span-5 flex flex-col gap-6 w-full min-w-0">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl lg:text-3xl font-bold">{product.title}</h1>
                        <span className="text-xl lg:text-2xl font-bold text-gray-900">
                            {formatCurrency(product.price)}
                        </span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex border-2 justify-between items-center border-black rounded-sm w-full sm:w-32 shrink-0">
                                <button
                                    type="button"
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        if (productCounter > 1) {
                                            setProductCounter(productCounter - 1);
                                        }
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                </button>
                                
                                <span className="font-semibold px-2">{productCounter}</span>

                                <button
                                    type="button"
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        if (productCounter < product.stock) {
                                            setProductCounter(productCounter + 1);
                                        }
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>

                            <Button
                                onClick={() => {}}
                                className="w-full py-3 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors"
                            >
                                Adicionar ao carrinho
                            </Button>
                        </div>

                        <Button
                            onClick={() => {}}
                            className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                            Comprar Agora
                        </Button>
                    </div>

                    <div className="w-full prose prose-sm max-w-none border-t pt-4">
                        <div
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}