"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
                <Sheet>
                    <SheetTrigger>
                        <button
                            type="button"
                            aria-label="Բացել մենյուն"
                            className="p-2"
                        >
                            <MenuIcon
                                size={28}
                                className="text-ivory"
                            />
                        </button>
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="mobile-navbar"
                    >
                        {/* Logo */}
                        <div className="mb-14 flex justify-center">
                            <Image
                                src="/images/logo.png"
                                alt="Macrame Look"
                                width={130}
                                height={60}
                                className="h-auto w-30 object-contain"
                                loading="eager"
                            />
                        </div>

                        {/* Navigation */}
                        <nav className="flex flex-col">
                            {menuItems.map((item, index) => (
                                <div key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center py-2 text-lg font-dm-sans tracking-wide text-ivory transition-all duration-300"
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