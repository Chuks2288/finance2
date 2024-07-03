"use client";

import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { IoCaretForward } from "react-icons/io5";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useLogin } from "@/features/user/api/use-login";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schema";

import { DEFAULT_LOGIN_REDIRECT } from "@/route";

type FormValues = z.input<typeof LoginSchema>;

const LogInfo = [
    {
        label: "Email",
        name: "email",
        type: "email"
    },
    {
        label: "Password",
        name: "password",
        type: "password",
    },
]

export const LoginForm = () => {
    const mutation = useLogin();
    const router = useRouter();

    const onClick = () => {
        router.push("/auth/register");
    }

    const form = useForm<FormValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values);
    }

    const onClickAuth = (provider: "github" | "google") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="lg:border-0 border-2 text-center w-full flex justify-center items-center max-w-lg mx-2 rounded-md p-4">
                <div className="flex flex-col gap-y-2 w-full">
                    <h2 className="font-bold text-xl">
                        Sign in to finance
                    </h2>
                    <p className="text-sm">
                        Welcome back! Please sign in to continue
                    </p>
                    <div className="flex flex-col w-full space-y-2">
                        <Button
                            disabled={mutation.isPending}
                            onClick={() => onClickAuth("github")}
                            className="flex items-center justify-center w-full border-[1px] p-1.5 rounded-lg gap-x-3 cursor-pointer mt-3"
                        >
                            <FaGithub className="" />
                            <p className="text-sm">Sign in with Github</p>
                        </Button>
                        <Button
                            disabled={mutation.isPending}
                            onClick={() => onClickAuth("google")}
                            className="flex items-center justify-center w-full border-[1px] p-1.5 rounded-lg gap-x-3 cursor-pointer mt-3"
                        >
                            <FcGoogle className="" />
                            <p className="text-sm">Sign in with Google</p>
                        </Button>
                    </div>
                    <div className="py-5 space-y-3">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                {LogInfo.map(({ name, label, type }) => (
                                    <FormField
                                        key={label}
                                        name={name as any}
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-y-1">
                                                <FormLabel className="text-left">
                                                    {label}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={mutation.isPending}
                                                        placeholder=""
                                                        {...field}
                                                        type={type}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                ))}
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
                                Don't have an account?
                            </p>
                            <span
                                onClick={onClick}
                                className="cursor-pointer"
                            >
                                Sign Up
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
