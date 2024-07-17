import { z } from "zod";
import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";

import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { TransactionSchema } from "@/schema";
import { TransactionSkeleton } from "./skeleton/transaction-skeleton";

import { useConfirm } from "@/hooks/use-confirm";
import { TransactionForm } from "./transaction-form";

type FormValues = z.input<typeof TransactionSchema>;

export const EditTransactionSheet = () => {
    const { isOpen, onClose, id } = useOpenTransaction();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this account"
    );

    const transactionQuery = useGetTransaction(id);
    const editMutation = useEditTransaction(id);
    const deleteMutation = useDeleteTransaction(id);

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();
    const onCreateCategory = (name: string) => categoryMutation.mutate({ name });

    let categoryOptions: { label: string; value: string }[] = [];
    if (Array.isArray(categoryQuery.data)) {
        categoryOptions = categoryQuery.data.map((category) => ({
            label: category.name,
            value: category.id,
        }));
    }

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => accountMutation.mutate({ name });

    let accountOptions: { label: string; value: string }[] = [];
    if (Array.isArray(accountQuery.data)) {
        accountOptions = accountQuery.data.map((account) => ({
            label: account.name,
            value: account.id,
        }));
    }

    const isPending =
        editMutation.isPending ||
        deleteMutation.isPending ||
        transactionQuery.isPending ||
        categoryMutation.isPending ||
        accountMutation.isPending;

    const isLoading =
        transactionQuery.isLoading ||
        categoryQuery.isLoading ||
        accountQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(
            { ...values, id },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    const onDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    const defaultValues = transactionQuery.data && !("error" in transactionQuery.data)
        ? {
            accountId: transactionQuery.data.accountId,
            categoryId: transactionQuery.data.categoryId,
            amount: transactionQuery.data.amount.toString(),
            date: transactionQuery.data.date
                ? new Date(transactionQuery.data.date)
                : new Date(),
            payee: transactionQuery.data.payee,
            notes: transactionQuery.data.note,
        }
        : {
            accountId: "",
            categoryId: "",
            amount: "",
            date: new Date(),
            payee: "",
            notes: "",
        };

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Transaction</SheetTitle>
                        <SheetDescription>Edit an existing Transaction.</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div>
                            <TransactionSkeleton />
                        </div>
                    ) : (
                        <div>
                            <TransactionForm
                                id={id}
                                defaultValues={defaultValues}
                                onSubmit={onSubmit}
                                onDelete={onDelete}
                                disabled={isPending}
                                categoryOptions={categoryOptions}
                                onCreateCategory={onCreateCategory}
                                accountOptions={accountOptions}
                                onCreateAccount={onCreateAccount}
                            />
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
};
