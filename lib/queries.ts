import { auth } from "@/auth";
import { cache } from "react";
import { db } from "./db";
import { currentUser } from "./auth";

const DAY_IN_MS = 86_400_000;
export const getUserSubscription = cache(async () => {
    // const userId = await auth();
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) return null;

    const data = await db.userSubscription.findFirst({
        where: {
            userId: user?.id,
        },
    });

    if (!data) return null;

    const isActive =
        data.stripePriceId &&
        data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return {
        ...data,
        isActive: !!isActive,
    };
});

export const hasActiveSubscription = async () => {
    const subscription = await getUserSubscription();

    return !!subscription?.isActive

}

// export const isPro = async () => {
//     await hasActiveSubscription();
// }
