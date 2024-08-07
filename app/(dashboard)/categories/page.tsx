"use client";

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { columns } from "./_components/columns"
import { DataTable } from "@/components/data-table"
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

const CategoriesPage = () => {
    const { onOpen } = useNewCategory();

    const deleteBulkCategories = useBulkDeleteCategories();

    const categoriesQuery = useGetCategories();
    const categories = categoriesQuery.data || [];
    const isLoading = categoriesQuery.isLoading;

    const isDisabled =
        categoriesQuery.isLoading ||
        deleteBulkCategories.isPending;

    return (
        <>
            <main className="mx-4 pb-20">
                <div className="min-h-[50vh] max-w-[1200px] mx-auto rounded-md -mt-20 bg-white shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">
                            Categories Page
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
                        <DataTableSkeleton /> :
                        <DataTable
                            columns={columns}
                            data={categories as any}
                            filters="name"
                            onDelete={(rows) => {
                                const ids = rows.map((r) => r.original.id);
                                deleteBulkCategories.mutate(ids);
                            }}
                            disabled={isDisabled}
                        />
                    }
                </div>
            </main>
        </>
    )
}

export default CategoriesPage;
