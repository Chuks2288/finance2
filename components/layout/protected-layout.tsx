"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import checkAuthWithTimeout from '@/lib/checkAuthWithTimeout';

type Props = {
    children: React.ReactNode
}
const ProtectedLayout = ({
    children
}: Props) => {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                await checkAuthWithTimeout();
            } catch (error) {
                router.push('/auth/login');
            }
        })();
    }, [router]);

    return <>{children}</>;
};

export default ProtectedLayout;
