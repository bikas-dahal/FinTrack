import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { getUserByUsername } from "./queries/auth"
import bcrypt from 'bcryptjs'
import { AuthSchema } from "./schema/auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google, 
    Credentials({
      name: "Credentials",
      authorize: async (credentials) => {

        const parsedData = AuthSchema.safeParse(credentials)

        if (!parsedData.success) {
          return null
        }

        const {username, password} = parsedData.data

          console.log(credentials)
          const user = await getUserByUsername(username as string)

          if (!user) {
            return null
          }

          const passwordMatch = await bcrypt.compare(password as string, user.password);

          if (passwordMatch) {
            return user
          } else {
            return null
          }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user}) => {
      if (user) {
        token.id = user.id
        token.username = user.username
      }
      return token
    },
    session: async ({ session, token}) => {
      console.log(token)
      console.log(session)
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.username = token.username || ''
      }
      return session
    },
  }
})