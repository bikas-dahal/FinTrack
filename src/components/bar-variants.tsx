import { format } from "date-fns"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { CustomTooltip } from "./custom-tooltip"

type Props = {
    data: {
        date: string
        income: number
        expenses: number
    }[]
}

export const BarVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    axisLine={false} 
                    tickLine={false} 
                    dataKey="date" 
                    tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                    style={{ fontSize: '14px' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="income" className='drop-shadow-md' fill="#8884d8" />
                <Bar dataKey="expenses" className='drop-shadow-md' fill="#f43a9d" />
            </BarChart>
        </ResponsiveContainer>
    )
}