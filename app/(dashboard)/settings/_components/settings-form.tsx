"use client";

import { useState, useEffect, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import { useCreateStripeUrl } from "@/features/stripe/api/use-create-stripe";
import { hasActiveSubscription } from "@/lib/queries";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createStripeUrl } from "@/actions/stripe/user-subscription";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
    isPro: boolean;
}

export const SettingsForm = ({
    isPro
}: Props) => {

    const [isPending, startTransition] = useTransition();

    const onUpgrade = () => {
        startTransition(() => {
            createStripeUrl()
                .then((response) => {
                    if (response.data) {
                        window.location.href = response.data;
                    }
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }

    return (
        <main className="mx-4 pb-20">
            <div className="space-y-4 min-h-max max-w-[1200px] mx-auto rounded-md -mt-20 bg-white shadow-md p-6">
                <h2 className="text-2xl font-bold">
                    Settings
                </h2>
                <Separator />
                <div className="flex items-center justify-between font-medium text-md">
                    <h3 className="font-bold">
                        Bank account
                    </h3>
                    <h4 className="-ml-10">
                        Bank account Not connected
                    </h4>
                    <Button
                        className={cn(
                            "border-2 rounded-sm bg-rose-500 hover:bg-red-400 focus:bg-rose-400",
                            isPro && "border-2 rounded-sm bg-green-500 hover:bg-green-400 focus:bg-green-400"
                        )}
                        disabled={isPending}
                    >
                        Connect
                    </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium text-md">
                    <h3 className="font-bold">
                        Subscription
                    </h3>
                    <h4>
                        {isPro ? "Active Subscription" : "Inactive Subscription"}
                    </h4>
                    <Button
                        className=""
                        onClick={onUpgrade}
                        disabled={isPending}
                    >
                        Manage Subscription
                    </Button>
                </div>
            </div>
        </main>
    );
}


