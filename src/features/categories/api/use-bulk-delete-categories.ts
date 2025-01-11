import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.hono.categories['bulk-delete']['$post']>
type RequestType = InferRequestType<typeof client.api.hono.categories['bulk-delete']['$post']>

export const useBulkDeleteCategories = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.hono.categories['bulk-delete']['$post']({ json })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Category Deleted successfully')
            queryClient.invalidateQueries({queryKey: ['categories']})
        },
        onError: (error) => {
            toast.error('Failed to delete category')
            console.log(error)
        }
    })

    return mutation
}