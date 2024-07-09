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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { useNewAccount } from "../hooks/use-new-account"
import { EditAccountSchema, NewAccountSchema } from "@/schema";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { Loader2, Trash } from "lucide-react";
import { AccountSkeleton } from "./skeleton/account-skeleton";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useGetAccounts } from "../api/use-get-transactions";
import { useGetAccount } from "../api/use-get-transaction";
import { useEditAccount } from "../api/use-edit-transaction";
import { useEffect, useState } from "react";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteAccount } from "../api/use-delete-transaction";

type FormValues = z.input<typeof EditAccountSchema>;


export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this account"
    )

    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id);
    const accountQuery = useGetAccount(id);

    const account = accountQuery.data;

    const isLoading = accountQuery.isLoading;
    const isPending =
        deleteMutation.isPending
        || editMutation.isPending;


    const onDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    }

    // const form = useForm<FormValues>({
    //     resolver: zodResolver(EditAccountSchema),
    //     defaultValues: {
    //         name: account && !("error" in account) ? account.name : "",
    //     },
    //     mode: "onChange",
    // });

    const form = useForm<FormValues>({
        resolver: zodResolver(EditAccountSchema),
        defaultValues: {
            name: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (account && !("error" in account)) {
            form.reset({ name: account.name });
        }
    }, [account, form]);


    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
                form.reset();
            }
        });
    }

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="bg-white space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Account</SheetTitle>
                        <SheetDescription>
                            Edit your account to track your transactions.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ?
                        <div>
                            <AccountSkeleton />
                        </div> :
                        <div>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-4 mt-6"
                                >
                                    <FormField
                                        name="name"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-y-1">
                                                <FormLabel className="text-left">
                                                    Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isPending}
                                                        placeholder="e.g Cash, Bank, Credit Card"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="w-full flex flex-col gap-y-2">
                                        <Button
                                            type="submit"
                                            disabled={!form.formState.isValid || isPending}
                                            className="bg-blue-500 w-full text-white gap-x-2 flex items-center"
                                        >
                                            Save Changes
                                        </Button>
                                        {!!id &&
                                            <div>
                                                <Button
                                                    onClick={onDelete}
                                                    type="button"
                                                    disabled={isPending}
                                                    className="bg-blue-500 w-full text-white gap-x-2 flex items-center"
                                                >
                                                    <Trash className="size-4" />
                                                    Delete account
                                                </Button>
                                            </div>
                                        }
                                    </div>
                                </form>
                            </Form>
                        </div>
                    }
                </SheetContent>
            </Sheet >
        </>
    )
}


