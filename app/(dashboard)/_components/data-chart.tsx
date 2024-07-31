"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary"
import { Charts } from "./charts"
import { SpendingPie } from "./spending-pie"
import { DataChartsSkeleton } from "./skeleton/data-charts-skeleton";
// import { data } from "@/data";

export const DataCharts = () => {
    const {
        data,
        isLoading
    } = useGetSummary();


    if (isLoading) {
        return (
            <div className="w-full mt-10 flex lg:flex-row flex-col lg:items-center items-start justify-between lg:gap-12 gap-8">
                <DataChartsSkeleton />
                <DataChartsSkeleton />
            </div>
        )
    }
    return (
        <div className="w-full mt-10 flex lg:flex-row flex-col items-start justify-between lg:gap-12 gap-8">
            <Charts data={data?.days} />
            <SpendingPie data={data?.categories} />
        </div>
    )
}

