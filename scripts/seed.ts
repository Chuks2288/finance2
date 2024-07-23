import { config } from "dotenv";
import { subDays, format, eachDayOfInterval } from "date-fns";
import { Categories, Accounts, Transactions } from "@prisma/client";
import { convertAmountToMiliunits } from "@/lib/utils";
import { db } from "@/lib/db";

config({ path: ".env.local" });



const SEED_CATEGORIES = [
    { id: "category_1", name: "Food", userId: process.env.SEED_USER_ID, plaidId: null },
    { id: "category_2", name: "Rent", userId: process.env.SEED_USER_ID, plaidId: null },
    { id: "category_3", name: "Utilities", userId: process.env.SEED_USER_ID, plaidId: null },
    { id: "category_7", name: "Clothing", userId: process.env.SEED_USER_ID, plaidId: null },
];

const SEED_ACCOUNTS = [
    { id: "account_1", name: "Checking", userId: process.env.SEED_USER_ID, plaidId: null },
    { id: "account_2", name: "Savings", userId: process.env.SEED_USER_ID, plaidId: null },
];

const SEED_TRANSACTIONS: Omit<Transactions, 'createdAt' | 'updatedAt'>[] = [];

const generateRandomAmount = (category: Categories) => {
    switch (category.name) {
        case "Rent":
            return Math.random() * 400 + 90; // Rent will likely be a larger amount
        case "Utilities":
            return Math.random() * 200 + 50;
        case "Food":
            return Math.random() * 30 + 10;
        case "Transportation":
        case "Health":
            return Math.random() * 50 + 15;
        case "Entertainment":
        case "Clothing":
        case "Miscellaneous":
            return Math.random() * 100 + 20;
        default:
            return Math.random() * 50 + 15;
    }
};

const generateTransactionsForDay = (day: Date) => {
    const numTransactions = Math.floor(Math.random() * 4) + 1; // 1 to 4 transactions per day

    for (let i = 0; i < numTransactions; i++) {
        const category = SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
        const isExpense = Math.random() > 0.6; // 60% chance of being an expense
        const amount = generateRandomAmount(category as any);
        const formattedAmount = convertAmountToMiliunits(isExpense ? -amount : amount);

        SEED_TRANSACTIONS.push({
            id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
            accountId: SEED_ACCOUNTS[0].id, // Assuming always using the first account for simplicity
            categoryId: category.id,
            date: day,
            amount: formattedAmount,
            payee: "Merchant",
            note: "Random transaction",
        });
    }
};

const generateTransactions = () => {
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);
    const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
    days.forEach(day => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
    try {
        // Reset database
        await db.transactions.deleteMany();
        await db.accounts.deleteMany();
        await db.categories.deleteMany();

        // Seed Categories
        await db.categories.createMany({ data: SEED_CATEGORIES });

        // Seed accounts
        await db.accounts.createMany({ data: SEED_ACCOUNTS });

        // Seed transactions
        await db.transactions.createMany({ data: SEED_TRANSACTIONS });
    } catch (error) {
        console.error("Error during seed:", error);
        process.exit(1);
    }
};

main();
