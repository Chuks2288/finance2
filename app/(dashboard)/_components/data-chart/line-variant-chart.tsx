
import { format } from "date-fns";
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    Tooltip,
    Line,
} from "recharts";
import { CustomTooltip } from "../custom-tooltip";


type Props = {
    data: {
        date: string;
        income: number;
        expenses: number;
    }[]
}

export const LineVariantChart = ({
    data
}: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    type="monotone"
                    dataKey="income"
                    stroke="blue"
                />
                <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="red"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

