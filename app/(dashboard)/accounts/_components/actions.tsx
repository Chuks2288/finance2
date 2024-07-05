import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

type Props = {
    id: string;
}

export const Actions = ({
    id
}: Props) => {

    const { onOpen } = useOpenAccount();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => onOpen(id)}
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                >
                    Delete
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

