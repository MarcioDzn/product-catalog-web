import { z } from "zod";

export const productSchema = z.object({
    title: z
        .string()
        .min(1, "O nome do produto é obrigatório")
        .min(3, "O nome deve ter no mínimo 3 caracteres"),
    description: z
        .string(),
    price: z
        .preprocess(
            (val) => (val === "" ? undefined : val),
            z.coerce
                .number({ message: "O preço é obrigatório" })
                .positive("O preço deve ser maior que zero")
        ),
    stock: z
        .preprocess(
            (val) => (val === "" ? undefined : val),
            z.coerce
                .number({ message: "A quantidade em estoque é obrigatória" })
                .int("O estoque deve ser um número inteiro")
                .min(0, "O estoque não pode ser negativo")
        ),
    category_id: z
        .coerce.number()
        .min(1, "Selecione uma categoria válida"),
    status: z
        .string()
        .min(1, "Selecione um status"),
    images: z.array(
        z.object({
            id: z.number(),
            url: z.string(),
            is_cover: z.boolean(),
        }))
        .min(1, "Adicione pelo menos 1 imagem do produto"),
});

export type ProductSchemaInput = z.infer<typeof productSchema>;