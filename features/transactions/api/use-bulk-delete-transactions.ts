import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteTransactions } from "@/actions/transactions/bulk-delete-transactions";
import { toast } from "sonner";

export const useBulkDeleteTransactions = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: bulkDeleteTransactions,
        onSuccess: (data) => {
            if (data?.success) {
                toast.success(data.success);
            }

            if (data?.error) {
                toast.error(data.error);
            }

            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    });

    return mutation;
};
