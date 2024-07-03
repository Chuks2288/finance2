import Image from "next/image"


export const Logo = () => {
    return (
        <div className="hidden lg:flex  flex-1 items-center justify-center bg-blue-500">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={120}
                height={120}
            />
        </div>
    )
}

