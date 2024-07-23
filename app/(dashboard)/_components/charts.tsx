"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { AreaVariantChart } from "./data-chart/area-variant-chart";
import { BarVariantChart } from "./data-chart/bar-variant-chart";
import { LineVariantChart } from "./data-chart/line-variant-chart";
import { AreaChartIcon, BarChart2, LineChartIcon } from "lucide-react";

import { FileSearch } from "lucide-react";

type Props = {
    data: {
        date: string;
        income: number;
        expenses: number;
    }[]
}

export const Charts = ({
    data = [],
}: Props) => {
    const [chartType, setChartType] = useState("area");

    const onChangeChartType = (type: string) => {
        setChartType(type)
    }

    return (
        <div className=" flex-0.5 w-full space-y-6">
            <div className="flex lg:flex-row flex-col gap-y-3 lg:items-center items-start justify-between w-full">
                <h2 className="font-bold text-xl">
                    Transactions
                </h2>
                <Select
                    defaultValue={chartType}
                    onValueChange={onChangeChartType}
                >
                    <SelectTrigger className="lg:w-[180px] w-full">
                        <SelectValue placeholder="Select a Chart Type" />
                    </SelectTrigger>
                    <SelectContent side="bottom">
                        <SelectItem value="area">
                            <div className="flex items-center gap-x-2">
                                <AreaChartIcon className="size-4" />
                                <p className="font-semibold">
                                    Area Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="bar">
                            <div className="flex items-center gap-x-2">
                                <BarChart2 className="size-4" />
                                <p className="font-semibold">
                                    Bar Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="line">
                            <div className="flex items-center gap-x-2">
                                <LineChartIcon className="size-4" />
                                <p className="font-semibold">
                                    Line Chart
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {data.length === 0 ?
                <div className="flex h-full items-center justify-center">
                    <div className="flex items-center gap-x-3">
                        <FileSearch className="size-4" />
                        <p className="text-muted-foreground">
                            No Search found for this data
                        </p>
                    </div>
                </div> :
                <>
                    {chartType === "area" && <AreaVariantChart data={data} />}
                    {chartType === "bar" && <BarVariantChart data={data} />}
                    {chartType === "line" && <LineVariantChart data={data} />}
                </>
            }
        </div>
    )
}