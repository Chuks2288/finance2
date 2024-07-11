"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { useNewTransaction } from "../hooks/use-new-transaction"
import { TransactionSchema } from "@/schema";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Loader2 } from "lucide-react";

import { TransactionSkeleton } from "./skeleton/transaction-skeleton";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { TransactionForm } from "./transaction-form";
import { useState } from "react";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import { Accounts, Categories } from "@prisma/client";
import { useGetTransactions } from "../api/use-get-transactions";

type FormValues = z.input<typeof TransactionSchema>;

export const NewTransactionSheet = () => {
    const { isOpen, onClose } = useNewTransaction();

    // const [isLoading, setIsLoading] = useState(false);

    const transactionMutation = useCreateTransaction();
    const transactionQuery = useGetTransactions();

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();
    const onCreateCategory = (name: string) => categoryMutation.mutate({
        name
    });

    // @ts-ignore
    const categoryOptions = (categoryQuery.data ?? []).map((category: Categories) => ({
        label: category.name,
        value: category.id,
    }));

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => accountMutation.mutate({
        name
    });

    // @ts-ignore
    const accountOptions = (accountQuery.data ?? []).map((account: Accounts) => ({
        label: account.name,
        value: account.id,
    }));

    const isLoading =
        accountQuery.isLoading ||
        categoryQuery.isLoading ||
        transactionQuery.isLoading;

    const isPending = transactionMutation.isPending;

    const onSubmit = (values: FormValues) => {
        transactionMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
        console.log(values);
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="bg-white space-y-4 overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>New Transaction</SheetTitle>
                    <SheetDescription>
                        Create a new transactions.
                    </SheetDescription>
                </SheetHeader>
                {isLoading ?
                    <TransactionSkeleton />
                    :
                    <TransactionForm
                        onSubmit={onSubmit}
                        onCreateAccount={onCreateAccount}
                        onCreateCategory={onCreateCategory}
                        categoryOptions={categoryOptions}
                        accountOptions={accountOptions}
                        disabled={isPending}
                    />
                }
            </SheetContent>
        </Sheet>
    )
}