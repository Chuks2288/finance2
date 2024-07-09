
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { deleteTransaction } from '@/actions/transactions/delete-transaction';


import { toast } from "sonner";

export const useDeleteTransaction = (id: any) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => deleteTransaction(id),
        onSuccess: (data) => {

            if (data?.success) {
                toast.success(data.success);
            }

            if (data?.error) {
                toast.error(data.error)
            }

            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['transactions', { id }] });
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    return mutation;
}