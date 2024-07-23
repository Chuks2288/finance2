// import { Payment } from "@/app/(dashboard)/accounts/_components/columns"

export const routes = [
    {
        label: "Overview",
        href: "/",
    },
    {
        label: "Transactions",
        href: "/transactions",
    },
    {
        label: "Accounts",
        href: "/accounts",
    },
    {
        label: "Categories",
        href: "/categories",
    },
    {
        label: "Settings",
        href: "/settings",
    },
]

// export async function getData(): Promise<Payment[]> {
//     // Fetch data from your API here.
//     return [
//         {
//             id: "728ed52f",
//             name: "m@example.com",
//         },
//         {
//             id: "728ed52f",
//             name: "g@example.com",
//         },
//         {
//             id: "728ed52f",
//             name: "g@example.com",
//         },
//         {
//             id: "728ed52f",
//             name: "g@example.com",
//         },

//     ]
// }


export const data = {
    days: [
        {
            date: "02, july 2024",
            income: 20,
            expenses: 30,
        },
        {
            date: "04, july 2024",
            income: 10,
            expenses: 20,
        },
        {
            date: "05, july 2024",
            income: 20,
            expenses: 30,
        },
        {
            date: "06, july 2024",
            income: 30,
            expenses: 40,
        },
        {
            date: "07, july 2024",
            income: 40,
            expenses: 50,
        },
        {
            date: "07, july 2024",
            income: 30,
            expenses: 40,
        },
        {
            date: "07, july 2024",
            income: 20,
            expenses: 30,
        },
    ],
    categories: [
        {
            name: "Food",
            value: 20,
        },
        {
            name: "Utilities",
            value: 20,
        },
        {
            name: "Food",
            value: 20,
        },
        {
            name: "Clothings",
            value: 20,
        },
        {
            name: "Others",
            value: 20,
        },
    ]
} as any;
