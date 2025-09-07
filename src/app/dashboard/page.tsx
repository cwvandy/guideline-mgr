/*
** app/dashboard/page.tsx
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

import { Metadata } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/layouts/dashboard";

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Dashboard() {
    return (
        <DashboardLayout>
            <div className="my-5 mx-auto max-w-lg rounded-xl border bg-foreground/5 p-5 md:p-10 text-center">
                Dashboard
            </div>
        </DashboardLayout>
    );
}