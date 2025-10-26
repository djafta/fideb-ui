"use client"

import * as React from "react"
import { BadgePercent, BookOpen, FileText, LogOut, Settings2, } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, } from "@/components/ui/sidebar"
import settings from "@/lib/data/settings.json";
import { useAuth } from "@/providers";
import { useRouter } from "next/navigation";

const roles = ["FIDEB_CON", "FIDEB_PEN", "FIDEB_ACT"]

// This is sample data.
const data = {
  navMain: [
    {
      title: "Pedidos",
      url: "#",
      icon: FileText,
      roles,
      items: [
        {
          title: "Enviados",
          url: "/requests?type=sent",
          roles
        },
        {
          title: "Respondidos",
          url: "/requests?type=answered",
          roles,
        },
        {
          title: "Pendentes",
          url: "/requests?type=pending",
          roles,
        },
      ],
    },
    {
      title: "Respostas",
      url: "#",
      icon: FileText,
      roles,
      items: [
        {
          title: "Bem sucedidas",
          url: "/responses?type=successfully",
          roles
        },
        {
          title: "Pendentes",
          url: "/responses?type=pending",
          roles,
        },
        {
          title: "De rejeição",
          url: "/responses?type=rejected",
          roles,
        },
      ],
    },
    {
      title: "Descontos",
      url: "#",
      icon: BadgePercent,
      roles,
      items: [
        {
          title: "Todos",
          url: "/discounts",
          roles,
        },
        {
          title: "Fixados",
          url: "/discounts?situation=fixed",
          roles,
        },
        {
          title: "Cancelados",
          url: "/discounts?situation=cancelled",
          roles
        },
        {
          title: "Rejeitados",
          url: "/discounts?situation=pending_action",
          roles
        },
        {
          title: "Pendentes",
          url: "/discounts?situation=pending_fixing,pending_update,pending_cancellation",
          roles
        },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      roles: ["FIDEB_ADM"],
      items: [
        {
          title: "Todas",
          url: "/settings/all",
          roles: ["FIDEB_ADM"],
        },
        ...
          Object.keys(settings).map((key) => {
            return {
              title: key[0].toUpperCase().concat(key.slice(1)),
              url: `/settings/${ key.toLowerCase() }`,
            }
          })
      ],
    },
    {
      title: "Documentação",
      url: "#",
      icon: BookOpen,
      roles: [...roles, "FIDEB_ADM"],
      items: [
        {
          title: "Introdução",
          url: "#",
          roles: [...roles, "FIDEB_ADM"]
        },
        {
          title: "Sobre",
          url: "#",
          roles: [...roles, "FIDEB_ADM"]
        }
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon" { ...props }>
      <SidebarHeader>
        <NavUser user={ user }/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={ data.navMain }/>
      </SidebarContent>
      <SidebarFooter>
        <button
          onClick={()=>router.push("/sign-out")}
          className={ "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" }
        >
          <LogOut/>
          Sair
        </button>
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  )
}
