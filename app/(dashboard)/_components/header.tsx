import { User } from "@prisma/client"
import { Logo } from "./logo"
import { NavItems } from "./nav-items"
import { Profile } from "./profile"
import { WelcomeMsg } from "./welcome-msg"
import { Filter } from "./filter"

type Props = {
    user: User;
}

export const Header = ({
    user,
}: Props) => {

    return (
        <header className='min-h-[60vh] bg-blue-600 w-full py-8 px-4'>
            <div className="max-w-[1200px] mx-auto">
                <div className="flex items-center justify-between mb-10 lg:mb-20">
                    <div className="flex items-center lg:gap-x-16">
                        <Logo />
                        <NavItems />
                    </div>
                    <Profile
                        image={user?.image as string}
                        email={user?.email as string}
                    />
                </div>
                <div className="flex flex-col space-y-6">
                    <WelcomeMsg />
                    <Filter />
                </div>
            </div>
        </header>
    )
}

