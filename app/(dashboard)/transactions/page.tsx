"use client";

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { columns } from "./_components/columns"
import { DataTable } from "@/components/data-table"
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { Transactions } from "@prisma/client";

const TransactionsPage = () => {
    const { onOpen } = useNewTransaction();

    const deleteBulkTransactions = useBulkDeleteTransactions();

    const transactionsQueries = useGetTransactions();
    const transaction = transactionsQueries.data || [];
    const isLoading = transactionsQueries.isLoading;

    const isDisabled =
        transactionsQueries.isLoading ||
        deleteBulkTransactions.isPending;

    return (
        <>
            <main className="mx-4 pb-20">
                <div className="min-h-[50vh] max-w-[1200px] mx-auto rounded-md -mt-20 bg-white shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">
                            Transactions Page
                        </h2>
                        <Button
                            onClick={onOpen}
                            className="flex items-center gap-x-2 bg-black text-white text-sm font-bold"
                        >
                            <Plus className="size-4" />
                            Add new
                        </Button>
                    </div>

                    {isLoading ?
                        <DataTableSkeleton /> :
                        <DataTable
                            columns={columns}
                            data={transaction as Transactions[] | any}
                            filters="name"
                            onDelete={(rows) => {
                                const ids = rows.map((r) => r.original.id);
                                deleteBulkTransactions.mutate(ids);
                            }}
                            disabled={isDisabled}
                        />
                    }
                </div>
            </main>
        </>
    )
}

export default TransactionsPage;
