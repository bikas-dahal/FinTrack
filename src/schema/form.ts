import { z } from "zod"

export const portfolioFormSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(255),
    description: z.string().min(3, { message: 'Description must be at least 3 characters long' }).max(255),
})

export type PortfolioFormType = z.infer<typeof portfolioFormSchema>