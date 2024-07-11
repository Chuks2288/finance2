"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Actions } from "./actions"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns"
import { CategoryColumn } from "./category-column"
import { Transactions } from "@prisma/client"
import { formatCurrency } from "@/lib/utils"
import { AccountColumn } from "./account-column"
import { Badge } from "@/components/ui/badge";


export const columns: ColumnDef<Transactions>[] = [
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
        accessorKey: "Date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.getValue("date") as Date;

            return (
                <span>
                    {format(date, "dd MMM, yyyy")}
                </span>
            )
        }
    },
    {
        accessorKey: "Category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <CategoryColumn
                id={row.original.id}
                category={row.original.category}
                categoryId={row.original.categoryId}
            />
        )
    },
    {
        accessorKey: "Payee",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Payee
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <span>
                {row.original.payee}
            </span>
        )
    },
    {
        accessorKey: "Amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));

            return (
                <Badge
                    variant={amount < 0 ? "destructive" : "primary"}
                    className="text-xs font-medium px-3.5 py-2.5"
                >
                    {formatCurrency(amount)}
                </Badge>
            )
        }
    },
    {
        accessorKey: "Account",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Account
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <AccountColumn
                row={row.original.id}
                account={row.original.account}
                accountId={row.original.accountId}
            />
        )
    },
    {
        id: "actions",
        cell: ({ row }) => <Actions id={row.original.id} />
    },

]
