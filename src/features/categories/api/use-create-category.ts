import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.hono.categories.$post>
type RequestType = InferRequestType<typeof client.api.hono.categories.$post>['json']

export const useCreateCategory = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.hono.categories.$post({ json })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Category created successfully')
            queryClient.invalidateQueries({queryKey: ['categories']})
            queryClient.invalidateQueries({queryKey: ['transactions']})
            queryClient.invalidateQueries({queryKey: ['summary']})
        },
        onError: (error) => {
            toast.error('Failed to create category')
            console.log(error)
        }
    })

    return mutation
}