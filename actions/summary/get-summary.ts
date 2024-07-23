"use server";

import { z } from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { subDays, parse, differenceInDays } from "date-fns";
import { calculatePercentChange, fillMissingDays } from "@/lib/utils";

const querySchema = z.object({
    from: z.string().optional(),
    to: z.string().optional(),
    accountId: z.string().optional(),
});

export const getSummary = async (query: any) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    const validation = querySchema.safeParse(query);
    if (!validation.success) {
        return { error: "Invalid query parameters", issues: validation.error.errors };
    }

    const { from, to, accountId } = validation.data;
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
    const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

    const periodLength = differenceInDays(endDate, startDate) + 1;
    const lastPeriodStart = subDays(startDate, periodLength);
    const lastPeriodEnd = subDays(endDate, periodLength);

    const fetchFinancialData = async (userId: string, startDate: Date, endDate: Date, accountId?: string) => {
        const transactions = await db.transactions.findMany({
            where: {
                accountId: accountId ? accountId : undefined,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
                account: {
                    userId: userId,
                },
            },
            select: {
                amount: true,
            },
        });

        const income = transactions.filter(t => t.amount >= 0).reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
        const remaining = transactions.reduce((sum, t) => sum + t.amount, 0);

        return { income, expenses, remaining };
    };

    const currentPeriod = await fetchFinancialData(user.id as string, startDate, endDate, accountId);
    const lastPeriod = await fetchFinancialData(user.id as string, lastPeriodStart, lastPeriodEnd, accountId);

    const incomeChange = calculatePercentChange(currentPeriod.income, lastPeriod.income);
    const expensesChange = calculatePercentChange(currentPeriod.expenses, lastPeriod.expenses);
    const remainingChange = calculatePercentChange(currentPeriod.remaining, lastPeriod.remaining);

    const categoryData = await db.transactions.groupBy({
        by: ['categoryId'],
        where: {
            accountId: accountId ? accountId : undefined,
            date: {
                gte: startDate,
                lte: endDate,
            },
            account: {
                userId: user.id,
            },
        },
        _sum: {
            amount: true,
        },
        orderBy: {
            _sum: {
                amount: 'desc',
            },
        },
    });

    const categories = categoryData.map((cat) => ({
        name: cat.categoryId, // Replace with actual category name if you have a category relation
        value: Math.abs(cat._sum.amount as number),
    }));

    const topCategories = categories.slice(0, 3);
    const otherCategories = categories.slice(3);
    const otherSum = otherCategories.reduce((sum, current) => sum + current.value, 0);

    const finalCategories = topCategories;
    if (otherCategories.length > 0) {
        finalCategories.push({ name: "Other", value: otherSum });
    }

    const activeDays = await db.transactions.groupBy({
        by: ['date'],
        where: {
            accountId: accountId ? accountId : undefined,
            date: {
                gte: startDate,
                lte: endDate,
            },
            account: {
                userId: user.id,
            },
        },
        _sum: {
            amount: true,
        },
    });

    const days = fillMissingDays(
        activeDays.map((day: any) => ({
            date: day.date,
            income: day._sum.amount >= 0 ? day._sum.amount : 0,
            expenses: day._sum.amount < 0 ? Math.abs(day._sum.amount) : 0,
        })),
        startDate,
        endDate
    );

    return {
        data: {
            remainingAmount: currentPeriod.remaining,
            remainingChange,
            incomeAmount: currentPeriod.income,
            incomeChange,
            expensesAmount: currentPeriod.expenses,
            expensesChange,
            categories: finalCategories,
            days,
        },
    };
};
