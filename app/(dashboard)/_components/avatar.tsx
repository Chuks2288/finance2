import { cn } from "@/lib/utils"
import Image from "next/image"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

type Props = {
    src: string,
    className?: string,
}

export const AvatarProfile = ({
    src,
    className
}: Props) => {
    return (
        <Avatar>
            <AvatarImage
                src={"/placeholder.png" || src}
                alt="Profile"
                className={cn(
                    "rounded-full cursor-pointer",
                    className
                )}
            />
        </Avatar>
    )
}




