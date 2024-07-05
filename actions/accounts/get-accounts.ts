"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db"


export const getAccounts = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Unauthorized" }
        }
        const accounts = await db.accounts.findMany({
            orderBy: {
                createdAt: 'desc', // or any other date field you want to use
            }
        });
        return accounts;
    } catch (error) {
        console.error("Error fetching accounts:", error);
    }
}
