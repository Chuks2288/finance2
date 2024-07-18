import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { bulkCreateTransactions } from '@/actions/transactions/bulk-create-transactions';
import { toast } from "sonner";

export const useBulkCreateTransactions = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: bulkCreateTransactions,
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
        },
    });

    return mutation;
};
