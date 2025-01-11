import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.hono.categories[':id']['$delete'], 200>

export const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.hono.categories[':id']['$delete']({ param: {id} })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Category deleted successfully')
            queryClient.invalidateQueries({queryKey: ['category', {id}]})
            queryClient.invalidateQueries({queryKey: ['categories']})
        },
        onError: (error) => {
            toast.error('Failed to delete category')
            console.log(error)
        }
    })

    return mutation
}