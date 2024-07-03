
import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"

import { getUserByEmail, getUserById } from "@/lib/user"

declare module "next-auth" {
    interface User {
        name?: string | null,
        email?: string | null,
        password?: string | null,
    }
}

declare module "@auth/core/adapters" {
    interface adapterUser {
        name?: string | null,
        email?: string | null,
        password?: string | null,
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            // const domainUser = user.email?.endsWith("@chuks.com")

            // if (domainUser) return true

            const existingUser = await getUserById(user.id);

            return existingUser ? true : false;

        },


        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.password = token.password as string;
            }

            if (session.user) {
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.password = token.password as string;
            }

            return session
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.email = existingUser.email;
            token.name = existingUser.name;
            token.password = existingUser.password;

            return token;
        }
    },
    // @ts-ignore
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
        // maxAge: 30,
    },
    ...authConfig,
})
