'use server'

import { signIn } from '@/auth'
import { AuthSchema, AuthType } from '@/schema/auth'
import { AuthError } from 'next-auth'

export const login = async () => {
    await signIn('google')

}

export const loginWithCredentials = async (data: AuthType) => {
        try {
            await signIn('credentials', {
                username: data.username,
                password: data.password,
                redirect: false
            })
    
            return {
                success: 'Login successful'
            }
        } catch (error) {
    
            console.log('error', error);
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return {
                            error: 'Invalid credentials'
                        }
                    default:
                        return {
                            error: 'Something went wrong'
                        }
                }
            }
    
            return {
                error: 'Something went wrong'
            }
        }
}