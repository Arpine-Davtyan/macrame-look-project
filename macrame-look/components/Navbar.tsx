"use client";

import { useState } from "react";
import Link from "next/link";
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
import { ChevronDown, MenuIcon } from "lucide-react";
import Logo from "./Logo";
import { menuItems } from "@/lib/constants/info";
import { Category } from "@/lib/types/product";

type NavbarProps = {
    categories: Category[];
};

const Navbar = ({ categories }: NavbarProps) => {
    const [open, setOpen] = useState(false);
    const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

    const items = menuItems(categories);

    return (
        <div className="navbar-block">
            <Logo />

            {/* Desktop */}
            <div className="hidden md:block">
                <NavigationMenu>
                    <NavigationMenuList className="gap-3">
                        {items.map((item) => (
                            <NavigationMenuItem key={item.name}>
                                {item.children ? (
                                    <div className="group relative">
                                        <button
                                            type="button"
                                            className={`${navigationMenuTriggerStyle()} nav-link flex items-center gap-1`}
                                        >
                                            {item.name}

                                            <ChevronDown
                                                size={16}
                                                className="transition-transform duration-200 group-hover:rotate-180"
                                            />
                                        </button>

                                        {/* Dropdown */}
                                        <div className="invisible absolute left-1/2 top-12 z-50 w-52 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                            <div className="overflow-hidden rounded-xs border border-white/10 bg-[#8C85AD]">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className="block px-5 py-3 text-sm text-ivory transition-colors hover:bg-ivory/5"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <NavigationMenuLink
                                        className={`${navigationMenuTriggerStyle()} nav-link`}
                                        render={
                                            <Link href={item.href}>
                                                {item.name}
                                            </Link>
                                        }
                                    />
                                )}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
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
                            {items.map((item, index) => (
                                <div key={item.name}>
                                    {item.children ? (
                                        <>
                                            <button
                                                type="button"
                                                className="mobile-nav-link flex w-full items-center justify-between"
                                                onClick={() =>
                                                    setMobileCategoriesOpen(
                                                        !mobileCategoriesOpen
                                                    )
                                                }
                                            >
                                                <span>{item.name}</span>

                                                <ChevronDown
                                                    size={18}
                                                    className={`transition-transform duration-200 ${mobileCategoriesOpen
                                                        ? "rotate-180"
                                                        : ""
                                                        }`}
                                                />
                                            </button>

                                            {mobileCategoriesOpen && (
                                                <div className="pb-2 pl-4">
                                                    {item.children.map(
                                                        (child) => (
                                                            <Link
                                                                key={child.name}
                                                                href={child.href}
                                                                className="block border-b border-ivory/10 px-4 py-3 text-sm text-ivory transition-colors hover:text-white last:border-b-0" onClick={() =>
                                                                    setOpen(false)
                                                                }
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="mobile-nav-link"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span>{item.name}</span>
                                        </Link>
                                    )}

                                    {index < items.length - 1 && (
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