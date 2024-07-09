
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { editTransaction } from '@/actions/transactions/edit-transaction';


import { toast } from "sonner";

export const useEditTransaction = (id: any) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (values: any) => editTransaction(id, values),
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