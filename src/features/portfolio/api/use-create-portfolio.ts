import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.hono.portfolio.$post>
type RequestType = InferRequestType<typeof client.api.hono.portfolio.$post>['json']

export const useCreatePortfolio = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.hono.portfolio.$post({ json })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Portfolio created successfully')
            queryClient.invalidateQueries({queryKey: ['portfolio']})
            queryClient.invalidateQueries({queryKey: ['portfolios']})
            queryClient.invalidateQueries({queryKey: ['transactions']})
            queryClient.invalidateQueries({queryKey: ['summary']})
        },
        onError: (error) => {
            toast.error('Failed to create portfolio')
            console.log(error)
        }
    })

    return mutation
}