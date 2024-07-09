import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { TransactionSchema } from "@/schema";
import { DatePicker } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/amount-input";
import { SelectOptions } from "@/components/select-options";

type FormValues = z.input<typeof TransactionSchema>;

type Props = {
    id?: string;
    onSubmit: (values: FormValues) => void;
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
    accountOptions: { label: string; value: string }[];
    categoryOptions: { label: string; value: string }[];
    disabled?: boolean;
};

export const TransactionForm = ({
    id,
    onSubmit,
    onCreateAccount,
    onCreateCategory,
    accountOptions,
    categoryOptions,
    disabled,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(TransactionSchema),
        defaultValues: {
            date: new Date().toISOString().split("T")[0], // Default to today's date
            amount: "",
            payee: "",
            note: "",
            categoryId: "", // Set to ID initially
            accountId: "", // Set to ID initially
        },
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    };

    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-6">
                    <FormField
                        name="date"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <DatePicker
                                        value={new Date(field.value)}
                                        onChange={(date) =>
                                            field.onChange(date?.toISOString().split("T")[0] ?? "")
                                        }
                                        disabled={disabled}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="categoryId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <SelectOptions
                                        placeholder="Select category"
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={categoryOptions}
                                        disabled={disabled}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="accountId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account</FormLabel>
                                <FormControl>
                                    <SelectOptions
                                        placeholder="Select account"
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={accountOptions}
                                        disabled={disabled}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="payee"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payee</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g John Doe"
                                        {...field}
                                        disabled={disabled}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="amount"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <AmountInput
                                        {...field}
                                        // value={field.value}
                                        // onChange={field.onChange}
                                        placeholder="e.g 0.00"
                                        disabled={disabled}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="note"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Note</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Optional note"
                                        {...field}
                                        disabled={disabled}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={disabled}
                    >
                        {id ? "Save changes" : "Create transaction"}
                    </Button>
                    {!!id && (
                        <Button
                            type="button"
                            disabled={disabled}
                            className="w-full"
                            variant="outline"
                        // onClick={handleDelete}
                        >
                            <Trash className="size-4 mr-2" />
                            Delete transaction
                        </Button>
                    )}
                </form>
            </Form>
        </div>
    );
};

