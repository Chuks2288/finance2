"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EditCategorySchema } from "@/schema";
import { z } from "zod";

type FormValues = z.infer<typeof EditCategorySchema>;

export const editCategory = async (id: string, values: FormValues) => {
    const user = await currentUser();

    if (!user) {
        return { error: "You are not authorized to access this page" };
    }

    const validateFields = EditCategorySchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" };
    }

    const { name } = validateFields.data;

    if (!id || !name) {
        return { error: "No id and name" };
    }

    try {
        const existingCategory = await db.categories.findUnique({
            where: { id },
        });

        if (!existingCategory) {
            return { error: "Category not found" };
        }

        if (existingCategory.name === name) {
            return { error: "The new name must be different from the current name" };
        }

        await db.categories.update({
            where: { id },
            data: { name },
        });

        return { success: "Your category has been updated" };
    } catch (error) {
        console.error("Error updating category:", error);
        return { error: "An error occurred while updating the category" };
    }
};
