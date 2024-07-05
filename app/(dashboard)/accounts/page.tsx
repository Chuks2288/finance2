"use client";

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { columns } from "./_components/columns"
import { DataTable } from "@/components/data-table"

import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { DataTableSkeleton } from "@/components/data-table-skeleton";


const AccountsPage = () => {

    const { onOpen } = useNewAccount();

    const accountsQuery = useGetAccounts();
    const accounts = accountsQuery.data || [];
    const isLoading = accountsQuery.isLoading;

    return (
        <main className="mx-4 pb-20">
            <div className="min-h-[50vh] max-w-[1200px] mx-auto  rounded-md -mt-20 bg-white shadow-md p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        Accounts Page
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
                    <>
                        <DataTableSkeleton />
                    </> :
                    <>
                        <DataTable
                            columns={columns}
                            data={accounts}
                            filters="name"
                        />
                    </>
                }
            </div>
        </main>
    )
}

export default AccountsPage