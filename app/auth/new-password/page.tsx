import { Logo } from "@/components/logo"

import { NewPasswordForm } from "./_components/new-password-form"

const NewPasswordPage = () => {
    return (
        <main className="flex flex-row justify-center min-h-screen w-full">
            <NewPasswordForm />
            <Logo />
        </main>
    )
}

export default NewPasswordPage