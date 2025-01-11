import { prisma } from "@/lib/prisma";
import { calculatePercentageChange, fillMissingDays } from "@/lib/utils";
import { zValidator } from "@hono/zod-validator";
import { differenceInDays, parseISO, subDays } from "date-fns";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
    .get(
        '/',
        zValidator('query', z.object({
            from: z.string().optional(),
            to: z.string().optional(),
            portfolioId: z.string().optional()
        })),
        async (c) => {
            
            const {from, to, portfolioId} = c.req.valid('query')

            // @ts-ignore
            const session = c.get('sessionData')

            if (!session) {
                return c.json({ error: 'Unauthorized' }, 401)
            }

            const defaultTo = new Date()
            const defaultFrom = subDays(defaultTo, 30)

            const startDate = from ? parseISO(from) : defaultFrom
            const endDate = to ? parseISO(to) : defaultTo;

            const periodLength = differenceInDays(endDate, startDate) + 1

            const lastPeriodStart = subDays(startDate, periodLength)
            const lastPeriodEnd = subDays(endDate, periodLength)

            // income, expenses and remainig
            async function fetchFinancialData(
                userId: string,
                startDate: Date,
                endDate: Date
            ) {
                const transactions = await prisma.transaction.findMany({
                    where: {
                        // portfolioId,
                        // @ts-ignore
                        userId,
                        date: {
                            gte: startDate,
                            lte: endDate
                        }
                    },
                    select: {
                        amount: true,
                        date: true,
                        category: {
                            select: {
                                name: true
                            }
                        }
                    },
                    orderBy: {
                        date: 'asc'
                    }
                })


                let income = 0
                let expenses = 0
                let remaining = 0

                transactions.forEach(transaction => {
                    if (transaction.amount > 0) {
                        income += transaction.amount
                    } else {
                        expenses += transaction.amount
                    }
                })

                remaining = income - expenses

                return {
                    income,
                    expenses,
                    remaining,
                }
            }

            
            
            // @ts-ignore
            const currentPeriodData = await fetchFinancialData(session.id, startDate, endDate)
            // @ts-ignore
            const lastPeriodData = await fetchFinancialData(session.id, lastPeriodStart, lastPeriodEnd)
            console.log('currentPeriodData', currentPeriodData)
            console.log('lastPeriodData', lastPeriodData)

            const incomeChange = calculatePercentageChange(currentPeriodData.income, lastPeriodData.income )
            const expensesChange = calculatePercentageChange(currentPeriodData.expenses, lastPeriodData.expenses )
            const remainingChange = calculatePercentageChange(currentPeriodData.remaining, lastPeriodData.remaining )

            // sum of each category
            const categoryData = await prisma.cateregory.findMany({
                where: {
                    // @ts-ignore
                    userId: session.id,
                    transactions: {
                        some: {
                            date: {
                                gte: startDate,
                                lte: endDate
                            }
                        }
                    }
                },
                select: {
                    name: true,
                    transactions: {
                        select: {
                            amount: true
                        }
                    }
                }
            })

            const categorySum = categoryData.map(category => {
                // negative amount only
                const sum = category.transactions.reduce((acc, curr) => acc + curr.amount, 0)
                return {
                    name: category.name,
                    sum
                }
            })

            const topCategories = categorySum.slice(0, 5)

            const otherCategories = categorySum.slice(5, categorySum.length)

            const finalCategories = topCategories 
            if (otherCategories.length > 0) {
                finalCategories.push({
                    name: 'Other',
                    sum: otherCategories.reduce((acc, curr) => acc + curr.sum, 0)
                })
            }

            // const incomeExpenseByDay = async () => {
                const transactions = await prisma.transaction.findMany({
                    where: {
                      // @ts-ignore
                      userId: session.id, // Replace with your condition
                      date: {
                        gte: startDate,
                        lte: endDate,
                      },
                    },
                    select: {
                      amount: true,
                      date: true,
                    },
                    orderBy: {
                      date: 'asc',
                    },
                  });
                  
                  // Group transactions by raw Date
                  const incomeExpenseByDay = transactions.reduce((acc, transaction) => {
                    const day = transaction.date.toDateString(); // Use the string representation of the date for grouping
                  
                    // Initialize the day's entry if not present
                    if (!acc[day]) {
                      acc[day] = { date: transaction.date, income: 0, expenses: 0 };
                    }
                  
                    // Add to income or expense based on amount
                    if (transaction.amount > 0) {
                      acc[day].income += transaction.amount;
                    } else {
                      acc[day].expenses += Math.abs(transaction.amount); // Convert expense to positive
                    }
                  
                    return acc;
                  }, {} as Record<string, { date: Date; income: number; expenses: number }>);
                  
                  // Convert grouped data into an array
                  const result = Object.values(incomeExpenseByDay);

                  const days = fillMissingDays(
                    result,
                    startDate,
                    endDate
                  )

                // return result
            // }


            return c.json({
                data: {
                    remainingAmount: currentPeriodData.remaining,
                    remainingChange,
                    incomeAmount: currentPeriodData.income,
                    incomeChange,
                    expensesAmount: currentPeriodData.expenses,
                    expensesChange,
                    categories: finalCategories,
                    days
                }
            })
        }


    )

export default app