import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import { User } from "@prisma/client";
import { createLinkToken, exchangePublicToken } from "@/lib/plaid";

type Props = {
    disabled: boolean;
    user: User;
    isPro: boolean;
}

export const PlaidLink = ({
    disabled,
    user,
    isPro,
}: Props) => {
    const router = useRouter();
    const [token, setToken] = useState("");

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        });
        router.push("/");
    }, [user]);

    const config: PlaidLinkOptions = {
        token,
        onSuccess,
    }

    const { open, ready } = usePlaidLink(config);

    return (
        <>
            <Button
                onClick={() => open()}
                className={cn(
                    "border-2 rounded-sm bg-rose-500 hover:bg-red-400 focus:bg-rose-400",
                )}
            // disabled={!ready}
            >
                Connect
            </Button>
        </>
    )
}

