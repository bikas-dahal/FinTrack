import { AreaChart, BarChart, FileSearch, LineChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { AreaVariant } from "./area-variant"
import { BarVariant } from "./bar-variants"
import { LineVariant } from "./line-variants"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type Props = {
    data?: {
        date: string
        income: number
        expenses: number
    }[]
}

export const Chart = ({ data = [] }: Props) => {

    const [chartType, setChartType] = useState('line')

    const onTypeChange = (type: string) => {
        setChartType(type)
    }

    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Transactions
                </CardTitle>
                    <Select
                        defaultValue={chartType}
                        onValueChange={onTypeChange}
                    >
                        <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                            <SelectValue placeholder='Select chart type' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='line'>
                                <div className="flex items-center">
                                    <LineChart className="size-6 mr-2" />
                                    <p className="line-clamp-1">
                                        Line Chart
                                    </p>
                                </div>
                            </SelectItem>
                            <SelectItem value='bar'>
                                <div className="flex items-center">
                                    <BarChart className="size-6 mr-2" />
                                    <p className="line-clamp-1">
                                        Bar Chart
                                    </p>
                                </div>
                            </SelectItem>
                            <SelectItem value='area'>
                                <div className="flex items-center">
                                    <AreaChart className="size-6 mr-2" />
                                    <p className="line-clamp-1">
                                        Area Chart
                                    </p>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                        <FileSearch className="size-8 text-slate-400" />
                        <p className="text-slate-400 text-muted-foreground text-sm">No data available for this period</p>
                    </div>
                ): (
                    <>
                        {chartType === 'line' && <LineVariant data={data} />}
                        {chartType === 'bar' && <BarVariant data={data} />}
                        {chartType === 'area' && <AreaVariant data={data} />}
                    </>
                )}
            </CardContent>
        </Card>
    )
}