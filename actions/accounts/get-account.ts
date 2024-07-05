"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

type IParams = {
    id: string;
}

export const getAccount = async ({ id }: IParams) => {
    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Unauthorized" }
        }

        const account = await db.accounts.findUnique({
            where: {
                id,
            },
        });
        return account;
    } catch (error) {
        console.error("Error fetching account:", error);
        throw new Error("Error fetching account");
    }
};
