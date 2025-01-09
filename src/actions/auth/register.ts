'use server'

import { prisma } from "@/lib/prisma"
import { AuthSchema, AuthType } from "@/schema/auth"
import { hash } from 'bcryptjs'

export const registerUser = async (data: AuthType) => {
    const parsedData = AuthSchema.safeParse(data)

    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message)
    }

    const {username, password} = parsedData.data

    const hashedPassword = await hash(password, 10)

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        return {
            data: user
        }
    } catch (error) {
        throw new Error('Username already exists' as string)
    }


}