
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { deleteCategory } from '@/actions/categories/delete-category';


import { toast } from "sonner";

export const useDeleteCategory = (id: any) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => deleteCategory(id),
        onSuccess: (data) => {

            if (data?.success) {
                toast.success(data.success);
            }

            if (data?.error) {
                toast.error(data.error)
            }

            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['categories', { id }] });
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    return mutation;
}