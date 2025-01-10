import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.hono.portfolio['bulk-delete']['$post']>
type RequestType = InferRequestType<typeof client.api.hono.portfolio['bulk-delete']['$post']>

export const useBulkDeletePortfolios = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.hono.portfolio['bulk-delete']['$post']({ json })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Portfolio Deleted successfully')
            queryClient.invalidateQueries({queryKey: ['portfolio']})
        },
        onError: (error) => {
            toast.error('Failed to delete portfolio')
            console.log(error)
        }
    })

    return mutation
}