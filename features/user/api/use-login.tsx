
import { useRouter, useSearchParams } from 'next/navigation';
import {
    useMutation,
    QueryClient,
} from '@tanstack/react-query';

import { login } from '@/actions/user/login';


import { toast } from "sonner";

const user = "@/actions/user";

export const useLogin = () => {
    const queryClient = new QueryClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";


    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            if (data?.success) {
                toast.success(data.success);
                router.push(callbackUrl || "/");
                router.refresh()
            }

            if (data?.error) {
                toast.error(data.error || urlError)
            }

            queryClient.invalidateQueries({ queryKey: [user] });
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    return mutation;
}