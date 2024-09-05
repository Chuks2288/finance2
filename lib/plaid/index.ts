// import { User } from "@prisma/client";
// import { revalidatePath } from "next/cache";
// import { Configuration, PlaidApi, Products, PlaidEnvironments, CountryCode, ProcessorTokenCreateRequest, ProcessorApexProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum } from "plaid";
// import { encryptId, extractCustomerIdFromUrl, parseStringify } from "./utils";
// import { addFundingSource, createDwollaCustomer } from "./dwolla";
// import { db } from "./db";

// const PLAID_ENV = process.env.PLAID_ENV || "development";
// interface CreateBankAccountProps {
//     userId: string,
//     bankId: string,
//     accountId: string,
//     accessToken: string,
//     // fundingSourceUrl: string,
//     // sharableId: string,
//     plaidId: string,
// }

// const configuration = new Configuration({
//     basePath: PlaidEnvironments[PLAID_ENV],
//     // basePath: PlaidEnvironments.sandbox,
//     baseOptions: {
//         headers: {
//             'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
//             'PLAID-SECRET': process.env.PLAID_SECRET,
//             'Plaid-Version': '2020-09-14',
//         },
//     },
// });

// export const plaidClient = new PlaidApi(configuration);

// export const createLinkToken = async (user: User) => {
//     try {
//         const tokenParams = {
//             user: {
//                 client_user_id: user.id,
//             },
//             client_name: user.name ?? "", // Provide a default value if user.name is null
//             products: ["auth"] as Products[],
//             language: "en",
//             country_codes: ["US"] as CountryCode[],
//         }

//         const response = await plaidClient.linkTokenCreate(tokenParams);

//         return parseStringify({ linkToken: response.data.link_token }); // Use JSON.stringify instead of parseStringify
//     } catch (error) {
//         console.log(error);
//     }
// }

// const createBankAccount = async ({
//     userId,
//     bankId,
//     accountId,
//     accessToken,
//     // fundingSourceUrl,
//     // sharableId,
//     plaidId,
// }: CreateBankAccountProps) => {
//     try {
//         // Create bank account
//         const bankAccount = await db.bank.create({
//             data: {
//                 userId,
//                 bankId,
//                 accountId,
//                 accessToken,
//                 // fundingSourceUrl,
//                 // sharableId,
//                 plaidId,
//             }
//         });

//         return parseStringify(bankAccount);
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const exchangePublicToken = async ({
//     publicToken, user
// }: { publicToken: string, user: User }) => {
//     try {
//         // Exchange public token for access token and item id
//         const response = await plaidClient.itemPublicTokenExchange({
//             public_token: publicToken
//         });

//         const accessToken = response.data.access_token;
//         const itemId = response.data.item_id;

//         // Create account information from Plaid using the access token
//         const accountsResponse = await plaidClient.accountsGet({
//             access_token: accessToken,
//         });

//         const accountData = accountsResponse.data.accounts[0];

//         // Create processor token for Dwolla using the access token and accountId
//         const request: ProcessorTokenCreateRequest = {
//             access_token: accessToken,
//             account_id: accountData.account_id,
//             processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
//         };

//         const processorTokenResponse = await plaidClient.processorTokenCreate(request);
//         const processorToken = processorTokenResponse.data.processor_token;

//         // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
//         // const fundingSourceUrl = await addFundingSource({
//         //     dwollaCustomerId: user.dwollaCustomerId,
//         //     processorToken,
//         //     bankName: accountData.name,
//         // });

//         // Save or update the account with Plaid-specific details
//         await createBankAccount({
//             userId: user.id,
//             bankId: itemId, // This is the Plaid item ID
//             accountId: accountData.account_id,
//             accessToken,
//             // fundingSourceUrl: fundingSourceUrl ?? "",
//             // sharableId: encryptId(accountData.account_id), // Assuming this is an encrypted account ID
//             plaidId: accountData.account_id // Save the Plaid account ID here
//         });

//         // Revalidating the path to reflect the changes
//         revalidatePath("/");
//         revalidatePath("/settings");
//         revalidatePath("/accounts");
//         revalidatePath("/categories");
//         revalidatePath("/transactions");

//         // Return a success message
//         return parseStringify({
//             publicTokenExchange: "complete"
//         });
//     } catch (error) {
//         console.log(error);
//         // Handle error
//     }
// }

// "use server";

import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Configuration, PlaidApi, Products, PlaidEnvironments, CountryCode } from "plaid";
import { parseStringify } from "../utils";
import { db } from "../db";

import { NextApiRequest, NextApiResponse } from 'next';

const PLAID_ENV = process.env.PLAID_ENV || "sandbox";

interface CreateBankAccountProps {
    userId: string,
    bankId: string,
    accountId: string,
    accessToken: string,
    plaidId: string,
}

const configuration = new Configuration({
    basePath: PlaidEnvironments[PLAID_ENV],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
            'Plaid-Version': '2020-09-14',
        },
    },
});

export const plaidClient = new PlaidApi(configuration);

// export const createLinkToken = async (user: User) => {
//     try {
//         const tokenParams = {
//             user: {
//                 client_user_id: user.id,
//             },
//             client_name: user.name ?? "",
//             products: ["auth"] as Products[],
//             language: "en",
//             country_codes: ["US"] as CountryCode[],
//         }

//         const response = await plaidClient.linkTokenCreate(tokenParams);

//         return parseStringify({ linkToken: response.data.link_token });
//     } catch (error) {
//         console.log(error);
//     }
// }

// On the backend (e.g., in an API route)


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const tokenParams = {
                user: {
                    client_user_id: req.body.userId,
                },
                client_name: req.body.clientName,
                products: ["auth"] as Products[],
                language: "en",
                country_codes: ["US"] as CountryCode[],
            };

            const response = await plaidClient.linkTokenCreate(tokenParams);
            res.status(200).json({ linkToken: response.data.link_token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create link token' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


const createBankAccount = async ({
    userId,
    bankId,
    accountId,
    accessToken,
    plaidId,
}: CreateBankAccountProps) => {
    try {
        const bankAccount = await db.bank.create({
            data: {
                userId,
                bankId,
                accountId,
                accessToken,
                plaidId,
            }
        });

        return parseStringify(bankAccount);
    } catch (error) {
        console.log(error);
    }
}

export const exchangePublicToken = async ({
    publicToken,
    user
}: {
    publicToken: string,
    user: User
}) => {
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        const accountsResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        });

        const accountData = accountsResponse.data.accounts[0];

        await createBankAccount({
            userId: user.id,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            plaidId: accountData.account_id
        });

        revalidatePath("/");
        revalidatePath("/settings");
        revalidatePath("/accounts");
        revalidatePath("/categories");
        revalidatePath("/transactions");

        return parseStringify({
            publicTokenExchange: "complete"
        });

    } catch (error) {
        console.log(error);
    }
}
