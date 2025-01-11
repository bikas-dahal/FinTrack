import { client } from "@/lib/hono";
import { convertAmountFromMilliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetSummary = () => {

    const params = useSearchParams()

    const from = params.get('from') || ''
    const to = params.get('to') || ''
    const portfolioId = params.get('portfolioId') || ''

    const query = useQuery({
        queryKey: ['summary', {from, to, portfolioId}],
        queryFn: async () => {
            const response = await client.api.hono.summary.$get({
                query: {
                    from,
                    to,
                    portfolioId
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch summary')
            }

            const { data } = await response.json()

            return {
                ...data,
                incomeAmount: convertAmountFromMilliunits(data.incomeAmount),
                expenseAmount: convertAmountFromMilliunits(data.expensesAmount),
                remainingAmount: convertAmountFromMilliunits(data.remainingAmount),
                categories: data.categories.map((category) => ({
                    ...category,
                    value: convertAmountFromMilliunits(category.sum)
                })),
                days: data.days.map((day) => ({
                    ...day,
                    income: convertAmountFromMilliunits(day.income),
                    expenses: convertAmountFromMilliunits(day.expenses)
                }))

            }
        }
    })

    return query
}