"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { getUserByEmail } from "@/lib/user";
import { LoginSchema } from "@/schema";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

type FormValues = z.infer<typeof LoginSchema>;

export const login = async (
    values: FormValues,
    callbackUrl?: string | null,
) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" };
    }

    const { email, password } = validateFields.data;

    // if (!email.endsWith("@chuks.com")) {
    //     return { error: "This is not a company domain" };
    // }

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist" }
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
        return { error: "Wrong password" }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT || callbackUrl
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
    }

    return { success: "You logged-in successfully" }
}