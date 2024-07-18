import { Button } from "@/components/ui/button";
import { TransactionSchema } from "@/schema";

type Props = {
    data: typeof TransactionSchema._input[];
    onCancel: () => void;
    onSubmit: (data: typeof TransactionSchema._input[]) => void;
};

export const ImportCard = ({
    data,
    onCancel,
    onSubmit
}: Props) => {
    return (
        <main className="mx-4 pb-20">
            <div className="min-h-[50vh] max-w-[1200px] mx-auto rounded-md -mt-20 bg-white shadow-md p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        Import Transactions
                    </h2>
                    <div className="flex items-center gap-x-2">
                        <Button
                            onClick={onCancel}
                            className="flex items-center gap-x-2 bg-black text-white text-sm font-bold"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

