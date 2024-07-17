"use server"

import { z } from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TransactionSchema } from "@/schema";
import { convertAmountToMiliunits } from "@/lib/utils";

type FormValues = z.infer<typeof TransactionSchema>;

export const createTransaction = async (values: FormValues) => {
    const user = await currentUser();

    if (!user) {
        return { error: "You are not authorized to access this page" };
    }

    const validateFields = TransactionSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields", issues: validateFields.error.errors };
    }

    const validateData = validateFields.data;

    if (!validateData.date || !validateData.payee || !validateData.amount || !validateData.accountId) {
        return { error: "All required fields must be provided" };
    }

    await db.transactions.create({
        data: {
            ...validateData,
            amount: parseFloat(validateData.amount),
        }
    });

    return { success: "Transaction created successfully" };
};
