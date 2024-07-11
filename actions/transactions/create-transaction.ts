"use server"

import { z } from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { convertAmountToMiliunits } from "@/lib/utils";
import { TransactionSchema } from "@/schema";

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

    const { date, payee, amount, note, categoryId, accountId } = validateFields.data;

    if (!date || !payee || amount === null || !accountId) {
        return { error: "All required fields must be provided" };
    }

    // const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    //     day: '2-digit',
    //     month: 'short',
    //     year: 'numeric',
    // });

    await db.transactions.create({
        data: {
            date: new Date(),
            payee,
            amount: convertAmountToMiliunits((parseFloat(amount))),
            note,
            accountId,
            categoryId: categoryId || null,
        }
    });

    return { success: "Transaction created successfully" };
};
