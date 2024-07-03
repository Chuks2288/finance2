
import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schema";
import { getUserByEmail } from "./lib/user";
import type { NextAuthConfig } from "next-auth";
// import Resend from "next-auth/providers/resend"

import bcrypt from "bcryptjs";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            authorize: async (credentials) => {
                const validateFields = LoginSchema.safeParse(credentials);

                if (validateFields.success) {
                    const { email, password } = validateFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (passwordsMatch) return user;
                }

                return null;
            }
        })
    ],
} satisfies NextAuthConfig