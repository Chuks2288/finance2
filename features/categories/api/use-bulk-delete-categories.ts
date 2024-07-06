import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteCategories } from "@/actions/categories/bulk-delete-categories";
import { toast } from "sonner";

export const useBulkDeleteCategories = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: bulkDeleteCategories,
        onSuccess: (data) => {
            if (data?.success) {
                toast.success(data.success);
            }

            if (data?.error) {
                toast.error(data.error);
            }

            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    });

    return mutation;
};
