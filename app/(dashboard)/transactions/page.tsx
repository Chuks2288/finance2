"use client";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts"

const TransactionsPage = () => {
    const accountsQuery = useGetAccounts();
    const accounts = accountsQuery.data || [];

    return (
        <main className="mx-4 pb-20">
            <div className="min-h-[50vh] max-w-[1200px] mx-auto  rounded-md -mt-20 bg-white shadow-md p-6">
                love
            </div>

            {/* {accounts?.map((account) => (
                <div>
                    {account?.name as any}
                </div>
            ))} */}
        </main>
    )
}



export default TransactionsPage