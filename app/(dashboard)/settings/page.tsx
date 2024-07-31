import { Separator } from "@/components/ui/separator"

const SettingsPage = () => {
    return (
        <main className="mx-4 pb-20">
            <div className="space-y-4 min-h-max max-w-[1200px] mx-auto rounded-md -mt-20 bg-white shadow-md p-6">
                <h2 className="text-2xl font-bold">
                    Settings
                </h2>
                <Separator />
                <div className="flex items-center justify-between font-semibold text-md">
                    <h3>
                        Bank account
                    </h3>
                    <h4 className="-ml-10">
                        Bank account Not connected
                    </h4>
                    <p className="cursor-pointer">
                        Connect
                    </p>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-semibold text-md">
                    <h3>
                        Subscription
                    </h3>
                    <h4>
                        Subscription inActive
                    </h4>
                    <p className="cursor-pointer">
                        Manage Subscription
                    </p>
                </div>
            </div>
        </main>
    )
}

export default SettingsPage