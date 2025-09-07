/*
** components/sidebars/dashboard.tsx
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Guides",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Clients",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Trips",
    url: "#",
    icon: Search,
  },
  {
    title: "Messages",
    url: "#",
    icon: Settings,
  },
  {
    title: "Billing",
    url: "#",
    icon: Settings,
  },
  {
    title: "Gary",
    url: "#",
    icon: Settings,
  },
]
 
export function DashboardSidebar() {
  return (
    <Sidebar>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel className="mt-3 mb-10">
                  <img src="/GLMBadgeLight.svg" className="dark:hidden" />
                  <img src="/GLMBadgeDark.svg" className="hidden dark:block" />
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  )
}