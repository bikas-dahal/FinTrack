'use client'

import { useGetSummary } from "@/features/summary/api/use-get-summary"
import { Chart } from "./chart"
import { Skeleton } from "./ui/skeleton"
import { SpendingPie } from "./spending-pie"

export const DataCharts = () => {
    const {data, isLoading} = useGetSummary()

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-8">
                <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                    <Skeleton className="h-96" />
                </div>

                <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                    <Skeleton className="h-96" />

                </div>

            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-8">
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                <Chart data={data?.days} />
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-2">
                <SpendingPie data={data?.categories} />
            </div>
        </div>
    )
}