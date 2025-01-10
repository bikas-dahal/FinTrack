'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useMountedState } from "react-use"
import {  useNewPortfolio } from "../hooks/use-new-portfolio"
import { Button } from "@/components/ui/button"
import { PortfolioForm } from "./portfolio-form"
import { PortfolioFormType } from "@/schema/form"
import { useCreatePortfolio } from "../api/use-create-portfolio"

export const NewPortfolioSheet = () => {

    const isMounted = useMountedState()

    if (!isMounted) {
        return null
    }

    const {isOpen, onClose} = useNewPortfolio()

    const mutation = useCreatePortfolio()

    const onSubmit = (value: PortfolioFormType) => {
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
                    <SheetTitle>New portfolio</SheetTitle>
                    <SheetDescription>Create a new portfolio to track your Finance</SheetDescription>
                </SheetHeader>
                <PortfolioForm disabled={mutation.isPending} onSubmit={onSubmit} defaultValues={{
                    name: '',
                    description: '',
                }} />
            </SheetContent>
        </Sheet>
    )
}