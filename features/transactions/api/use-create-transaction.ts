
import {
    useMutation,
    QueryClient,
    useQueryClient,
} from '@tanstack/react-query';

import { createTransaction } from '@/actions/transactions/create-transaction';
import { toast } from "sonner";

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createTransaction,
        onSuccess: (data) => {

            if (data?.success) {
                toast.success(data.success);
            }

            if (data?.error) {
                toast.error(data.error)
            }

            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['summary'] });
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    return mutation;
}