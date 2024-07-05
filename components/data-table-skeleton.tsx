import { Skeleton } from "@/components/ui/skeleton";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export const DataTableSkeleton = () => {
    const skeletonRows = Array.from({ length: 5 }); // Adjust the number of skeleton rows as needed

    return (
        <div>
            <div className="flex items-center py-4 mt-10">
                <Skeleton className="h-10 w-full max-w-sm" />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><Skeleton className="h-4 w-full" /></TableHead>
                            <TableHead><Skeleton className="h-4 w-full" /></TableHead>
                            <TableHead><Skeleton className="h-4 w-full" /></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {skeletonRows.map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
                <Skeleton className="h-4 w-1/4" />
            </div>
        </div>
    );
}
