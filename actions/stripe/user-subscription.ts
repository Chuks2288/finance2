"use server";

import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import { getUserSubscription } from "@/lib/queries";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import Stripe from "stripe";

const returnUrl = absoluteUrl("/settings");

export const createStripeUrl = async () => {
    const user = await currentUser();
    const userId = user?.id;
    // const userId = await auth();

    if (!user || !userId) {
        throw new Error("Unauthorized");
    }

    const userSubscription = await getUserSubscription();

    if (userSubscription && userSubscription.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returnUrl,
        });

        // if (typeof stripeSession.url !== 'string') {
        //     throw new Error("Failed to create Stripe session");
        // }
        return { data: stripeSession.url };
    }

    const stripeSession = await stripe.checkout.sessions.create({
        // @ts-ignore
        mode: "subscription",
        payment_method_types: ["card"],
        // payment_method_types: ["card", "paypal"],
        customer_email: user.email,
        line_items: [
            {
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "Finance Pro",
                        description: "Unlimited Hearts",
                    },
                    unit_amount: 2000, // $20.00 USD
                    recurring: {
                        interval: "month",
                    },
                },
                quantity: 1,
            },
        ],
        metadata: {
            userId
        },
        success_url: returnUrl,
        cancel_url: returnUrl,
    })

    // const sessionParams: Stripe.Checkout.SessionCreateParams = {
    //     mode: "subscription",
    //     payment_method_types: ["card"],
    //     customer_email: user.email as string,  // Ensure user.email is a string
    //     line_items: [
    //         {
    //             price_data: {
    //                 currency: "USD",
    //                 product_data: {
    //                     name: "Finance Pro",
    //                     description: "Unlimited Hearts",
    //                 },
    //                 unit_amount: 2000, // $20.00 USD
    //                 recurring: {
    //                     interval: "month",
    //                 },
    //             },
    //             quantity: 1,
    //         },
    //     ],
    //     metadata: {
    //         userId: user.id as string,
    //     },
    //     success_url: returnUrl,
    //     cancel_url: returnUrl,
    // };

    // const stripeSession = await stripe.checkout.sessions.create(sessionParams);

    // if (typeof stripeSession.url !== 'string') {
    //     throw new Error("Failed to create Stripe session");
    // }

    return { data: stripeSession.url };
};
