import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


export const useConfirm = (
    title: string,
    message: string,
): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve })
    });

    const handleClose = () => {
        setPromise(null);
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    }

    const ConfirmDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent className="bg-white space-y-4">
                <DialogHeader className="flex flex-col items-center justify-center">
                    <DialogTitle className="text-red-500 text-xl">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-base">
                        {message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex items-center gap-3">
                    <Button
                        size="sm"
                        onClick={handleCancel}
                        variant="outline"
                        className="w-full"
                    >
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleConfirm}
                        className="w-full text-red-600"
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return [ConfirmDialog, confirm]
}