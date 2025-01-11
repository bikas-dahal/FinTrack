import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.hono.transactions[':id']['$patch'], 200>
type RequestType = InferRequestType<typeof client.api.hono.transactions[':id']['$patch']>['json']

export const useEditTransaction = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.hono.transactions[':id']['$patch']({ json, param: {id} })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Transaction updated successfully')
            queryClient.invalidateQueries({queryKey: ['transaction', {id}]})
            queryClient.invalidateQueries({queryKey: ['transactions']})
        },
        onError: (error) => {
            toast.error('Failed to edit transaction')
            console.log(error)
        }
    })

    return mutation
}