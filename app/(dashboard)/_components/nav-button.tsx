import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation"

type Props = {
    href: string,
    label: string,
    isActive: boolean,
}


export const NavButton = ({
    href,
    label,
    isActive
}: Props) => {
    const router = useRouter();

    return (
        <Button
            key={label}
            className={cn(
                "text-white hover:bg-slate-300/30",
                isActive && "bg-gray-300/30"
            )}
            onClick={() => router.push(href)}
        >
            {label}
        </Button>
    )
}

