import { Link, usePage } from "@inertiajs/react"
import { LayoutDashboardIcon, Blocks, ListIcon, ChartBarIcon } from "lucide-react"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { dashboard } from "@/routes"
import { index as formsIndex } from "@/routes/forms"



const data = {

    navMain: [
        {
        title: "Home",
        url: dashboard.url(),
        icon: (
            <LayoutDashboardIcon
            />
        ),
        },
        {
        title: "Forms",
        url: formsIndex.url(),
        icon: (
            <ListIcon
            />
        ),
        },
        {
        title: "Analytics",
        url: "/analytics",
        icon: (
            <ChartBarIcon
            />
        ),
        },
    ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage<any>().props.auth.user;

    return (
        <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                className="data-[slot=sidebar-menu-button]:p-1.5!"
                render={<Link href="/dashboard" />}
                >
                <Blocks className="size-5!" />
                <span className="text-base font-semibold">Form Builder</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
            <NavUser user={user} />
        </SidebarFooter>
        </Sidebar>
    )
}
