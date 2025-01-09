import { z } from 'zod'

export const AuthSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters long' }).max(255),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).max(255),
})

export type AuthType = z.infer<typeof AuthSchema>





