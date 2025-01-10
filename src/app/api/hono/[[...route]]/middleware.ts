import { auth } from '@/auth';
import { Context, Hono } from 'hono';


export const sessionMiddleware = async (c, next) => {
  try {
    // Call the NextAuth helper to get the session
    const session = await auth(); 

    // Extract user payload from session
    const payload = session?.user;

    if (!payload) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Attach session data to the context
    c.set('sessionData', payload);

    // Proceed to the next handler
    await next();
  } catch (error) {
    console.error('Session middleware error:', error);
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

