import NextAuth from "next-auth";
import google from "next-auth/providers/google";

export { GET, POST } from "@/auth";// Referring to the auth.ts we just created
// export const { GET, POST } = handlers

// export const { handlers, auth, signIn, signOut } = NextAuth({
//     providers: [
//         google({
//             authorization: {
//                 params: {
//                     prompt: "consent",
//                     access_type: "offline",
//                     response_type: "code",
//                 },
//             },
//         }),
//     ],
// })