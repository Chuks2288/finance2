"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useCreateStripeUrl } from "@/features/stripe/api/use-create-stripe";

export const ProModal = () => {

    const { isOpen, onClose } = useProModal();

    const { mutate: onUpgrade, isPending } = useCreateStripeUrl();

    const onClickUpgrade = () => {
        onUpgrade();
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <div className="aspect-video relative flex items-center justify-center">
                    <Image
                        src="/hero.svg"
                        alt="Hero"
                        className="object-cover"
                        fill
                    />
                </div>
                <div className="text-neutral-700 mx-auto space-y-6 p-6">
                    <h2 className="font-semibold text-xl">
                        Upgrade to Finance Pro Today!
                    </h2>
                    <p className="text-xs font-semibold text-neutral-600">
                        Explore the best of Finance
                    </p>
                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Unlimited boards</li>
                            <li>Advanced checklists</li>
                            <li>Admin and security features</li>
                            <li>And more!</li>
                        </ul>
                    </div>
                    <Button
                        disabled={isPending}
                        onClick={onClickUpgrade}
                        className="w-full"
                    // variant="primary"
                    >
                        Upgrade
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

