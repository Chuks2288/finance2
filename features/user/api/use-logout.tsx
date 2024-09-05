import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/actions/user/logout';
import { toast } from 'sonner';

export const useLogout = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            toast.success('Logged out successfully');
            queryClient.invalidateQueries({ queryKey: ["user"] });

        },
        onError: () => {
            toast.error('Failed to log out');
        }
    });

    return mutation;
};
