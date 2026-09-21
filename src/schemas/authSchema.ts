import { z } from "zod";

export const authSchema = z.object({
    login: z
        .string()
        .min(1, "O login é obrigatório")
        .min(3, "O nome deve ter no mínimo 3 caracteres"),
    password: z
        .string()
        .min(1, "A senha é obrigatória")
});

export type authSchemaInput = z.infer<typeof authSchema>;