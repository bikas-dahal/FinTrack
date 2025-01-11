import {  FileSearch, PieChart, RadarIcon, TargetIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { AreaVariant } from "./area-variant"
import { BarVariant } from "./bar-variants"
import { LineVariant } from "./line-variants"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { PieVariants } from "./pie-variants"
import { RadarVariants } from "./radar-variants"
import { RadialVariants } from "./raidal-variant"

type Props = {
    data?: {
        name: string
        value: number
    }[]
}

export const SpendingPie = ({ data = [] }: Props) => {

    const [chartType, setChartType] = useState('radar')

    const onTypeChange = (type: string) => {
        setChartType(type)
    }

    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Categories
                </CardTitle>
                    <Select
                        defaultValue={chartType}
                        onValueChange={onTypeChange}
                    >
                        <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                            <SelectValue placeholder='Select chart type' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='radar'>
                                <div className="flex items-center">
                                    <RadarIcon className="size-6 mr-2" />
                                    <p className="line-clamp-1">
                                        Radar Chart
                                    </p>
                                </div>
                            </SelectItem>
                            {/* <SelectItem value='pie'>
                                <div className="flex items-center">
                                    <PieChart className="size-6 mr-2" />
                                    <p className="line-clamp-1">
                                        Pie Chart
                                    </p>
                                </div>
                            </SelectItem> */}
                            <SelectItem value='radial'>
                                <div className="flex items-center">
                                    <TargetIcon className="size-6 mr-2" />
                                    <p className="line-clamp-1">
                                        Radial Chart
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
                        {/* {chartType === 'pie' && <PieVariants data={data} />} */}
                        {chartType === 'radar' && <RadarVariants data={data} />}
                        {chartType === 'radial' && <RadialVariants data={data} />}
                    </>
                )}
            </CardContent>
        </Card>
    )
}