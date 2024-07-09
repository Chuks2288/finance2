"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db"


export const getTransactions = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Unauthorized" }
        }
        const transactions = await db.transactions.findMany({
            orderBy: {
                createdAt: 'desc', // or any other date field you want to use
            }
        });
        return transactions;
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
}
