import { prisma } from "@/lib/prisma";

export const getUserByUsername = async (username: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                username
            }
        })
    } catch (err) {
        console.log(err);
        
        return {
            error: 'Username Already Exists'
        }
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    } catch (err) {
        console.log(err);
        
        return {
            error: 'Email Already Exists'
        }
    }
}