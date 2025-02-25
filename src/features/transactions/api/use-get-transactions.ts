import { client } from "@/lib/hono";
import { convertAmountFromMilliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetTransactions = () => {

    const params = useSearchParams()

    const from = params.get('from') || ''
    const to = params.get('to') || ''
    const portfolioId = params.get('portfolioId') || ''

    const query = useQuery({
        queryKey: ['transactions', {from, to, portfolioId}],
        queryFn: async () => {
            const response = await client.api.hono.transactions.$get({
                query: {
                    from,
                    to,
                    portfolioId
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch transactions')
            }

            const { data } = await response.json()

            return data.map((transaction: any) => {
                return {
                    ...transaction,
                    amount: convertAmountFromMilliunits(transaction.amount)
                }
            })
        }
    })

    return query
}