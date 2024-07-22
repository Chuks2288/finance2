import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { convertAmountFromiliunits } from "@/lib/utils";
import { getSummary } from "@/actions/summary/get-summary";

export const useGetSummary = () => {
    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";

    const query = useQuery({
        queryKey: ["summary", { from, to, accountId }],
        queryFn: async () => {
            const data = await getSummary({ from, to, accountId });

            if (!data) {
                throw new Error("Failed to fetch transaction");
            }

            return {
                ...data,
                data: {
                    ...data.data,
                    incomeAmount: (data?.data?.incomeAmount),
                    expensesAmount: (data?.data?.expensesAmount),
                    remainingAmount: (data?.data?.remainingAmount),
                    categories: data?.data?.categories.map((category) => ({
                        ...category,
                        value: convertAmountFromiliunits(category.value),
                    })),
                    days: data?.data?.days.map((day) => ({
                        ...day,
                        income: convertAmountFromiliunits(day.income),
                        expenses: convertAmountFromiliunits(day.expenses),
                    }))
                }
            };
        },
    });

    return query;
};
