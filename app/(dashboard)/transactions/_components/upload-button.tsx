import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { activeSubscripton } from "@/lib/queries"; // Assuming this is a boolean indicating if the user has an active subscription
import { ProModal } from "@/components/modal/pro-modal";

type Props = {
    onUpload: (results: any) => void;
}

export const UploadButton = ({ onUpload }: Props) => {
    const { CSVReader } = useCSVReader();
    const [showProModal, setShowProModal] = useState(false);

    const isPro = activeSubscripton;

    const handleUploadClick = () => {
        if (!isPro) {
            setShowProModal(true);
        } else {
            // Allow the CSV upload
            const uploadButton = document.getElementById('csv-upload-button');
            if (uploadButton) {
                uploadButton.click();
            }
        }
    };

    return (
        <div>
            <CSVReader onUploadAccepted={onUpload}>
                {({ getRootProps }: any) => (
                    <Button
                        id="csv-upload-button"
                        size="sm"
                        className="w-full lg:w-auto"
                        {...getRootProps()}
                        onClick={handleUploadClick}
                    >
                        <Upload className="size-4 mr-2" />
                        Import
                    </Button>
                )}
            </CSVReader>
            {showProModal && !isPro && (
                <ProModal />
            )}
        </div>
    );
}
