"use client";

import { useState } from "react";
import { Plus, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { columns } from "./_components/columns"
import { DataTable } from "@/components/data-table"

import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

import { Transactions } from "@prisma/client";
import { ImportCard } from "./_components/import-card";
import { UploadButton } from "./_components/upload-button";
import { toast } from "sonner";
import { TransactionSchema } from "@/schema";

import { useSelectAccount } from "@/features/transactions/hooks/use-select-account";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";
import { useCreateStripeUrl } from "@/features/stripe/api/use-create-stripe";
import { getUserSubscription } from "@/lib/queries";

enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT"
}

const INITIAL_IMPORT_RESULTS = {
    data: [] as any[],
    errors: [],
    meta: {},
};

const TransactionsPage = () => {
    const { onOpen } = useNewTransaction();

    const [AccountDialog, confirm] = useSelectAccount();

    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS);
        setVariant(VARIANTS.LIST);
    }



    const deleteBulkTransactions = useBulkDeleteTransactions();
    const createTransactions = useBulkCreateTransactions();

    const transactionsQueries = useGetTransactions();
    const transactions = transactionsQueries.data || [];
    const isLoading = transactionsQueries.isLoading;

    const isDisabled =
        transactionsQueries.isLoading ||
        deleteBulkTransactions.isPending;

    const onSubmitImport = async (
        values: Omit<Transactions, "id">[],
    ) => {
        const accountId = await confirm();

        if (!accountId) {
            return toast.error("Please select an account to continue.")
        }

        const data = values.map((values) => ({
            ...values,
            accountId: accountId as string,
        }));

        createTransactions.mutate(data as any, {
            onSuccess: () => {
                onCancelImport();
            }
        })
    }

    if (variant === VARIANTS.IMPORT) {
        return (
            <>
                <AccountDialog />
                <ImportCard
                    data={importResults.data}
                    onCancel={onCancelImport}
                    onSubmit={onSubmitImport} // Corrected prop name here
                />
            </>
        )
    }

    return (
        <>
            <main className="mx-4 pb-20">
                <div className="min-h-[50vh] max-w-[1200px] mx-auto rounded-md -mt-20 bg-white shadow-md p-6">
                    <div className="flex md:flex-row flex-col items-center justify-between space-y-3">
                        <h2 className="text-2xl font-bold self-start">
                            Transactions Page
                        </h2>
                        <div className="flex md:flex-row flex-col md:w-auto w-full items-center gap-3">
                            <Button
                                size="sm"
                                onClick={onOpen}
                                className="flex items-center w-full md:w-auto gap-x-2 bg-black text-white text-sm font-bold"
                                disabled={isLoading}
                            >
                                <Plus className="size-4" />
                                Add new
                            </Button>

                            <UploadButton
                                onUpload={onUpload}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {isLoading ?
                        <DataTableSkeleton /> :
                        <DataTable
                            columns={columns}
                            data={transactions as Transactions[] | any}
                            filters="payee"
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
