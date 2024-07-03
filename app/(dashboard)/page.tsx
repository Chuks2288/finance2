"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logout } from "@/actions/user/logout";
import { useLogout } from "@/features/user/api/use-logout";




export default function Home() {

  const { mutate: logout } = useLogout();

  return (
    <div className="flex flex-col space-y-2">
      Overview
    </div>
  );
}
