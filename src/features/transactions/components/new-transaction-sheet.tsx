'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useMountedState } from "react-use"
import { Button } from "@/components/ui/button"
import { useNewTransaction } from "../hooks/use-new-transaction"
import { useCreateTransaction } from "../api/use-create-transaction"
import { TransactionFormType } from "@/schema/form"
import { TransactionForm } from "./transaction-form"
import { useGetCategories } from "@/features/categories/api/use-get-categories"
import { useCreateCategory } from "@/features/categories/api/use-create-category"
import { useGetPortfolios } from "@/features/portfolio/api/use-get-portfolios"
import { useCreatePortfolio } from "@/features/portfolio/api/use-create-portfolio"
import { Loader2Icon } from "lucide-react"

export const NewTransactionSheet = () => {

    const isMounted = useMountedState()

    if (!isMounted) {
        return null
    }

    const {isOpen, onClose} = useNewTransaction()

    const mutation = useCreateTransaction()

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

    

    const onSubmit = (value: TransactionFormType) => {
        console.log(value)
        mutation.mutate(value, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const isPending = mutation.isPending || categoryMutation.isPending || portfolioMutation.isPending

    const isLoading = categoryQuery.isLoading || portfolioQuery.isLoading


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New transaction</SheetTitle>
                    <SheetDescription>Create a new transaction to track your Finance</SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <div className="flex absolute inset-0 items-center justify-center">
                        <Loader2Icon className="animate-spin size-6 text-slate-400" />
                    </div>
                ) : (
                    <TransactionForm 
                        disabled={isPending} 
                        onSubmit={onSubmit} 
                        categoryOptions={categoryOptions}
                        portfolioOptions={portfolioOptions}
                        onCreateCategory={onCreateCategory}
                        onCreatePortfolio={onCreatePortfolio}
                        defaultValues={{
                            date: new Date(),
                            amount: 0,
                            categoryId: '',
                            payee: '',
                            portfolioId: '',
                            notes: '',
                        }} 
                    />

                )}
            </SheetContent>
        </Sheet>
    )
}