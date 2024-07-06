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
import { NewCategorySchema } from "@/schema";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { Loader2 } from "lucide-react";

import { CategorySkeleton } from "@/features/categories/components/skeleton/category-skeleton";

type FormValues = z.input<typeof NewCategorySchema>;

export const NewCategorySheet = () => {
    const { isOpen, onClose } = useNewCategory();

    const mutation = useCreateCategory();
    const categoriesQuery = useGetCategories();
    const isLoading = categoriesQuery.isLoading;

    const form = useForm<FormValues>({
        resolver: zodResolver(NewCategorySchema),
        defaultValues: {
            name: "",
        },
        mode: "onChange",
    });

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
                form.reset()
            }
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="bg-white space-y-4">
                <SheetHeader>
                    <SheetTitle>New Category</SheetTitle>
                    <SheetDescription>
                        Create a new category to track your transactions.
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
                                                    disabled={mutation.isPending}
                                                    placeholder="e.g Food, Travel, etc"
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
                                            <p>Create category</p>
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


