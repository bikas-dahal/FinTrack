import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.hono.portfolio[':id']['$delete'], 200>

export const useDeletePortfolio = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.hono.portfolio[':id']['$delete']({ param: {id} })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Portfolio deleted successfully')
            queryClient.invalidateQueries({queryKey: ['port', {id}]})
            queryClient.invalidateQueries({queryKey: ['portfolio']})
            queryClient.invalidateQueries({queryKey: ['transactions']})
        },
        onError: (error) => {
            toast.error('Failed to delete portfolio')
            console.log(error)
        }
    })

    return mutation
}