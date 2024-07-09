"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

type IParams = {
    id: string;
}

export const getTransaction = async ({ id }: IParams) => {
    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Unauthorized" }
        }

        const transaction = await db.transactions.findUnique({
            where: {
                id,
            },
        });
        return transaction;
    } catch (error) {
        console.error("Error fetching transaction:", error);
        throw new Error("Error fetching transaction");
    }
};
