import { prisma } from "@/lib/prisma";
import { Hono } from "hono";
import {zValidator} from '@hono/zod-validator'
import { z } from "zod";


const app = new Hono() 
    .get('/',
        
        async (c) => {

            const session = c.get('sessionData')
            
            const data = await prisma.portfolio.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                },
                where: {
                    userId: session?.id
                }
            })

        return c.json({ data })
    })
    .post(
        '/', 
        zValidator('json', z.object({
            name: z.string(),
            description: z.string()
        })),
        async (c) => {
        // @ts-ignore
        const session = c.get('sessionData')

        const {name, description} = c.req.valid('json')

        const data = await prisma.portfolio.create({
            data: {
                name,
                description,
                userId: session?.id
            }
        })

        return c.json({ data })
    })


export default app 