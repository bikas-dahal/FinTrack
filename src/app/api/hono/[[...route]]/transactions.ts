import { prisma } from "@/lib/prisma";
import { Hono } from "hono";
import {zValidator} from '@hono/zod-validator'
import { z } from "zod";
import { parse, parseISO, subDays } from "date-fns";


const app = new Hono() 
    .get('/',
        zValidator('query', z.object({
            from: z.string().optional(),
            to: z.string().optional(),
            portfolioId: z.string().optional()
        })),
        async (c) => {
            // @ts-ignore
            const session = c.get('sessionData')

            if (!session) {
                return c.json({ error: 'Unauthorized' }, 401)
            }

            const {from, to, portfolioId} = c.req.valid('query')

            const defaultTo = new Date()
            const defaultFrom = subDays(defaultTo, 30)

            const startDate = from ? parseISO(from) : defaultFrom
            const endDate = to ? parseISO(to) : defaultTo;

            console.log('defaultTo defaultFrom', startDate , endDate)

            const data = await prisma.transaction.findMany({
                where: {
                    // portfolioId,
                    // @ts-ignore
                    userId: session.id,
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                select: {
                    id: true,
                    payee: true,
                    notes: true,
                    amount: true,
                    date: true,
                    category: {
                        select: {
                            name: true,
                            id: true
                        }
                    },
                    portfolio: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                },
                orderBy: {
                    date: 'desc'
                }
            })

            console.log('data', data)

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

            const data = await prisma.transaction.findUnique({
                where: {
                    id,
                    // @ts-ignore
                    userId: session.id
                }
            })

            if (!data) {
                return c.json({ error: 'Transaction not found' }, 404)
            }

            return c.json({ data })
        }
    )
    .post(
        '/', 
        zValidator('json', z.object({
            amount: z.number(),
            date: z.string(),
            categoryId: z.string(),
            payee: z.string(),
            notes: z.string().optional(),
            portfolioId: z.string()
        })),
        async (c) => {
        
        // @ts-ignore
        const session: any = c.get('sessionData')

        console.log('sessi', session)

        const id = session.id

        const {amount, date, categoryId, payee, notes, portfolioId} = c.req.valid('json')   
        
        // console.log('reach here', name, description, id)

        const data = await prisma.transaction.create({
            data: {
                amount,
                date,
                categoryId,
                payee,
                notes,
                portfolioId,
                userId: id
            }
        })

        // console.log('reach here', data)

        return c.json({ data: 'hi' })
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

            const data = await prisma.transaction.deleteMany({
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
    .post(
        '/bulk-create',
        zValidator('json', z.array(z.object({ 
            amount: z.number(),
            date: z.string(),
            categoryId: z.string(),
            payee: z.string(),
            notes: z.string().optional(),
            portfolioId: z.string()
        }))),
        async (c) => {
            const transactions = c.req.valid('json')

            // @ts-ignore
            const session = c.get('sessionData')

            if (!session) {
                return c.json({ error: 'Unauthorized' }, 401)
            }

            const data = await prisma.transaction.createMany({
                data: transactions.map((transaction) => ({
                    ...transaction,
                    // @ts-ignore
                    userId: session.id
                }))
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
            amount: z.number(),
            date: z.string(),
            categoryId: z.string(),
            payee: z.string(),
            notes: z.string().optional(),
            portfolioId: z.string()
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

            const {amount, date, categoryId, payee, notes, portfolioId} = c.req.valid('json')

            const data = await prisma.transaction.update({
                where: {
                    id,
                    // @ts-ignore
                    userId: session.id
                },
                data: {
                    amount,
                    date,
                    categoryId,
                    payee,
                    notes,
                    portfolioId
                }
            })

            if (!data) {
                return c.json({ error: 'Transaction not found' }, 404)
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

            const data = await prisma.transaction.delete({
                where: {
                    id,
                    // @ts-ignore
                    userId: session.id
                }
            })

            if (!data) {
                return c.json({ error: 'Transaction not found' }, 404)
            }

            return c.json({ data })
        }   
    )


export default app 