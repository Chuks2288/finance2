import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
    return (
        <Link
            href="/"
            className="hidden lg:flex items-center gap-x-2 cursor-pointer"
        >
            <Image
                src="/logo.svg"
                alt="Logo"
                width={25}
                height={25}
            />

            <h4 className="text-2xl text-white font-bold">
                Finance
            </h4>
        </Link>
    )
}

