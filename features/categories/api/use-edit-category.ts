
import { editCategory } from '@/actions/categories/edit-category';
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';




import { toast } from "sonner";

export const useEditCategory = (id: any) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (values: any) => editCategory(id, values),
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