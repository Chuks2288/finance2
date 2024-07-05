import { useQuery } from "@tanstack/react-query";
import { getAccount } from "@/actions/accounts/get-account";

export const useGetAccount = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["accounts", id],
        queryFn: async () => {

            if (!id) {
                throw new Error("Account ID is required");
            }

            const data = await getAccount({ id });

            if (!data) {
                throw new Error("Failed to fetch account");
            }

            return data;
        },
    });

    return query;
};
