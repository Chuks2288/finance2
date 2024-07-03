"use client";

import { useState } from "react"
import { AvatarProfile } from "./avatar";
import { Separator } from "@/components/ui/separator";
import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/features/user/api/use-logout";
import { useConfirm } from "@/hooks/use-confirm";

type Props = {
    image: string,
    email?: string,
}

export const Profile = ({
    image,
    email,
}: Props) => {
    const router = useRouter();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to logout",
    )

    const { mutate: logout } = useLogout();
    const [isOpen, setIsOpen] = useState(false);

    const onLogout = async () => {
        const ok = await confirm();

        if (ok) {
            logout();
        }
    }


    const onClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="relative">
            <div
                onClick={onClick}
            >
                <AvatarProfile
                    src={image}
                />
            </div>

            {isOpen && (
                <>
                    <ConfirmDialog />
                    <div className="flex flex-col absolute right-4 p-4 space-y-2 min-w-60 bg-white rounded-md">
                        <h4>
                            Profile
                        </h4>

                        <div className="flex items-center gap-x-2 font-medium">
                            <AvatarProfile
                                src={image}
                                className="size-8"
                            />
                            <p className="text-sm self-center">
                                {email}
                            </p>
                        </div>
                        <Separator className="border-[.5px]" />
                        <div
                            onClick={() => router.push("/settings")}
                            className="flex items-center gap-x-8 font-medium cursor-pointer"
                        >
                            <Settings className="size-4" />
                            <p className="text-sm text-left">
                                Settings
                            </p>
                        </div>
                        <Separator className="border-[.5px]" />
                        <div
                            onClick={onLogout}
                            className="flex items-center gap-x-8 font-medium cursor-pointer"
                        >
                            <LogOut className="size-4" />
                            <p className="text-sm">
                                Sign out
                            </p>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

