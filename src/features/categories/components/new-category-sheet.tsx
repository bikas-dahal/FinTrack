'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useMountedState } from "react-use"
import { Button } from "@/components/ui/button"
import { CategoryFormType } from "@/schema/form"
import { useNewCategory } from "../hooks/use-new-category"
import { useCreateCategory } from "../api/use-create-category"
import { CategoryForm } from "./category-form"

export const NewCategorySheet = () => {

    const isMounted = useMountedState()

    if (!isMounted) {
        return null
    }

    const {isOpen, onClose} = useNewCategory()

    const mutation = useCreateCategory()

    const onSubmit = (value: CategoryFormType) => {
        console.log(value)
        mutation.mutate(value, {
            onSuccess: () => {
                onClose()
            }
        })
    }


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New category</SheetTitle>
                    <SheetDescription>Create a new category to track your Finance</SheetDescription>
                </SheetHeader>
                <CategoryForm disabled={mutation.isPending} onSubmit={onSubmit} defaultValues={{
                    name: '',
                    description: '',
                }} />
            </SheetContent>
        </Sheet>
    )
}