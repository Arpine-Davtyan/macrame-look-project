"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const menuItems = [
    { name: "Մեր Մասին", href: "/#about" },
    { name: "Վարձույթ", href: "/products" },
    { name: "Կապ", href: "/contact" },
];

const Navbar = () => {
    return (
        <div className="navbar-block">
            {/* Logo */}
            <Link
                href="/"
                className="text-xl font-semibold tracking-wide"
            >
                <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={110}
                    height={50}
                    loading="eager"
                />
            </Link>

            {/* Desktop */}
            <div className="hidden md:block">
                <NavigationMenu>
                    <NavigationMenuList className="gap-3">
                        {menuItems.map((item) => (
                            <NavigationMenuItem key={item.name}>
                                <NavigationMenuLink
                                    className={`${navigationMenuTriggerStyle()} nav-link`}
                                    render={
                                        <Link href={item.href}>
                                            {item.name}
                                        </Link>
                                    }
                                />
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger className="p-2">
                        <MenuIcon size={28} />
                    </SheetTrigger>

                    <SheetContent side="right">
                        <div className="flex flex-col gap-6 mt-10">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default Navbar;