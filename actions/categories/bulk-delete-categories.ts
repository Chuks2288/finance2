"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const bulkDeleteCategories = async (ids: string[]) => {
    const user = await currentUser();

    if (!user) {
        return { error: "You are not authorized to access this page" };
    }

    if (!Array.isArray(ids) || ids.length === 0) {
        return { error: "No valid IDs provided" };
    }

    await db.categories.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    });

    return { success: "The selected categories have been deleted" };
};
