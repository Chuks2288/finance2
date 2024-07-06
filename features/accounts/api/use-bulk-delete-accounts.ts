import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteAccounts } from "@/actions/accounts/bulk-delete-accounts";
import { toast } from "sonner";

export const useBulkDeleteAccounts = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: bulkDeleteAccounts,
        onSuccess: (data) => {
            if (data?.success) {
                toast.success(data.success);
            }

            if (data?.error) {
                toast.error(data.error);
            }

            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    });

    return mutation;
};
