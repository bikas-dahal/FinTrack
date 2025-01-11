'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useMountedState } from "react-use"
import { Loader2Icon } from "lucide-react"
import { useConfirm } from "@/hooks/use-confirm"
import { useOpenTransaction } from "../hooks/use-open-transaction"
import { useEditTransaction } from "../api/use-edit-transaction"
import { useDeleteTransaction } from "../api/use-delete-transaction"
import { useGetTransaction } from "../api/use-get-transaction"
import { TransactionFormType } from "@/schema/form"
import { TransactionForm } from "./transaction-form"


export const EditTransactionSheet = () => {

    const isMounted = useMountedState()

    if (!isMounted) {
        return null
    }

    const {isOpen, onClose, id} = useOpenTransaction()

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure?',
        'This action cannot be undone',
    )


    const editMutation = useEditTransaction(id)
    const deleteMutation = useDeleteTransaction(id)
    const transactionQuery = useGetTransaction(id)

    const isPending = editMutation.isPending || deleteMutation.isPending

    const isLoading = transactionQuery.isLoading

    const onSubmit = (value: TransactionFormType) => {
        console.log(value)
        editMutation.mutate(value, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const defaultValues = transactionQuery.data ? {
        name: transactionQuery.data.name,
        description: transactionQuery.data.description,
    } : {
        name: '',
        description: '',
    }

    const onDelete = async () => {
        const ok = await confirm()
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose()
                }
            })
        }
    }


    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit transaction</SheetTitle>
                        <SheetDescription>Make changes to your transaction</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute flex inset-0 items-center justify-center">
                            <Loader2Icon className="animate-spin size-6 text-slate-400" />
                        </div>
                    ) : (
                        <TransactionForm
                            id={id} 
                            disabled={isPending} 
                            onSubmit={onSubmit} 
                            defaultValues={defaultValues}
                            onDelete={onDelete} 
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}