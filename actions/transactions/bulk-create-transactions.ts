"use server";

import { z } from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TransactionSchema } from "@/schema";
// import { convertAmountToMiliunits } from "@/lib/utils";

type FormValues = z.infer<typeof TransactionSchema>[];

export const bulkCreateTransactions = async (values: FormValues) => {
    const user = await currentUser();

    if (!user) {
        return { error: "You are not authorized to access this page" };
    }

    const validateFields = values.map((value) => TransactionSchema.safeParse(value));

    // const invalidFields = validateFields.filter(result => !result.success);

    // if (invalidFields.length > 0) {
    //     return { error: "Invalid fields", issues: invalidFields.map(result => result.error.errors) };
    // }
    if (!validateFields) {
        return { error: "Invalid fields" };
    }

    const validData = validateFields.filter(result => result.success).map(result => result.data);

    const requiredFieldsMissing = validData.some(data => !data.date || !data.payee || !data.amount || !data.accountId);

    if (requiredFieldsMissing) {
        return { error: "All required fields must be provided" };
    }

    await db.transactions.createMany({
        data: validData.map(data => ({
            ...data,
            amount: parseFloat(data.amount),
            userId: user.id,
        })),
    });

    return { success: "Transactions created successfully" };
};