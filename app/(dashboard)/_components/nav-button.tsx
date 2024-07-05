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
            size="sm"
            variant="outline"
            className={cn(
                "w-full lg:w-auto justify-between font-normal bg-transparent hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
                isActive && "bg-white/10 text-white",
            )}
            onClick={() => router.push(href)}
        >
            {label}
        </Button>
    )
}

