import { Upload } from "lucide-react"
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";
import { useCreateStripeUrl } from "@/features/stripe/api/use-create-stripe";
import { useProModal } from "@/hooks/use-pro-modal";
import { useEffect, useState } from "react";
import { hasActiveSubscription } from "@/lib/queries";

type Props = {
    onUpload: (results: any) => void;
    disabled: boolean;
}
export const UploadButton = ({
    onUpload,
    disabled,
}: Props) => {
    const { CSVReader } = useCSVReader();
    const [isPro, setisPro] = useState(false);

    const { onOpen } = useProModal();

    const { mutate: onUpgrade, isPending } = useCreateStripeUrl();

    useEffect(() => {
        const checkSubscription = async () => {
            const isActive = await hasActiveSubscription();
            setisPro(isActive);
        };

        checkSubscription();
    }, []);

    // TODO: Add a paywall
    const onUploadClick = () => {
        if (isPro) {
            return null;
        } else {
            onOpen();
        }
    }

    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({ getRootProps }: any) => (
                <Button
                    size="sm"
                    className="w-full lg:w-auto"
                    {...getRootProps()}
                    disabled={disabled}
                    onClick={onUploadClick}
                >
                    <Upload className="size-4 mr-2" />
                    import
                </Button>
            )}
        </CSVReader>
    )
}

