"use client";

import { InstagramLogoIcon, TelegramLogoIcon, TiktokLogoIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="section bg-purple/80">
            <div className="container flex justify-between">
                <Link
                    href="/"
                >
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={110}
                        height={50}
                        loading="eager"
                    />
                </Link>
                <div className="social-menu">
                    <Link
                        href="/"
                        target="_blank"
                    >
                        <InstagramLogoIcon
                            size={25}
                            className="text-ivory"
                        />
                    </Link>
                    <Link
                        href="/"
                        target="_blank"
                    >
                        <TiktokLogoIcon
                            size={25}
                            className="text-ivory"
                        />
                    </Link>
                    <Link
                        href="/"
                        target="_blank"
                    >
                        <TelegramLogoIcon
                            size={25}
                            className="text-ivory"
                        />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
