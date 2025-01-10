'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useMountedState } from "react-use"
import { Button } from "@/components/ui/button"
import { PortfolioForm } from "./portfolio-form"
import { PortfolioFormType } from "@/schema/form"
import { useCreatePortfolio } from "../api/use-create-portfolio"
import { useOpenPortfolio } from "../hooks/use-open-portfolio"
import { useGetPortfolio } from "../api/use-get-portfolio"
import { Loader2Icon } from "lucide-react"
import { useEditPortfolio } from "../api/use-edit-portfolio"
import { useDeletePortfolio } from "../api/use-delete-portfolio"
import { useConfirm } from "@/hooks/use-confirm"

export const EditPortfolioSheet = () => {

    const isMounted = useMountedState()

    if (!isMounted) {
        return null
    }

    const {isOpen, onClose, id} = useOpenPortfolio()

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure?',
        'This action cannot be undone',
    )


    const editMutation = useEditPortfolio(id)
    const deleteMutation = useDeletePortfolio(id)
    const portfolioQuery = useGetPortfolio(id)

    const isPending = editMutation.isPending || deleteMutation.isPending

    const isLoading = portfolioQuery.isLoading

    const onSubmit = (value: PortfolioFormType) => {
        console.log(value)
        editMutation.mutate(value, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const defaultValues = portfolioQuery.data ? {
        name: portfolioQuery.data.name,
        description: portfolioQuery.data.description,
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
                        <SheetTitle>Edit portfolio</SheetTitle>
                        <SheetDescription>Make changes to your portfolio</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute flex inset-0 items-center justify-center">
                            <Loader2Icon className="animate-spin size-6 text-slate-400" />
                        </div>
                    ) : (
                        <PortfolioForm 
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