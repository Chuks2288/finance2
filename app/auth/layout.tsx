
type Props = {
    children: React.ReactNode
}

const AuthLayout = ({
    children
}: Props) => {
    return (
        <main className="w-full">
            {children}
        </main>
    )
}

export default AuthLayout