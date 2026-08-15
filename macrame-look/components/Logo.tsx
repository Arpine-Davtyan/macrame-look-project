import Link from "next/link";
import Image from 'next/image';

const Logo = () => {
    return (
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
    )
}

export default Logo
