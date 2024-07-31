
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { deleteAccount } from '@/actions/accounts/delete-account';


import { toast } from "sonner";

export const useDeleteAccount = (id: any) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => deleteAccount(id),
        onSuccess: (data) => {

            if (data?.success) {
                toast.success(data.success);
            }

            if (data?.error) {
                toast.error(data.error)
            }

            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            queryClient.invalidateQueries({ queryKey: ['accounts', { id }] });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['summary'] });
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    return mutation;
}