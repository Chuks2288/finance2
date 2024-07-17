"use client";

import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet"
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"

import { NewCategorySheet } from "@/features/categories/components/new-category-sheet"
import { EditCategorysheet } from "@/features/categories/components/edit-category-sheet"

import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet"
import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-sheet"


export const SheetProvider = () => {
    return (
        <>
            <NewAccountSheet />
            <EditAccountSheet />

            <NewCategorySheet />
            <EditCategorysheet />

            <NewTransactionSheet />
            <EditTransactionSheet />
        </>
    )
}

