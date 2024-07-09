import { getTransactions } from "@/actions/transactions/get-transactions";
import { useQuery } from "@tanstack/react-query";


export const useGetTransactions = () => {

    const query = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            // await getTransactions();
            const data = await getTransactions();

            if (!data) {
                throw new Error("Failed to fetch transactions")
            }

            return data;
        },
    });

    return query;
}