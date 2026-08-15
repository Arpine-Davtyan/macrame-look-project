"use client";

import { InstagramLogoIcon, TelegramLogoIcon, TiktokLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";
import Logo from "./Logo";
import { socialMedia } from "@/lib/constants/info";

const icons = {
    instagram: InstagramLogoIcon,
    tiktok: TiktokLogoIcon,
    telegram: TelegramLogoIcon,
} as const;

const Footer = () => {
    return (
        <footer className="section bg-purple/80">
            <div className="container flex justify-between">
                <Logo />

                <div className="social-menu">
                    {socialMedia.map((item, index) => {
                        const Icon = icons[item.icon as keyof typeof icons];

                        return (
                            <Link
                                href={item.link}
                                target="_blank"
                                key={`${item.icon}-${index}`}
                            >
                                {Icon && (
                                    <Icon
                                        size={25}
                                        className="text-ivory"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </footer >
    )
}

export default Footer
