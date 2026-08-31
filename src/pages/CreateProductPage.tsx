import { useEffect, useState, type ChangeEvent } from "react";
import FieldInput from "../components/FieldInput";
import FieldRichTextEditor from "../components/richText/FieldRichTextEditor";
import FieldImagePicker from "../components/imagePicker/FieldImagePicker";
import FieldSelect from "../components/select/FieldSelect";
import Button from "../components/Button";
import type { ProductCreate } from "../types/Products";
import { getCategories } from "../services/categories";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct } from "../services/products";
import { productSchema } from "../schemas/productSchema";
import type z from "zod";
import { useNavigate } from "react-router-dom";

const MAX_IMAGES = 25

export default function CreateProductPage() {
    const [productTitle, setProductTitle] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productStock, setProductStock] = useState("1")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("active");
    const [images, setImages] = useState<string[]>([])

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const navigate = useNavigate();

    function handleSetImages(newImages: string[]) {
        const selectedImages = newImages.slice(0, MAX_IMAGES - images.length)
        console.log(selectedImages.length)

        setImages(prev => [...prev, ...selectedImages])
    }

    function handleRemoveImage(index: number) {
        setImages(images.filter((_, i) => i != index))
    }

    const {
        data: categories = [],
        isLoading: isLoadingCategory,
        isError: isErrorCategory,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    const createProductMutation = useMutation({
        mutationFn: createProduct,
        onError: (error) => {
            console.error("Erro ao criar produto:", error)
        },
    })

    function getFieldErrors(error: z.ZodError): Record<string, string> {
        const errors: Record<string, string> = {}
        for (const issue of error.issues) {
            const key = issue.path[0]
            if (typeof key === "string" && !errors[key]) {
                errors[key] = issue.message
            }
        }
        return errors
    }

    async function handleCreateProduct(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const validation = productSchema.safeParse({
            title: productTitle,
            description,
            price: productPrice,
            stock: productStock,
            category_id: category,
            status,
            images,
        })

        if (!validation.success) {
            setFieldErrors(getFieldErrors(validation.error))
            console.log(validation)
            return
        }

        setFieldErrors({})

        const data = validation.data

        const newProduct: ProductCreate = {
            category_id: Number(data.category_id),
            title: data.title,
            description: data.description ?? "",
            price: data.price,
            is_visible: data.status === "active",
            stock: data.stock,
            images: data.images.map((image, index) => ({
                url: image,
                product_id: 0,
                is_cover: index === 0,
            })),
        }

        createProductMutation.mutate(newProduct)
    }

    useEffect(() => {
        if (categories.length > 0 && !category) {
            setCategory(String(categories[0].id));
        }
    }, [categories, category]);

    return (
        <main>
            <form onSubmit={handleCreateProduct}>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center w-full gap-4">
                        <Button 
                            className="border border-gray-400 p-1 rounded-md cursor-pointer text-black bg-white hover:bg-gray-100"
                            onClick={() => navigate(-1)}
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
                                    strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" 
                                />
                            </svg> 
                        </Button>
                        <div className="w-full">
                            <h1 className="text-2xl font-bold text-gray-900">Adicionar novo produto</h1>
                            {/* <p className="text-sm text-gray-500 mt-1">Preencha as informações para cadastrar um produto na loja.</p> */}
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-end">
                        <Button
                            type="submit"
                            onClick={() => console.log("Criar novo produto")}
                        >
                            {
                                createProductMutation.isPending ? 
                                <span className="flex items-center justify-center gap-2">
                                    <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                </span>
                                :
                                <>Adicionar produto</>

                            }
                        </Button>


                    </div>
                </div>

                <main className="w-full py-2 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex flex-col gap-4 flex-2">
                        <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
                            <FieldInput 
                                id="product-title"
                                label="Nome do produto"
                                placeholder="Exemplo: Camiseta 100% algodão"
                                value={productTitle}
                                onChange={setProductTitle}
                                error={fieldErrors.title}
                            />

                            <FieldRichTextEditor
                                id="description"
                                label="Descrição" 
                                value={description}
                                onChange={setDescription}
                            />
                        </div>


                        <div className="flex flex-row justify-between gap-4 border border-gray-200 rounded-lg p-4">
                            <div className="w-full">
                                <FieldInput 
                                    id="product-price"
                                    label="Preço"
                                    mode="currency"
                                    placeholder="R$ 10,00"
                                    value={productPrice}
                                    onChange={setProductPrice}
                                    error={fieldErrors.price}
                                />
                            </div>

                            <div className="w-full">
                                <FieldInput 
                                    id="product-stock"
                                    label="Quantidade em estoque"
                                    placeholder="Insira a quantidade em estoque"
                                    mode="integer"
                                    value={productStock}
                                    onChange={setProductStock}
                                    error={fieldErrors.stock}
                                />
                            </div>
                        </div>

                    </div>
                    

                    <div className="w-full h-fit flex flex-col flex-1 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <FieldSelect 
                                    id="product-status"
                                    label="Status"
                                    value={status}
                                    options={[
                                        {
                                            value: "active",
                                            text: "Ativo"
                                        },
                                        {
                                            value: "inactive",
                                            text: "Inativo"
                                        },
                                    ]}
                                    onChange={(
                                        e: ChangeEvent<HTMLSelectElement>, 
                                        status: string
                                    ) => setStatus(status)}
                            />
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <FieldSelect 
                                    id="product-category"
                                    label="Categoria"
                                    value={category}
                                    options={categories.map((category) => ({
                                        value:  String(category.id),
                                        text: category.name
                                    }))}
                                    onChange={(
                                        e: ChangeEvent<HTMLSelectElement>, 
                                        category: string
                                    ) => setCategory(category)}
                            />
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <FieldImagePicker
                                id="images"
                                label="Imagens"
                                images={images}
                                isDisabled={images.length === MAX_IMAGES}
                                error={fieldErrors.images}
                                handleRemoveImage={handleRemoveImage}
                                handleAddImages={handleSetImages}
                            />
                        </div>
                    </div>
                </main>
            </form>
        </main>
    )
}