"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { IoCaretForward } from "react-icons/io5";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useLogin } from "@/features/user/api/use-login";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { ResetSchema } from "@/schema";
import { useResetPassword } from "@/features/user/api/use-reset-password";


type FormValues = z.input<typeof ResetSchema>;

export const ForgotPasswordForm = () => {
    const router = useRouter();
    const mutation = useResetPassword();

    const onClick = () => {
        router.push("/auth/login");
    }

    const form = useForm<FormValues>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    });

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values);
    }

    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="lg:border-0 border-2 text-center w-full flex justify-center items-center max-w-lg mx-2 rounded-md p-4">
                <div className="flex flex-col gap-y-2 w-full">
                    <h2 className="font-bold text-xl">
                        Forgot Your Password?
                    </h2>
                    <p className="text-sm">
                        Please input your email to continue
                    </p>
                    <div className="py-5 space-y-3">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    name="email"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-y-1">
                                            <FormLabel className="text-left">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={mutation.isPending}
                                                    placeholder="Input your email"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={!form.formState.isValid || mutation.isPending}
                                    className="bg-blue-500 w-full text-white gap-x-2 flex items-center"
                                >
                                    {mutation.isPending ?
                                        <Loader2 className="size-4 animate-spin" /> :
                                        <>
                                            <p>Continue</p>
                                            < IoCaretForward className="size-3" />
                                        </>
                                    }
                                </Button>
                            </form>
                        </Form>
                        <div className="flex items-center justify-center gap-x-3 text-sm pt-2 font-medium">
                            <p className="text-gray-400">
                                have an account?
                            </p>
                            <span
                                onClick={onClick}
                                className="cursor-pointer"
                            >
                                Sign In
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
