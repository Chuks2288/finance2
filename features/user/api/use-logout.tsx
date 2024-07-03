import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/actions/user/logout';
import { toast } from 'sonner';

import { redirect, useRouter } from 'next/navigation';

const user = "@/actions/user"
export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            toast.success('Logged out successfully');
            queryClient.invalidateQueries({ queryKey: [user] });

        },
        onError: () => {
            toast.error('Failed to log out');
        }
    });

    return mutation;
};
