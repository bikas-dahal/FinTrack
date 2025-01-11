import { SelectSingleEventHandler } from "react-day-picker"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Calendar1Icon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

type Props = {
    value?: Date 
    onChange?: SelectSingleEventHandler
    disabled?: boolean
};

export const DatePicker = ({ value, onChange, disabled}: Props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                    disabled={disabled} 
                    variant="secondary" 
                    className={cn('w-full justify-start text-left font-normal', 
                    !value && "text-muted-foreground"
                )}>
                    <Calendar1Icon className="mr-2" />
                    {value? format(value, 'PPP') : 'Select Date'}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={disabled}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}