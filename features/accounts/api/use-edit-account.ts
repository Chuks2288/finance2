
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { editAccount } from '@/actions/accounts/edit-account';


import { toast } from "sonner";

export const useEditAccount = (id: any) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (values: any) => editAccount(id, values),
        onSuccess: (data) => {

            if (data?.success) {
                toast.success(data.success);
            }

            if (data?.error) {
                toast.error(data.error)
            }

            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    return mutation;
}