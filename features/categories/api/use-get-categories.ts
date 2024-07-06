import { getCategories } from "@/actions/categories/get-categories";
import { useQuery } from "@tanstack/react-query";


export const useGetCategories = () => {

    const query = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            // await getCategories();
            const data = await getCategories();

            if (!data) {
                throw new Error("Failed to fetch categories")
            }

            return data;
        },
    });

    return query;
}