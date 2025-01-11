import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.hono.portfolio[':id']['$patch'], 200>
type RequestType = InferRequestType<typeof client.api.hono.portfolio[':id']['$patch']>['json']

export const useEditPortfolio = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.hono.portfolio[':id']['$patch']({ json, param: {id} })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Portfolio updated successfully')
            queryClient.invalidateQueries({queryKey: ['port', {id}]})
            queryClient.invalidateQueries({queryKey: ['portfolio']})
            queryClient.invalidateQueries({queryKey: ['transactions']})
        },
        onError: (error) => {
            toast.error('Failed to edit portfolio')
            console.log(error)
        }
    })

    return mutation
}