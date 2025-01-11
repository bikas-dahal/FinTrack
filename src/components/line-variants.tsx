import { format } from "date-fns"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { CustomTooltip } from "./custom-tooltip"

type Props = {
    data: {
        date: string
        income: number
        expenses: number
    }[]
}

export const LineVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    axisLine={false} 
                    tickLine={false} 
                    dataKey="date" 
                    tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                    style={{ fontSize: '14px' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line dot={false} dataKey="income" className='drop-shadow-md' strokeWidth={2} stroke="#8884d8" />
                <Line dot={false} dataKey="expenses" className='drop-shadow-md' strokeWidth={2} stroke="#f43a9d" />
            </LineChart>
        </ResponsiveContainer>
    )
}