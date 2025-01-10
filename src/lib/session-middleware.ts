// import 'server-only';
// import { createMiddleware } from "hono/factory";
// import { getCookie } from "hono/cookie";
// import { AdditionalContext } from "@/schema/types";

// export const sessionMiddleware = createMiddleware<AdditionalContext>(
//   async (c, next) => {
//     try {
//       // Get the auth user from the context (set by Auth.js)
//       const auth = c.get('authUser');

//       if (!auth) {
//         return c.json({
//           error: "unauthorized",
//         }, 401);
//       }

//       // Set the user in the context for use in route handlers
//       c.set('user', auth);

//       await next();
//     } catch (error) {
//       return c.json({
//         error: "Session verification failed",
//       }, 401);
//     }
//   }
// );