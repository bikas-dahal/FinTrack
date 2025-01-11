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
import { useGetPortfolios } from "@/features/portfolio/api/use-get-portfolios"
import { useCreatePortfolio } from "@/features/portfolio/api/use-create-portfolio"
import { useCreateCategory } from "@/features/categories/api/use-create-category"
import { useGetCategories } from "@/features/categories/api/use-get-categories"


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

     const categoryQuery = useGetCategories()
        const categoryMutation = useCreateCategory() 
    
        const onCreateCategory = (name: string) => 
            categoryMutation.mutate({name, description: ''})
    
        const categoryOptions = (categoryQuery.data || []).map(category => ({
            label: category.name,
            value: category.id
        }))
    
        const portfolioQuery = useGetPortfolios()
        const portfolioMutation = useCreatePortfolio()
    
        const onCreatePortfolio = (name: string) => 
            portfolioMutation.mutate({name, description: ''})
    
        const portfolioOptions = (portfolioQuery.data || []).map(portfolio => ({
            label: portfolio.name,
            value: portfolio.id
        }))

    const isPending = editMutation.isPending || deleteMutation.isPending || categoryMutation.isPending || portfolioMutation.isPending || transactionQuery.isLoading 

    const isLoading = transactionQuery.isLoading || categoryQuery.isLoading || portfolioQuery.isLoading

    const onSubmit = (value: TransactionFormType) => {
        console.log(value)
        editMutation.mutate(value, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const defaultValues = transactionQuery.data ? {
        accountId: transactionQuery.data.portfolioId,
        categoryId: transactionQuery.data.categoryId,
        portfolioId: transactionQuery.data.portfolioId,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes
    } : undefined

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
                        onDelete={onDelete}
                        categoryOptions={categoryOptions}
                        portfolioOptions={portfolioOptions}
                        onCreateCategory={onCreateCategory}
                        onCreatePortfolio={onCreatePortfolio}
                        defaultValues={
                            defaultValues
                        } 

                    />
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}