import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { portfolioFormSchema, PortfolioFormType } from "@/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";


type Props = {
    id?: string
    defaultValues?: PortfolioFormType
    onSubmit: (data: PortfolioFormType) => void
    onDelete?: () => void
    disabled?: boolean
}

export const PortfolioForm = ({ id, defaultValues, onSubmit, onDelete, disabled }: Props) => {
    const form = useForm<PortfolioFormType>({
        resolver: zodResolver(portfolioFormSchema),
        defaultValues
    })

    const handleSubmit = (data: PortfolioFormType) => {
        // console.log(data)
        onSubmit(data)
    }

    const handleDelete = () => {
        onDelete?.()
    }

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField 
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Name" disabled={disabled} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Description" disabled={disabled} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button disabled={disabled} className="w-full" type="submit" variant="secondary">
                    {id ? 'Update Portfolio' : 'Create Portfolio'}
                </Button>
                {!!id && (
                    <Button disabled={disabled} className="w-full " onClick={handleDelete} variant="secondary">
                        <Trash2Icon className="" />
                        Delete Portfolio
                    </Button>
                )} 
            </form>
        </Form>
    )
}
