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

    const validateData = validateFields.data;

    if (!validateData.date || !validateData.payee || !validateData.amount || !validateData.accountId) {
        return { error: "All required fields must be provided" };
    }

    try {
        await db.transactions.update({
            where: {
                id
            },
            data: {
                ...validateData,
                amount: parseFloat(validateData.amount),
            }
        });

        return { success: "Your transaction has been updated successfully." };
    } catch (error) {
        console.error("Error updating transaction:", error);
        return { error: "An error occurred while updating the transaction." };
    }
};
