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
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    payee: z.string().min(1, {
        message: "Payee is required"
    }),
    amount: z.string().min(1, {
        message: "Amount must be greater than zero",
    }),
    note: z.string().optional(),
    accountId: z.string(),
    categoryId: z.string().optional(),
});
