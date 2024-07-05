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
import { Loader2 } from "lucide-react";
import { AccountSkeleton } from "./skeleton/account-skeleton";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useGetAccounts } from "../api/use-get-accounts";
import { useGetAccount } from "../api/use-get-account";
import { useEditAccount } from "../api/use-edit-account";

type FormValues = z.input<typeof EditAccountSchema>;

export const EditAccountSheet = (id?: string) => {
    const { isOpen, onClose } = useOpenAccount();

    const mutation = useCreateAccount();
    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);

    const account = accountQuery.data;

    const isLoading = accountQuery.isLoading;

    const form = useForm<FormValues>({
        resolver: zodResolver(EditAccountSchema),
        defaultValues: {
            name: account?.name || "",
        },
        mode: "onChange",
    });

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="bg-white space-y-4">
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions.
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
                                                    disabled={mutation.isPending}
                                                    placeholder="e.g Cash, Bank, Credit Card"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={!form.formState.isValid || mutation.isPending}
                                    className="bg-blue-500 w-full text-white gap-x-2 flex items-center"
                                >
                                    {mutation.isPending ?
                                        <Loader2 className="size-4 animate-spin" /> :
                                        <>
                                            <p>Create account</p>
                                        </>
                                    }

                                </Button>
                            </form>
                        </Form>
                    </div>
                }
            </SheetContent>
        </Sheet>
    )
}


