"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

type IParams = {
    id: string;
}

export const getCategory = async ({ id }: IParams) => {
    try {
        const user = await currentUser();

        if (!user) {
            return { error: "Unauthorized" }
        }

        const category = await db.categories.findUnique({
            where: {
                id,
            },
        });
        return category;
    } catch (error) {
        console.error("Error fetching category:", error);
        throw new Error("Error fetching category");
    }
};
