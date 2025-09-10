/*
** app/dashboard/page.tsx
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { BackendUser } from "@/lib/types";

import { Metadata } from "next";
import DashboardLayout from "@/components/layouts/dashboard";
import { AuthLogoutButton } from "@/components/auth/buttons/auth-logout-button";

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Dashboard() {

    //const { data: user } = useSWR("auth/user/", fetcher);
    //let backend_user = user as BackendUser;
    //console.log("dashboard user_type: ", backend_user);
    
    return (
        <DashboardLayout>
            <div className="my-5 mx-auto max-w-lg rounded-xl border bg-foreground/5 p-5 md:p-10 text-center">
                Dashboard
                <AuthLogoutButton />
            </div>
        </DashboardLayout>
    );
}