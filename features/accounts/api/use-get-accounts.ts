import { getAccounts } from "@/actions/accounts/get-accounts";
import { useQuery } from "@tanstack/react-query";


export const useGetAccounts = () => {

    const query = useQuery({
        queryKey: ['accounts'],
        queryFn: async () => {
            // await getAccounts();
            const data = await getAccounts();

            if (!data) {
                throw new Error("Failed to fetch accounts")
            }

            return data;
        },
    });

    return query;
}