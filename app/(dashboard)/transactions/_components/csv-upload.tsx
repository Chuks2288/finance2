import { Upload } from "lucide-react"
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";
import { useCreateStripeUrl } from "@/features/stripe/api/use-create-stripe";

type Props = {
    onUpload: (results: any) => void;
    disabled: boolean;
    isPro: boolean;
}
export const CsvUpload = ({
    onUpload,
    disabled,
    isPro,
}: Props) => {
    const { CSVReader } = useCSVReader();

    const { mutate: onUpgrade, isPending } = useCreateStripeUrl();

    // TODO: Add a paywall
    // const onUploadClick = () {

    // }

    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({ getRootProps }: any) => (
                <Button
                    size="sm"
                    className="w-full lg:w-auto"
                    {...getRootProps()}
                // disabled={disabled}
                >
                    <Upload className="size-4 mr-2" />
                    import
                </Button>
            )}
        </CSVReader>
    )
}

