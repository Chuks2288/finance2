
import { useRouter, useSearchParams } from 'next/navigation';
import {
    useMutation,
    QueryClient,
} from '@tanstack/react-query';

import { reset } from '@/actions/user/reset';

import { toast } from "sonner";

export const useResetPassword = () => {
    const queryClient = new QueryClient();

    const mutation = useMutation({
        mutationFn: reset,
        onSuccess: (data) => {

            if (data?.success) {
                toast.success(data.success);
            }

            if (data?.error) {
                toast.error(data.error)
            }

            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    return mutation;
}