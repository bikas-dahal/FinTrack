import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categoryFormSchema, CategoryFormType } from "@/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";


type Props = {
    id?: string
    defaultValues?: CategoryFormType
    onSubmit: (data: CategoryFormType) => void
    onDelete?: () => void
    disabled?: boolean
}

export const CategoryForm = ({ id, defaultValues, onSubmit, onDelete, disabled }: Props) => {
    const form = useForm<CategoryFormType>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues
    })

    const handleSubmit = (data: CategoryFormType) => {
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
                                <div>
                                    <FormLabel>Name</FormLabel>
                                    <Input {...field} placeholder="e.x. Food, Travel, Etc" disabled={disabled} />
                                </div>
                            </FormControl>
                            <FormMessage />
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={disabled} className="w-full" type="submit" variant="secondary">
                    {id ? 'Update Category' : 'Create Category'}
                </Button>
                {!!id && (
                    <Button disabled={disabled} type="button" className="w-full " onClick={handleDelete} variant="secondary">
                        <Trash2Icon className="" />
                        Delete Category
                    </Button>
                )} 
            </form>
        </Form>
    )
}
