"use server";

import { z } from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TransactionSchema } from "@/schema";

type FormValues = z.infer<typeof TransactionSchema>;

export const editTransaction = async (id: string, values: FormValues) => {
    const user = await currentUser();

    if (!user) {
        return { error: "You are not authorized to access this page" };
    }

    const validateFields = TransactionSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" };
    }

    const { date, payee, amount, note, categoryId, accountId } = validateFields.data;

    if (!date || !payee || amount == null || !accountId) {
        return { error: "All required fields must be provided" };
    }

    try {
        const existingTransaction = await db.transactions.findUnique({
            where: { id },
        });

        if (!existingTransaction) {
            return { error: "Transaction not found" };
        }

        await db.transactions.update({
            where: { id },
            data: {
                date,
                payee,
                // categoryId,
                // accountId,
                amount,
                note,
            },
        });

        return { success: "Your transaction has been updated" };
    } catch (error) {
        console.error("Error updating transaction:", error);
        return { error: "An error occurred while updating the transaction" };
    }
};
