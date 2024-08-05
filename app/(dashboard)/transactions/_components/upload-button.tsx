"use client";

import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { hasActiveSubscription } from "@/lib/queries";

type Props = {
    onUpload: (results: any) => void;
    disabled: boolean;
};

export const UploadButton = ({
    onUpload,
    disabled
}: Props) => {
    const { CSVReader } = useCSVReader();
    const [isPro, setisPro] = useState(false);

    const { onOpen } = useProModal();

    useEffect(() => {
        const checkSubscription = async () => {
            const isActive = await hasActiveSubscription();
            setisPro(isActive);
        };

        checkSubscription();
    }, []);

    const onUploadClick = () => {
        if (isPro) {
            return null;
        } else {
            onOpen();
        }
    };

    // TODO: Complete this payment wall, it's not fully functional yet

    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({ getRootProps }: any) => (
                <Button
                    size="sm"
                    className="w-full lg:w-auto"
                    {...getRootProps()}
                    onClick={onUploadClick}
                // disabled={disabled}
                >
                    <Upload className="size-4 mr-2" />
                    Import
                </Button>
            )}
        </CSVReader>
    );
};
