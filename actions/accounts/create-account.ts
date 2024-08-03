"use server";

import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NewAccountSchema } from "@/schema";
import { z } from "zod";

type FormValues = z.infer<typeof NewAccountSchema>;

export const createAccount = async (
    values: FormValues
) => {

    const userAuth = await auth();
    const user = await currentUser();

    // if (!user) {
    //     return redirect("/auth/login");
    // }

    // if (!user) {
    //     return { error: "You are not authorized to access this page" }
    // }

    const validateFields = NewAccountSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" };
    }

    const { name } = validateFields.data;

    if (!name) {
        return { error: "Name is required" }
    }

    await db.accounts.create({
        data: {
            name
        }
    })

    return { success: "Account Created successfully" }
}