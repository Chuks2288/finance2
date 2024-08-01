import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, QueryClient } from '@tanstack/react-query';
import { newPassword } from '@/actions/user/new-password';
import { toast } from "sonner";

type Props = {
    token: string | null,
}

export const useNewPassword = ({ token }: Props) => {
    const queryClient = new QueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (values: any) => newPassword(values, token),
        onSuccess: (data) => {
            if (data?.success) {
                toast.success(data.success);
                router.push("/auth/login");
            }

            if (data?.error) {
                toast.error(data.error);
            }

            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    });

    return mutation;
};
