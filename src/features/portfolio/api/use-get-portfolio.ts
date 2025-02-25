import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetPortfolio = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['port', {id}],
        queryFn: async () => {
            const response = await client.api.hono.portfolio[':id'].$get({
                param: {id}
            })

            if (!response.ok) {
                throw new Error('Failed to fetch portfolio')
            }

            const { data } = await response.json()

            return data
        }
    })

    return query
}