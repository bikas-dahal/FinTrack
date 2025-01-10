import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetPortfolios = () => {
    const query = useQuery({
        queryKey: ['portfolio'],
        queryFn: async () => {
            const response = await client.api.hono.portfolio.$get()

            if (!response.ok) {
                throw new Error('Failed to fetch portfolio')
            }

            const { data } = await response.json()

            return data
        }
    })

    return query
}