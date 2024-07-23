"use client";

import { useSearchParams } from "next/navigation";

import { useGetSummary } from "@/features/summary/api/use-get-summary"

import { DataCard } from "./data-card";
import { formatDateRange } from "@/lib/utils";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { DataSkeletonCard } from "./skeleton/data-skeleton-card";

export const DataGrid = () => {
    const { data, isLoading } = useGetSummary();

    const params = useSearchParams();
    const to = params.get("to") || undefined;
    const from = params.get("from") || undefined;

    const dateRangeLabel = formatDateRange({ from, to });

    if (isLoading) {
        return (
            <div className="grid lg:grid-cols-3 grid-cols-1 w-full gap-8 py-4">
                <DataSkeletonCard />
                <DataSkeletonCard />
                <DataSkeletonCard />
            </div>
        )
    }

    return (
        <div className="grid lg:grid-cols-3 grid-cols-1 w-full gap-8 py-4">
            <DataCard
                title="Remaining"
                dateRange={dateRangeLabel}
                icon={FaPiggyBank}
                value={data?.data?.remainingAmount}
                variant="default"
                percentageChange={data?.data?.remainingChange}
            />
            <DataCard
                title="Income"
                dateRange={dateRangeLabel}
                icon={FaArrowTrendUp}
                value={data?.data?.incomeAmount}
                variant="success"
                percentageChange={data?.data?.incomeChange}
            />
            <DataCard
                title="Expenses"
                dateRange={dateRangeLabel}
                icon={FaArrowTrendDown}
                value={data?.data?.expensesAmount}
                variant="danger"
                percentageChange={data?.data?.expensesChange}
            />
        </div>
    )
}

