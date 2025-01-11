import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.hono.transactions.$post>
type RequestType = InferRequestType<typeof client.api.hono.transactions.$post>['json']

export const useCreateTransaction = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.hono.transactions.$post({ json })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Transaction created successfully')
            queryClient.invalidateQueries({queryKey: ['transactions']})
            queryClient.invalidateQueries({queryKey: ['summary']})
        },
        onError: (error) => {
            toast.error('Failed to create transaction')
            console.log(error)
        }
    })

    return mutation
}