"use client"

import * as React from "react"
import {
    BookOpen,
    BadgePercent,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    FileText,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import settings from "@/lib/data/settings.json";

// This is sample data.
const data = {
    user: {
        name: "asaranga",
        email: "adao.saranga@bancomais.co.mz",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "MAIS",
            logo: GalleryVerticalEnd,
            location: "Boane",
        },
    ],
    navMain: [
        {
            title: "Pedidos",
            url: "#",
            icon: FileText,
            isActive: true,
            items: [
                {
                    title: "Enviados",
                    url: "#",
                },
                {
                    title: "Respondidos",
                    url: "#",
                },
                {
                    title: "Pendentes",
                    url: "#",
                },
            ],
        },
        {
            title: "Descontos",
            url: "#",
            icon: BadgePercent,
            items: [
                {
                    title: "Fixados",
                    url: "/discounts/fixed",
                },
                {
                    title: "Cancelados",
                    url: "/discounts/canceled",
                },
                {
                    title: "Com erro do banco",
                    url: "/discounts/pending_action",
                },
                {
                    title: "Pendentes",
                    url: "/discounts/pending",
                },
            ],
        },
        {
            title: "Definições",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Todas",
                    url: "/settings/all",
                },
                ...
                    Object.keys(settings).map((key) => {
                        return {
                            title: key[0].toUpperCase().concat(key.slice(1)),
                            url: `/settings/${key.toLowerCase()}`,
                        }
                    })
            ],
        },
        {
            title: "Documentação",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introdução",
                    url: "#",
                },
                {
                    title: "Sobre",
                    url: "#",
                }
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" { ...props }>
            <SidebarHeader>
                <TeamSwitcher teams={ data.teams }/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={ data.navMain }/>
                <NavProjects projects={ data.projects }/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={ data.user }/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
