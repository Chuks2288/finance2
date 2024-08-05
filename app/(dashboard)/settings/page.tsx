import { useState, useEffect, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import { hasActiveSubscription } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { SettingsForm } from "./_components/settings-form";


const SettingsPage = async () => {

    const isPro = await hasActiveSubscription();

    return (
        <>

            <SettingsForm
                isPro={isPro}
            />
        </>
    );
}

export default SettingsPage;
