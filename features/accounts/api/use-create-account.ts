
import {
    useMutation,
    QueryClient,
    useQueryClient,
} from '@tanstack/react-query';

import { createAccount } from '@/actions/accounts/create-account';
import { toast } from "sonner";

export const useCreateAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createAccount,
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