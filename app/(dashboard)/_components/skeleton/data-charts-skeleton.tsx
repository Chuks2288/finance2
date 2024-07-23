"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const DataChartsSkeleton = () => {
    return (
        <div className="flex-1 w-full space-y-6">
            <div className="flex lg:flex-row gap-y-3 flex-col lg:items-center items-start justify-between w-full">
                <Skeleton className="h-6 w-[180px]" />
                <Skeleton className="h-8 w-[180px]" />
            </div>
            <Skeleton className="h-[300px] w-full" />
        </div>
    );
};
