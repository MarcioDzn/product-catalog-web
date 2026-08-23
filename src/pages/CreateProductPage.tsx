import { useState } from "react";
import FieldInput from "../components/FieldInput";
import FieldRichTextEditor from "../components/richText/FieldRichTextEditor";
import FieldImagePicker from "../components/imagePicker/FieldImagePicker";
import FieldSelect from "../components/select/FieldSelect";
import Button from "../components/Button";

export default function CreateProductPage() {
    const [productTitle, setProductTitle] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productStock, setProductStock] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [images, setImages] = useState<string[]>([])

    const MAX_IMAGES = 25

    function handleSetImages(newImages: string[]) {
        const selectedImages = newImages.slice(0, MAX_IMAGES - images.length)
        console.log(selectedImages.length)

        setImages(prev => [...prev, ...selectedImages])
    }

    function handleRemoveImage(index: number) {
        setImages(images.filter((_, i) => i != index))
    }

    return (
        <main>
            <div className="flex justify-between items-center mb-4">
                <div className="w-full">
                    <h1 className="text-2xl font-bold text-gray-900">Adicionar novo produto</h1>
                    <p className="text-sm text-gray-500 mt-1">Preencha as informações para cadastrar um produto na loja.</p>
                </div>
                <div className="w-full flex items-center justify-end">
                    <Button
                        type="button"
                        text="Adicionar produto"
                        onClick={() => console.log("Criar novo produto")}
                    />
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
                                placeholder="R$ 10,00"
                                value={productPrice}
                                onChange={setProductPrice}
                            />
                        </div>

                        <div className="w-full">
                            <FieldInput 
                                id="product-stock"
                                label="Quantidade em estoque"
                                placeholder="Insira a quantidade em estoque"
                                value={productStock}
                                onChange={setProductStock}
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
                                onChange={setStatus}
                        />
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <FieldSelect 
                                id="product-category"
                                label="Categoria"
                                value={category}
                                options={[
                                    {
                                        value: "mesa",
                                        text: "Mesa"
                                    },
                                    {
                                        value: "roupa",
                                        text: "Roupa"
                                    },
                                    {
                                        value: "eletrodomestico",
                                        text: "Eletrodoméstico"
                                    },
                                ]}
                                onChange={setCategory}
                        />
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <FieldImagePicker
                            id="images"
                            label="Imagens"
                            images={images}
                            isDisabled={images.length === MAX_IMAGES}
                            handleRemoveImage={handleRemoveImage}
                            handleAddImages={handleSetImages}
                        />
                    </div>
                </div>
            </main>
        </main>
    )
}