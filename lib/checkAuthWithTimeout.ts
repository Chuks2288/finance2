import { redirect } from 'next/navigation';
import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";

const checkAuthWithTimeout = async (timeout = 5000) => {

    let timeoutHandle: ReturnType<typeof setTimeout>;

    const timeoutPromise = new Promise<null>((_, reject) => {
        timeoutHandle = setTimeout(() => reject(new Error('Request timed out')), timeout);
    });

    try {
        const authPromise = (async () => {
            const userAuth = await auth();
            const user = await currentUser();

            if (!user || !userAuth) {
                throw new Error('Unauthorized');
            }

            return { user, userAuth };
        })();

        const result = await Promise.race([authPromise, timeoutPromise]);

        clearTimeout(timeoutHandle);
        return result;
    } catch (error) {
        redirect('/auth/login');
    }
};

export default checkAuthWithTimeout;
