"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Actions } from "./actions"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"

import { Categories } from "@prisma/client"

export const columns: ColumnDef<Categories>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <Actions id={row.original.id} />
    },

]
