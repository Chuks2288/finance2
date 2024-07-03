import { Logo } from "@/components/logo"
import { RegistrationForm } from "./_components/registration-form"

const RegistrationPage = () => {
    return (
        <main className="flex flex-row justify-center min-h-screen w-full">
            <RegistrationForm />
            <Logo />
        </main>
    )
}

export default RegistrationPage