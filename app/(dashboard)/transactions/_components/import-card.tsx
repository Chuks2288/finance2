

import { format, parse } from "date-fns";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ImportTable } from "./import-table";
import { convertAmountToMiliunits } from "@/lib/utils";
import { FcCancel } from "react-icons/fc";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = [
    "amount",
    "date",
    "payee",
]

interface SelectedColumnsState {
    [key: string]: string | null;
}

type Props = {
    data: string[][];
    onCancel: () => void;
    onSubmit: (data: any) => void;
}

export const ImportCard = ({
    data,
    onCancel,
    onSubmit
}: Props) => {
    const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>({});

    const headers = data[0];
    const body = data.slice(1);

    const onTableHeadSelectChange = (
        columnIndex: number,
        value: string | null
    ) => {
        setSelectedColumns((prev) => {
            const newSelectedColumns = { ...prev };

            for (const key in newSelectedColumns) {
                if (newSelectedColumns[key] === value) {
                    newSelectedColumns[key] = null;
                }
            }

            if (value === "skip") {
                value = null;
            }

            newSelectedColumns[`column_${columnIndex}`] = value;

            return newSelectedColumns;
        })
    }

    const progress = Object.values(selectedColumns).filter(Boolean).length;

    const handleContinue = () => {
        const getColumnIndex = (column: string) => {
            return column.split("_")[1];
        }

        const mappedData = {
            headers: headers.map((_header, index) => {
                const columnIndex = getColumnIndex(`column_${index}`);
                return selectedColumns[`column_${columnIndex}`] || null;
            }),
            body: body.map((row) => {
                const transformedRow = row.map((cell, index) => {
                    const columnIndex = getColumnIndex(`column_${index}`);
                    return selectedColumns[`column_${columnIndex}`] ? cell : null;
                });

                return transformedRow.every((item) => item === null)
                    ? []
                    : transformedRow;
            }).filter((row) => row.length > 0)
        }

        const arrayOfData = mappedData.body.map((row) => {
            return row.reduce((acc: any, cell, index) => {
                const header = mappedData.headers[index];
                if (header !== null) {
                    acc[header] = cell;
                }

                return acc;
            }, {});
        });

        const formattedData = arrayOfData.map((item) => {
            let parsedDate: any;
            try {
                parsedDate = parse(item.date, dateFormat, new Date());
                if (isNaN(parsedDate)) {
                    throw new Error(`Invalid date: ${item.date}`);
                }
            } catch (error) {
                console.error(`Error parsing date for item`);
                return { ...item, amount: NaN, date: 'Invalid Date' };
            }

            const formattedDate = format(parsedDate, outputFormat);

            return {
                ...item,
                amount: convertAmountToMiliunits(parseFloat(item.amount)),
                date: formattedDate,
            };
        });

        onSubmit(formattedData);
    }

    return (
        <main className="mx-4 pb-20">
            <div className="min-h-[50vh] max-w-[1200px] mx-auto rounded-md -mt-20 bg-white shadow-md p-6 space-y-4">
                <div className="flex md:flex-row flex-col items-center justify-between space-y-3">
                    <h2 className="text-2xl font-bold self-start">
                        Import Transactions
                    </h2>
                    <div className="flex md:flex-row flex-col md:w-auto w-full items-center gap-3">
                        <Button
                            size="sm"
                            onClick={onCancel}
                            className="w-full md:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            disabled={progress < requiredOptions.length}
                            onClick={handleContinue}
                            className="w-full md:w-auto"
                        >
                            Continue ({progress} / {requiredOptions.length})
                        </Button>
                    </div>
                </div>
                <ImportTable
                    headers={headers}
                    body={body}
                    selectedColumns={selectedColumns}
                    onTableHeadSelectChange={onTableHeadSelectChange}
                />
            </div>
        </main >
    )
}
