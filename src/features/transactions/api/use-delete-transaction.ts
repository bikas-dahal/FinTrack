import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.hono.transactions[':id']['$delete'], 200>

export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.hono.transactions[':id']['$delete']({ param: {id} })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Transaction deleted successfully')
            queryClient.invalidateQueries({queryKey: ['transaction', {id}]})
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