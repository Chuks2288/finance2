"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";


export const deleteAccount = async (id: string) => {
    const user = await currentUser();

    if (!user) {
        return { error: "You are not authorized to access this page" };
    }

    await db.accounts.delete({
        where: {
            id
        },

    });

    return { success: "Your account has been deleted" };

};
