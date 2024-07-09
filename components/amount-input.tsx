
import CurrencyInput from "react-currency-input-field";
// import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Info, MinusCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
    value: string;
    onChange: (value: string | undefined) => void;
    placeholder: string;
    disabled?: boolean;
};

export const AmountInput = ({
    value,
    onChange,
    placeholder,
    disabled,
}: Props) => {
    const parsedValue = parseFloat(value);
    const isIncome = parsedValue > 0;
    const isExpenses = parsedValue < 0;

    return (
        <div className="relative">
            <CurrencyInput
                prefix="$"
                className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={placeholder}
                value={value}
                decimalsLimit={2}
                decimalScale={2}
                onValueChange={onChange}
                disabled={disabled}
            />
            <button
                type="button"
                disabled={disabled}
                className={cn(
                    "bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition",
                    isIncome && "bg-emerald-500 hover:bg-emerald-600",
                    isExpenses && "bg-rose-500 hover:bg-rose-600"
                )}
            >
                {!parsedValue && <Info className="size-3 text-white" />}
                {isIncome && <PlusCircle className="size-3 text-white" />}
                {isExpenses && <MinusCircle className="size-3 text-white" />}
            </button>
        </div>
    );
};
