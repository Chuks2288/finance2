import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority"
import { CountUp } from "@/components/count-up";
import { IconType } from "react-icons/lib";

const boxVariant = cva(
    "rounded-md p-3 shrink-0",
    {
        variants: {
            variant: {
                default: "bg-blue-500/20",
                success: "bg-emerald-500/20",
                danger: "bg-rose-500/20",
                warning: "bg-yellow-500/20"
            }
        },
        defaultVariants: {
            variant: "default",
        }
    }
)
const iconVariant = cva(
    "size-6",
    {
        variants: {
            variant: {
                default: "fill-blue-500/20",
                success: "fill-emerald-500/20",
                danger: "fill-rose-500/20",
                warning: "fill-yellow-500/20"
            }
        },
        defaultVariants: {
            variant: "default",
        }
    }
)

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

interface DataCardProps extends BoxVariants, IconVariants {
    title: string;
    value?: number;
    percentageChange?: number;
    icon: IconType;
    dateRange: string;
}

export const DataCard = ({
    title,
    value = 0,
    percentageChange = 0,
    icon: Icon,
    variant,
    dateRange
}: DataCardProps) => {
    return (
        <div className="border-none bg-white shadow-sm drop-shadow-sm rounded-md w-full p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-3">
                    <h3 className="font-bold text-2xl">
                        {title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        {dateRange}
                    </p>
                </div>
                <div className={cn(
                    boxVariant({ variant })
                )}>
                    <Icon className={cn(
                        iconVariant({ variant })
                    )} />
                </div>
            </div>
            <div className="mt-10 space-y-3">
                <CountUp
                    preserveValue
                    start={0}
                    end={value}
                    decimalPlaces={2}
                    formattingFn={formatCurrency}
                    className="font-bold text-2xl"
                />

                <p className={cn(
                    "text-sm",
                    percentageChange > 0 && "text-blue-500",
                    percentageChange < 0 && "text-rose-500"
                )}>
                    {formatPercentage(percentageChange, { addPrefix: true })} from last period
                </p>
            </div>
        </div>
    )
}


