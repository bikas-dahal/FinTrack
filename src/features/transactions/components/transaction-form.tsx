import { AmountInput } from "@/components/amount-input";
import { DatePicker } from "@/components/date-picker";
import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { convertAmountToMilliunits } from "@/lib/utils";
import { transactionFormSchema, TransactionFormType } from "@/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";


type Props = {
    id?: string
    defaultValues?: TransactionFormType
    onSubmit: (data: TransactionFormType) => void
    onDelete?: () => void
    disabled?: boolean
    categoryOptions: { label: string | null, value: string | null }[]
    portfolioOptions: { label: string| null, value: string | null }[]
    onCreateCategory: (name: string) => void
    onCreatePortfolio: (name: string) => void
}

export const TransactionForm = ({ id, defaultValues, categoryOptions, portfolioOptions, onCreateCategory, onCreatePortfolio, onSubmit, onDelete, disabled }: Props) => {
    const form = useForm<TransactionFormType>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues
    })

    const handleSubmit = (data: TransactionFormType) => {
        const amount = parseFloat(data.amount)
        const convertedAmount = convertAmountToMilliunits(amount)
        console.log({
            ...data,
            amount: convertedAmount
        })
        onSubmit({ 
            ...data, 
            amount: convertedAmount
        })
    }

    const handleDelete = () => {
        onDelete?.()
    }

    return (
        <Form {...form}>
            <form className="space-y-5 flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField 
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div>
                                    <FormLabel className="mb-2 text-md">Date</FormLabel>
                                    <DatePicker value={field.value} onChange={field.onChange} disabled={disabled} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    name="portfolioId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div>
                                    <FormLabel className="mb-2 text-md">Portfolio</FormLabel>
                                    <Select 
                                        placeholder="Select Portfolio" 
                                        onCreate={onCreatePortfolio} options={portfolioOptions} 
                                        onChange={field.onChange}
                                        disabled={disabled} 
                                        value={field.value || ''}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div>
                                    <FormLabel className="mb-2  text-md">Category</FormLabel>
                                    <Select 
                                        placeholder="Select Category" 
                                        onCreate={onCreateCategory} options={categoryOptions} 
                                        onChange={field.onChange}
                                        disabled={disabled} 
                                        value={field.value || ''}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    name="payee"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div>
                                    {/* <FormLabel className="mb-2 font-semibold text-md">Payee</FormLabel> */}
                                    <Input placeholder="Payee" {...field} disabled={disabled} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div>
                                    <FormLabel className="mb-2 text-md">Amount</FormLabel>
                                    <AmountInput value={field.value} onChange={field.onChange} placeholder="99"  disabled={disabled} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    name="notes"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div>
                                    <FormLabel className="pt-2 text-md">Notes</FormLabel>
                                    <Textarea placeholder="Optional Notes" {...field} value={field.value || ''} disabled={disabled} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                
                <Button disabled={disabled} className="w-full" type="submit" variant="secondary">
                    {id ? 'Update Transaction' : 'Create Transaction'}
                </Button>
                {!!id && (
                    <Button disabled={disabled} type="button" className="w-full " onClick={handleDelete} variant="secondary">
                        <Trash2Icon className="" />
                        Delete Transaction
                    </Button>
                )} 
            </form>
        </Form>
    )
}
