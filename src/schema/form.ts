import { z } from "zod"

export const portfolioFormSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(255),
    description: z.string().min(3, { message: 'Description must be at least 3 characters long' }).max(255),
})

export type PortfolioFormType = z.infer<typeof portfolioFormSchema>

export const categoryFormSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(255),
    description: z.string().min(3, { message: 'Description must be at least 3 characters long' }).max(255),
})

export type CategoryFormType = z.infer<typeof categoryFormSchema>


export const transactionFormSchema = z.object({
    amount: z.string().or(z.number()),
    date: z.coerce.date(),
    categoryId: z.string(),
    payee: z.string(),
    notes: z.string().optional(),
    portfolioId: z.string()
})

export type TransactionFormType = z.infer<typeof transactionFormSchema>