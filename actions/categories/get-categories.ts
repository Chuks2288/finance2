"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db"


export const getCategories = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Unauthorized" }
        }
        const categories = await db.categories.findMany({
            orderBy: {
                createdAt: 'desc', // or any other date field you want to use
            }
        });
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
