import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.hono.transactions['bulk-delete']['$post']>
type RequestType = InferRequestType<typeof client.api.hono.transactions['bulk-delete']['$post']>

export const useBulkDeleteTransactions = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.hono.transactions['bulk-delete']['$post']({ json })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Transaction Deleted successfully')
            queryClient.invalidateQueries({queryKey: ['transactions']})
            queryClient.invalidateQueries({queryKey: ['summary']})
        },
        onError: (error) => {
            toast.error('Failed to delete transaction')
            console.log(error)
        }
    })

    return mutation
}