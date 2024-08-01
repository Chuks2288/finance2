import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, QueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import { login } from '@/actions/user/login';
import { LoginSchema } from '@/schema';
import { z } from 'zod';

type FormValues = z.infer<typeof LoginSchema>;

export const useLogin = () => {
    const queryClient = new QueryClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";

    const mutation = useMutation({
        mutationFn: async (values: FormValues) => {
            const result = await login(values,
                {
                    headers:
                        { 'x-forwarded-for': '127.0.0.1', 'user-agent': 'browser' }
                }, callbackUrl);

            return result;
        },

        onSuccess: (data) => {
            if (data?.success) {
                toast.success(data.success);
                router.push(callbackUrl || "/");
                router.refresh();
            }

            if (data?.error) {
                toast.error(data.error || urlError);
            }

            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    });

    return mutation;
}