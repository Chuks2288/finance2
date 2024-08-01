"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schema";
import { getUserByEmail } from "@/lib/user";
import { db } from "@/lib/db";
import { RegisterWelcomeMessageEmail } from "@/lib/mail";


type FormValues = z.infer<typeof RegisterSchema>

export const register = async (values: FormValues) => {
    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" }
    }

    const { name, email, password } = validateFields.data;

    // if (!email.endsWith("@chuks.com")) {
    //     return { error: "This is not a company domain" };
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name || !email || !password) {
        return { error: "Fill out the field correctly" }
    }

    const existingUserByEmail = await getUserByEmail(email)

    if (existingUserByEmail) {
        return { error: "Email already in use" }
    }


    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    await RegisterWelcomeMessageEmail(
        email
    )

    return { success: "You have successfull created your account" }
}