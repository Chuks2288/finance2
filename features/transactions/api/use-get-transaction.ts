import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "@/actions/transactions/get-transaction";

export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["transactions", { id }],
        queryFn: async () => {

            if (!id) {
                throw new Error("Transaction ID is required");
            }

            const data = await getTransaction({ id });

            if (!data) {
                throw new Error("Failed to fetch transaction");
            }

            return data;
        },
    });

    return query;
};
