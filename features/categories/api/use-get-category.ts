import { getCategory } from "@/actions/categories/get-category";
import { useQuery } from "@tanstack/react-query";


export const useGetCategory = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["categories", { id }],
        queryFn: async () => {

            if (!id) {
                throw new Error("Category ID is required");
            }

            const data = await getCategory({ id });

            if (!data) {
                throw new Error("Failed to fetch category");
            }

            return data;
        },
    });

    return query;
};
