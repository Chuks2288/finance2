"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NewCategorySchema } from "@/schema";
import { z } from "zod";

type FormValues = z.infer<typeof NewCategorySchema>;

export const createCategory = async (
    values: FormValues
) => {

    const user = await currentUser();

    // if (!user) {
    //     return redirect("/auth/login");
    // }

    if (!user) {
        return { error: "You are authorized to access this page" }
    }

    const validateFields = NewCategorySchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" };
    }

    const { name } = validateFields.data;

    if (!name) {
        return { error: "Name is required" }
    }

    await db.categories.create({
        data: {
            name
        }
    })

    return { success: "Category Created successfully" }
}