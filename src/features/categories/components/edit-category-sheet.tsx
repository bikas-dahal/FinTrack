'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useMountedState } from "react-use"
import { CategoryFormType } from "@/schema/form"
import { Loader2Icon } from "lucide-react"
import { useConfirm } from "@/hooks/use-confirm"
import { useOpenCategory } from "../hooks/use-open-category"
import { useEditCategory } from "../api/use-edit-category"
import { useDeleteCategory } from "../api/use-delete-category"
import { useGetCategory } from "../api/use-get-category"
import { CategoryForm } from "./category-form"


export const EditCategorySheet = () => {

    const isMounted = useMountedState()

    if (!isMounted) {
        return null
    }

    const {isOpen, onClose, id} = useOpenCategory()

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure?',
        'This action cannot be undone',
    )


    const editMutation = useEditCategory(id)
    const deleteMutation = useDeleteCategory(id)
    const categoryQuery = useGetCategory(id)

    const isPending = editMutation.isPending || deleteMutation.isPending

    const isLoading = categoryQuery.isLoading

    const onSubmit = (value: CategoryFormType) => {
        console.log(value)
        editMutation.mutate(value, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name,
        description: categoryQuery.data.description,
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
                        <SheetTitle>Edit category</SheetTitle>
                        <SheetDescription>Make changes to your category</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute flex inset-0 items-center justify-center">
                            <Loader2Icon className="animate-spin size-6 text-slate-400" />
                        </div>
                    ) : (
                        <CategoryForm
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