
import { format } from 'date-fns'
import { ResponsiveContainer, AreaChart, Area, XAxis, CartesianGrid, Tooltip } from 'recharts'
import { CustomTooltip } from './custom-tooltip'

type Props = {
    data: {
        date: string
        income: number
        expenses: number
    }[]
}

export const AreaVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id='income' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                        <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id='expenses' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                        <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis 
                    axisLine={false} 
                    tickLine={false} 
                    dataKey="date" 
                    tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                    style={{ fontSize: '14px' }}
                />
                {/* <YAxis /> */}
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="income" className='drop-shadow-md' strokeWidth={2} stackId={'income'} stroke="#8884d8" fill="url(#income)" />
                <Area type="monotone" dataKey="expenses" className='drop-shadow-md' strokeWidth={2} stackId={'expenses'} stroke="#f43a9d" fill="url(#expenses)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}