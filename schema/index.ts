import { z } from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Full Name is required",
    }),
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(8, {
        message: "Password is required",
    })
});

export const LoginSchema = z.object({
    email: z.string().min(1, {
        message: "Username is required"
    }),
    password: z.string().min(8, {
        message: "Password is required",
    })
});

export const NewAccountSchema = z.object({
    name: z.string().min(1, {
        message: "Account Name is required",
    }),
});
export const EditAccountSchema = z.object({
    name: z.string().min(1, {
        message: "Account Name is required",
    }),
});

export const NewCategorySchema = z.object({
    name: z.string().min(1, {
        message: "Category Name is required",
    }),
});

export const EditCategorySchema = z.object({
    name: z.string().min(1, {
        message: "Category Name is required",
    }),
});

export const TransactionSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    note: z.string().nullable().optional(),
});

export const ResetSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required",
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(8, {
        message: "Password is required",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must match",
    }),
});