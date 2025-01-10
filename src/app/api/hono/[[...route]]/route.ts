import { Context, Hono } from 'hono'
import { handle } from 'hono/vercel'

import portfolio from './portfolio'
import { sessionMiddleware } from './middleware'



const app = new Hono().basePath('/api/hono')

app.onError((error, c) => {
    console.error(error)
    return c.json({ error: 'Internal server error' }, 500)
})

app.use('*', sessionMiddleware)


const routes = app
    .route('/portfolio', portfolio)


export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes