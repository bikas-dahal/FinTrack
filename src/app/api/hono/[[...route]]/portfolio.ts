import { prisma } from "@/lib/prisma";
import { Hono } from "hono";
import {zValidator} from '@hono/zod-validator'
import { z } from "zod";

import { Context } from 'hono';

// interface CustomContext extends Context {
//   get(key: 'sessionData'): { id: string } | undefined;
// }


const app = new Hono() 
    .get('/',
        
        async (c) => {
            // @ts-ignore
            const session = c.get('sessionData')
            
            const data = await prisma.portfolio.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                },
                where: {
                    // @ts-ignore
                    userId: session?.id
                }
            })

        return c.json({ data })
    })
    .get(
        '/:id',
        zValidator('param', z.object({
            id: z.string().optional()
        })),
        async (c) => {
            const {id} = c.req.valid('param')

            if (!id) {
                return c.json({ error: 'Invalid id' }, 400)
            }

            // @ts-ignore
            const session = c.get('sessionData')

            if (!session) {
                return c.json({ error: 'Unauthorized' }, 401)
            }

            const data = await prisma.portfolio.findFirst({
                where: {
                    id,
                    // @ts-ignore
                    userId: session.id
                }
            })

            if (!data) {
                return c.json({ error: 'Portfolio not found' }, 404)
            }

            return c.json({ data })
        }
    )
    .post(
        '/', 
        zValidator('json', z.object({
            name: z.string(),
            description: z.string()
        })),
        async (c) => {
        
        // @ts-ignore
        const session: any = c.get('sessionData')

        console.log('sessi', session)

        const id = session.id

        const {name, description} = c.req.valid('json')   
        
        console.log('reach here', name, description, id)

        const data = await prisma.portfolio.create({
            data: {
                name,
                description,
                userId: id
            }
        })

        // console.log('reach here', data)

        return c.json({ data })
    })
    .post(
        '/bulk-delete',
        zValidator('json', z.object({
            ids: z.array(z.string())
        })),
        async (c) => {
            const {ids} = c.req.valid('json')
            // @ts-ignore
            const session = c.get('sessionData')

            if (!session) {
                return c.json({ error: 'Unauthorized' }, 401)
            }

            const data = await prisma.portfolio.deleteMany({
                where: {
                    id: {
                        in: ids
                
                    },
                    // @ts-ignore
                    userId: session.id
                }
            })

            return c.json({ data })
        }
    )
    .patch(
        '/:id',
        zValidator('param', z.object({
            id: z.string().optional()
        })),
        zValidator('json', z.object({
            name: z.string().optional(),
            description: z.string().optional()
        })),
        async (c) => {
            const {id} = c.req.valid('param')

            if (!id) {
                return c.json({ error: 'Invalid id' }, 400)
            }

            // @ts-ignore
            const session = c.get('sessionData')

            if (!session) {
                return c.json({ error: 'Unauthorized' }, 401)
            }

            const {name, description} = c.req.valid('json')

            const data = await prisma.portfolio.update({
                where: {
                    id,
                    // @ts-ignore
                    userId: session.id
                },
                data: {
                    name,
                    description
                }
            })

            if (!data) {
                return c.json({ error: 'Portfolio not found' }, 404)
            }

            return c.json({ data })
        }   
    )
    .delete(
        '/:id',
        zValidator('param', z.object({
            id: z.string().optional()
        })),
        async (c) => {
            const {id} = c.req.valid('param')

            if (!id) {
                return c.json({ error: 'Invalid id' }, 400)
            }

            // @ts-ignore
            const session = c.get('sessionData')

            if (!session) {
                return c.json({ error: 'Unauthorized' }, 401)
            }

            const data = await prisma.portfolio.delete({
                where: {
                    id,
                    // @ts-ignore
                    userId: session.id
                }
            })

            if (!data) {
                return c.json({ error: 'Portfolio not found' }, 404)
            }

            return c.json({ data })
        }   
    )


export default app 