
import { useRouter, useSearchParams } from 'next/navigation';
import {
    useMutation,
    QueryClient,
} from '@tanstack/react-query';

import { register } from '@/actions/user/register';

import { toast } from "sonner";

export const useRegister = () => {
    const queryClient = new QueryClient();

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {

            if (data?.success) {
                toast.success(data.success);
                router.push("/auth/login")
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