"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EditAccountSchema } from "@/schema";
import { z } from "zod";

type FormValues = z.infer<typeof EditAccountSchema>;

export const editAccount = async (id: string, values: FormValues) => {

    const user = await currentUser();

    if (!user) {
        return { error: "You are authorized to access this page" }
    }

    const validateFields = EditAccountSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" }
    }

    const { name } = validateFields.data;

    if (!id || !name) {
        return { error: "No id and name" }
    }


    await db.accounts.update({
        where: {
            id,
        },
        data: {
            name,
        }
    });

    return { success: "Your Account has been edited successfully" };
};
