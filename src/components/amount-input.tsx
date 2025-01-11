import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { InfoIcon, MinusCircleIcon, PlusCircleIcon } from "lucide-react"
import CurrencyInput  from 'react-currency-input-field'

type Props = {
    value: string
    onChange: (value: string | undefined) => void
    placeholder?: string
    disabled?: boolean
}

export const AmountInput = ({ value, onChange, placeholder, disabled }: Props) => {

    const parsedValue = parseFloat(value)

    const isIncome = parsedValue > 0
    const isExpense = parsedValue < 0

    const onReverseValue = () => {
        if (!value) return
        const newValue = parseFloat(value) * -1
        onChange(newValue.toString())
    }

    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                        <button 
                            type="button" 
                            onClick={onReverseValue}
                            className={cn(
                                'bg-slate-500 hover:bg-slate-600 absolute top-1.5 left-1.5 rounded-md p-1 flex items-center justify-center transition',
                                isIncome && 'bg-green-500 hover:bg-emerald-600',
                                isExpense && 'bg-red-500 hover:bg-rose-600'
                            )}
                        >
                            {!parsedValue && <InfoIcon className="w-4 h-4" />}
                            {isIncome && <PlusCircleIcon className="w-4 h-4" />}
                            {isExpense && <MinusCircleIcon className="w-4 h-4" />}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Use [+] to add income and [-] to add expense
                    </TooltipContent>
                    <CurrencyInput
                        prefix="Rs "
                        className="pl-10 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" 
                        placeholder={placeholder}
                        value={value}
                        decimalsLimit={2}
                        decimalScale={2}
                        onValueChange={onChange}
                        disabled={disabled}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        {isIncome && 'This will be added as income'}
                        {isExpense && 'This will be added as expense'}
                    </p>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}