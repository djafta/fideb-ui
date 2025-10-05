"use client"

import { ChevronRight, LayoutDashboardIcon, type LucideIcon } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { PrivateComponent } from "@/components/private-component";

export function NavMain({
                          items,
                        }: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    roles?: string[]
    items?: {
      title: string
      url: string
      roles?: string[]
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href={ "/dashboard" }>
            <SidebarMenuButton tooltip={ "Dashboard" }>
              <LayoutDashboardIcon/>
              <span>Dashboard</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        { items.map((item) => (
          <PrivateComponent key={ item.title } roles={item.roles}>
            <Collapsible
              asChild
              defaultOpen={ item.isActive }
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={ item.title }>
                    { item.icon && <item.icon/> }
                    <span>{ item.title }</span>
                    <ChevronRight
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    { item.items?.map((subItem) => (
                      <PrivateComponent key={ subItem.title } roles={ subItem.roles }>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <Link href={ subItem.url }>
                              <span>{ subItem.title }</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </PrivateComponent>
                    )) }
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </PrivateComponent>
        )) }
      </SidebarMenu>
    </SidebarGroup>
  )
}
