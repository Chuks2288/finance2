import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


type Props = {
    href: () => void;
    label: string;
    isActive: boolean;
}

export const SidebarButton = ({
    href,
    label,
    isActive,
}: Props) => {
    return (
        <Button
            variant="ghost"
            key={label}
            className={cn(
                "hover:bg-slate-300/50 w-full justify-start",
                isActive && "bg-gray-300/30"
            )}
            onClick={href}
        >
            {label}
        </Button>
    )
}

