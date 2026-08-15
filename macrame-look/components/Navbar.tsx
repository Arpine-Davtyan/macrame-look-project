"use client";

import { useState } from "react";
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Logo from "./Logo";
import { menuItems } from "@/lib/constants/info";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="navbar-block">
            {/* Logo */}
            <Logo />

            {/* Desktop */}
            <div className="hidden sm:block">
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
                <Sheet
                    open={open}
                    onOpenChange={setOpen}
                >
                    <SheetTrigger
                        type="button"
                        aria-label="Բացել մենյուն"
                        className="p-2"
                    >
                        <MenuIcon
                            size={28}
                            className="text-ivory"
                        />
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="mobile-navbar"
                    >
                        {/* Logo */}
                        <div className="mb-14 flex justify-center">
                            <Logo />
                        </div>

                        {/* Navigation */}
                        <nav className="flex flex-col">
                            {menuItems.map((item, index) => (
                                <div key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="mobile-nav-link"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span>{item.name}</span>
                                    </Link>

                                    {index < menuItems.length - 1 && (
                                        <div className="h-px w-full bg-white/10" />
                                    )}
                                </div>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default Navbar;