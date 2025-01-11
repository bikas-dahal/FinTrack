import { formatPercentage } from "@/lib/utils"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { CategoryTooltip } from "./category-tooltip"

type Props = {
    data?: {
        name: string
        value: number
    }[]
}

const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6']

export const PieVariants = ({ data = [] }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
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
                                                    {formatPercentage(entry.payload.value * 100)}

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
                <Pie 
                    data={data} 
                    dataKey="value" 
                    cx="50%" 
                    cy="50%" 
                    paddingAngle={5}  
                    innerRadius={40} 
                    outerRadius={80} 
                    fill="#8884d8" 
                    labelLine={false}
                >
                    {
                        data.map((_entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}