import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStripeUrl } from '@/actions/stripe/user-subscription';
import { toast } from "sonner";


export const useCreateStripeUrl = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            return await createStripeUrl();
        },
        onSuccess: (data) => {
            if (data?.data) {
                window.location.href = data.data;
            }
        },
        onError: () => {
            toast.error("Something went wrong");
        },
    });

    return mutation;
};
