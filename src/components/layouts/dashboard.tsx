/*
** components/layouts/dashboard.tsx
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/sidebars/dashboard"
import { DashboardFooter } from "@/components/footers/dashboard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
        <DashboardFooter />
      </main>
    </SidebarProvider>
  );
}