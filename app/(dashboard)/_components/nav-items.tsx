"use client";

import { routes } from "@/data";
import { usePathname } from "next/navigation";

import { NavButton } from "./nav-button";


export const NavItems = () => {
    const pathname = usePathname();

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