import { auth } from '@/auth';
import { Context, Hono } from 'hono';
import { jwtDecrypt } from 'jose/jwt/decrypt';  

const app = new Hono();
  

type User = {
  id: string;
  name: string | null;
  email: string | null;
  username: string | null;
  image: string | null;
};

// Define the custom Env type
type CustomEnv = {
  Variables: {
    sessionData: User | null;
  };
};

export const sessionMiddleware = async (c: Context<CustomEnv>, next: () => Promise<void>) => {
  
  try {
    const session = await auth();

    const payload: User | null = session?.user ? {
      id: session.user.id || '',
      name: session.user.name ?? '',
      email: session.user.email ?? '',
      username: session.user.username ?? '',
      image: session.user.image ?? '', 
    } : null;
    if (!payload) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    console.log('payload', payload)

    c.set('sessionData', payload);

    await next();
  } catch (error) {
    return c.json({ error: 'Server error' }, 500);
  }
};

// import { MiddlewareHandler } from "hono";
// import { authHandler, initAuthConfig } from '@hono/auth-js';
// import Google from '@auth/core/providers/google';
// import Credentials from '@auth/core/providers/credentials';
// import { compare } from 'bcryptjs';
// import { prisma } from "@/lib/prisma";

// // Initialize auth config middleware
// export const initAuth: MiddlewareHandler = initAuthConfig((c) => ({
//   secret: process.env.AUTH_SECRET,
//   providers: [
//     Google,
//     Credentials({
//       name: 'credentials',
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password) {
//           return null;
//         }

//         // You can replace this with your own user lookup logic
//         const user = await prisma.user.findUnique({
//             where: {
//                 username: credentials.username
//             }
//         })

//         if (!user?.password) return null;

//         const isValid = await compare(credentials.password, user.password);
//         if (!isValid) return null;

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//         };
//       }
//     }),
//   ],
// }));

// // Auth handler middleware
// export const auth = authHandler();

// // Protected route middleware
// export const requireAuth: MiddlewareHandler = async (c, next) => {
//   try {
//     const session = await c.get('authUser');
    
//     if (!session) {
//       return c.json({ error: 'Unauthorized' }, 401);
//     }

//     // Add user to context for use in route handlers
//     c.set('user', session);
//     await next();
//   } catch (error) {
//     return c.json({ error: 'Authentication failed' }, 401);
//   }
// };


// app.use('*', initAuth);

// // Auth.js API routes
// app.use('/api/auth/*', auth);


// app.use(
//     '*',
//     initAuthConfig((c) => ({
//       secret: process.env.AUTH_SECRET,
//       providers: [
//         Google,
//         Credentials({
//             name: 'credentials',
//             credentials: {
//             username: { label: "Username", type: "text" },
//             password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials) {
//             if (!credentials?.username || !credentials?.password) {
//                 return null;
//             }
    
//             // You can replace this with your own user lookup logic
//             const user = await prisma.user.findUnique({
//                 where: {
//                     username: credentials.username
//                 }
//             })
    
//             if (!user?.password) return null;
    
//             const isValid = await compare(credentials.password, user.password);
//             if (!isValid) return null;

//             console.log('user', user)
    
//             return {
//                 id: user.id,
//                 email: user.email,
//                 name: user.name,
//             };
//             }
//         }),
//       ],
//     }))
//   )

//   app.use('/api/*', authHandler())

//   app.use('/api/*', verifyAuth())

