import { currentUser } from "@/lib/auth"
import { Header } from "./_components/header"

type Props = {
    children: React.ReactNode
}
const DashboardLayout = async ({
    children
}: Props) => {
    const activeUser = await currentUser();

    return (
        <div>
            <Header user={activeUser as any} />
            <main>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout