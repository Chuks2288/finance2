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

import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { EditCategorySchema, NewCategorySchema } from "@/schema";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { Loader2, Trash } from "lucide-react";
import { CategorySkeleton } from "@/features/categories/components/skeleton/category-skeleton";
import { useOpenCategory } from "../hooks/use-open-category";
import { useGetCategories } from "../api/use-get-categories";
import { useGetCategory } from "../api/use-get-category";
import { useEditCategory } from "../api/use-edit-category";
import { useEffect, useState } from "react";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteCategory } from "../api/use-delete-category";

type FormValues = z.input<typeof EditCategorySchema>;


export const EditCategoriesheet = () => {
    const { isOpen, onClose, id } = useOpenCategory();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this category"
    )

    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);
    const categoryQuery = useGetCategory(id);

    const category = categoryQuery.data;

    const isLoading = categoryQuery.isLoading;
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


    const form = useForm<FormValues>({
        resolver: zodResolver(EditCategorySchema),
        defaultValues: {
            name: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (category && !("error" in category)) {
            form.reset({ name: category.name });
        }
    }, [category, form]);


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
                        <SheetTitle>Edit Category</SheetTitle>
                        <SheetDescription>
                            Edit your category to track your transactions.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ?
                        <div>
                            <CategorySkeleton />
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
                                                        placeholder="e.g Food, Travel"
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
                                                    Delete category
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


