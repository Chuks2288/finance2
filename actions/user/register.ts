// "use server";

// import { z } from "zod";
// import bcrypt from "bcryptjs";

// import { RegisterSchema } from "@/schema";
// import { getUserByEmail } from "@/lib/user";
// import { db } from "@/lib/db";
// import { RegisterWelcomeMessageEmail } from "@/lib/mail";


// type FormValues = z.infer<typeof RegisterSchema>

// export const register = async (values: FormValues) => {
//     const validateFields = RegisterSchema.safeParse(values);

//     if (!validateFields.success) {
//         return { error: "Invalid fields" }
//     }

//     const { name, email, password } = validateFields.data;

//     // if (!email.endsWith("@chuks.com")) {
//     //     return { error: "This is not a company domain" };
//     // }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     if (!name || !email || !password) {
//         return { error: "Fill out the field correctly" }
//     }

//     const existingUserByEmail = await getUserByEmail(email)

//     if (existingUserByEmail) {
//         return { error: "Email already in use" }
//     }


//     await db.user.create({
//         data: {
//             name,
//             email,
//             password: hashedPassword
//         }
//     });

//     await RegisterWelcomeMessageEmail(
//         email
//     )

//     return { success: "You have successfull created your account" }
// }

"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schema";
import { getUserByEmail } from "@/lib/user";
import { db } from "@/lib/db";
import { RegisterWelcomeMessageEmail } from "@/lib/mail";
import { extractCustomerIdFromUrl } from "@/lib/utils";
import { createDwollaCustomer } from "@/lib/dwolla";

type FormValues = z.infer<typeof RegisterSchema>

export const register = async (values: FormValues) => {
    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" }
    }

    const { name, email, password } = validateFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name || !email || !password) {
        return { error: "Fill out the field correctly" }
    }

    const existingUserByEmail = await getUserByEmail(email);

    if (existingUserByEmail) {
        return { error: "Email already in use" }
    }

    // Create new user account
    const newUserAccount = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    if (!newUserAccount) {
        throw new Error("Error creating user");
    }

    // Create Dwolla customer
    const dwollaCustomerUrl = await createDwollaCustomer({
        name: newUserAccount.name,
        email: newUserAccount.email,
        type: "personal"
    });

    if (!dwollaCustomerUrl) {
        throw new Error("Error creating Dwolla customer");
    }

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    // Update user with Dwolla customer ID and URL
    await db.user.update({
        where: { id: newUserAccount.id },
        data: {
            dwollaCustomerId,
            dwollaCustomerUrl
        }
    });

    await RegisterWelcomeMessageEmail(email);

    return { success: "You have successfully created your account" }
}
