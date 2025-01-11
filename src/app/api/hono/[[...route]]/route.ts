import { Context, Hono } from 'hono'
import { handle } from 'hono/vercel'

import portfolio from './portfolio'
import categories from './categories'
import transactions from './transactions'
import { sessionMiddleware } from './middleware'
import summary from './summary'

// type CustomContext = Context<{ sessionData: any }>;

// interface CustomContext extends Context {
//     get(key: 'sessionData'): { id: string } | undefined;
//   }

const app = new Hono().basePath('/api/hono')



app.onError((error, c) => {
    console.error(error)
    return c.json({ error: 'Internal server error' }, 500)
})

app.use('*', sessionMiddleware)


const routes = app
    .route('/portfolio', portfolio)
    .route('/categories', categories)
    .route('/transactions', transactions)
    .route('/summary', summary)


export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes