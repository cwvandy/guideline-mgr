/*
** components/auth/buttons/auth-logout-button.tsx
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

"use client";

import { AuthUtils } from "@/utils/auth";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const login_path = process.env.NEXT_PUBLIC_LOGIN_PATH!;

const AuthLogoutButton = () => {

    const router = useRouter();
    const { logout, removeTokens } = AuthUtils();

    // What to do when clicked
    const handleLogout = () => {
        logout().res(() => {
            removeTokens();
            router.push(login_path);
        }).catch(() => {
            removeTokens();
            router.push(login_path);
        });
    };

    return (
        <Button variant="outline" onClick={handleLogout}>
            Logout
        </Button>
    );
}

export { AuthLogoutButton };