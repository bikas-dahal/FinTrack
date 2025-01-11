import { formatCurrency, formatPercentage } from "@/lib/utils"
import {  Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts"
import { CategoryTooltip } from "./category-tooltip"

type Props = {
    data?: {
        name: string
        value: number
    }[]
}

const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6']

export const RadialVariants = ({ data = [] }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <RadialBarChart cx={'50%'} cy={'50%'} innerRadius={'80%'} outerRadius={'40%'} barSize={10} data={
                data.map((item, index) => ({
                    ...item,
                    fill: colors[index % colors.length]
                }))
            }>
                <RadialBar
                    label={{
                        position: 'insideStart',
                        fill: '#fff',
                        fontSize: 14
                    }}
                        background 
                    dataKey="value"
                />
                <Legend 
                    layout="horizontal"
                    verticalAlign="bottom" 
                    align="right"
                    iconType="circle"
                    content={({ payload }: any) => {
                        return (
                            <ul className="flex flex-col space-y-2">
                                {
                                    payload.map((entry:any, index:number) => (
                                        <li key={`item-${index}`} className="flex items-center gap-x-2">
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                            <div className="space-x-1">
                                                <span className="text-sm text-muted-foreground">
                                                    {entry.value}
                                                </span>
                                                <span className="text-sm">
                                                    {formatCurrency(entry.payload.value)}

                                                </span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }}
                
                />
                <Tooltip content={<CategoryTooltip />} />
                
            </RadialBarChart>
        </ResponsiveContainer>
    )
}