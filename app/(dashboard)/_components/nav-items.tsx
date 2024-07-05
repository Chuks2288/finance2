"use client";

import { useState } from "react";
import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";

import { routes } from "@/data";

import { NavButton } from "./nav-button";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarButton } from "./sidebar-button";


export const NavItems = () => {
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMedia("(max-width: 1024px)", false);

    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    }

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal text-white border-none bg-gray-300/30 hover:bg-gray-300/40"
                    >
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2 bg-white">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => (
                            <SidebarButton
                                key={route.label}
                                href={() => onClick(route.href)}
                                isActive={pathname === route.href}
                                label={route.label}
                            />
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <div className="">
            <div className="hidden lg:flex items-center gap-x-3">
                {routes.map((route) => (
                    <NavButton
                        key={route.label}
                        href={route.href}
                        isActive={pathname === route.href}
                        label={route.label}
                    />
                ))}
            </div>
        </div>
    )
}