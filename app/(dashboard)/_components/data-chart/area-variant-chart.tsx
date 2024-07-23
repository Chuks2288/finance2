import { format } from "date-fns";
import {
    Tooltip,
    XAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    ReferenceLine
} from "recharts";
import { CustomTooltip } from "../custom-tooltip";

type Props = {
    data: {
        date: string;
        income: number;
        expenses: number;
    }[]
}

export const AreaVariantChart = ({
    data,
}: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
                <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#8884d8"
                    fill="blue"
                />
                <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#82ca9d"
                    fill="red"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

