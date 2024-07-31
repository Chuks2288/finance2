"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { PieChartIcon, RadarIcon, RadicalIcon } from "lucide-react";
import { PieVariantChart } from "./data-chart/pie-variant-chart";
import { RadarVariantChart } from "./data-chart/radar-variant-chart";
import { RadialVariantChart } from "./data-chart/radial-variant-chart";

import { FileSearch } from "lucide-react";

type Props = {
    data: {
        name: string | any;
        value: number;
    }[] | undefined;
}

export const SpendingPie = ({
    data = [],
}: Props) => {
    const [chartType, setChartType] = useState("pie");

    const onChangeChartType = (type: string) => {
        setChartType(type)
    }

    return (
        <div className="flex-0.9 w-full space-y-6">
            <div className="flex lg:flex-row flex-col gap-y-3 lg:items-center items-start justify-between w-full">
                <h2 className="font-bold text-xl">
                    Categories
                </h2>
                <Select
                    defaultValue={chartType}
                    onValueChange={onChangeChartType}
                >
                    <SelectTrigger className="lg:w-[180px] w-full">
                        <SelectValue placeholder="Select a Chart Type" />
                    </SelectTrigger>
                    <SelectContent side="bottom">
                        <SelectItem value="pie">
                            <div className="flex items-center gap-x-2">
                                <PieChartIcon className="size-4" />
                                <p className="font-semibold">
                                    Pie Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="radar">
                            <div className="flex items-center gap-x-2">
                                <RadarIcon className="size-4" />
                                <p className="font-semibold">
                                    Radar Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="radial">
                            <div className="flex items-center gap-x-2">
                                <RadicalIcon className="size-4" />
                                <p className="font-semibold">
                                    Radial Chart
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {data.length === 0 ?
                <div className="flex w-full min-h-[400px] items-center justify-center">
                    <div className="flex items-center gap-x-2">
                        <FileSearch className="size-6" />
                        <p className="text-muted-foreground">
                            No Search found for this data
                        </p>
                    </div>
                </div> :
                <>
                    {chartType === "pie" && <PieVariantChart data={data} />}
                    {chartType === "radar" && <RadarVariantChart data={data} />}
                    {chartType === "radial" && <RadialVariantChart data={data} />}
                </>
            }
        </div>
    )
}

