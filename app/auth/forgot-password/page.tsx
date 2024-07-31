import { Logo } from "@/components/logo"
import { ForgotPasswordForm } from "./_components/forgot-password-form"

const ForgotPasswordPage = () => {
    return (
        <main className="flex flex-row justify-center min-h-screen w-full">
            <ForgotPasswordForm />
            <Logo />
        </main>
    )
}

export default ForgotPasswordPage