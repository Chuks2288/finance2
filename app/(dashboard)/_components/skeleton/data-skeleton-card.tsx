import { Skeleton } from "@/components/ui/skeleton";

export const DataSkeletonCard = () => {
    return (
        <div className="border-none bg-white shadow-sm drop-shadow-sm rounded-md w-full p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-3">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-12 w-12 rounded-md" />
            </div>
            <div className="mt-10 space-y-3">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-32" />
            </div>
        </div>
    );
};
