
import {
    useMutation,
    QueryClient,
    useQueryClient,
} from '@tanstack/react-query';

import { createCategory } from '@/actions/categories/create-category';
import { toast } from "sonner";

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createCategory,
        onSuccess: (data) => {

            if (data?.success) {
                toast.success(data.success);
            }

            if (data?.error) {
                toast.error(data.error)
            }

            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    return mutation;
}