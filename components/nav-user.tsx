"use client"

import { ChevronsUpDown, LogOut, } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation";
import * as React from "react";

export function NavUser({
                          user,
                        }: {
  user: {
    username: string;
    fullName: string;
    groups: string[];
    branch: string;
    branchName: string;
  } | undefined
}) {
  const { isMobile } = useSidebar()

  const router = useRouter();

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={ "" } alt={ user?.fullName }/>
                  <AvatarFallback
                    className="rounded-lg">{ user?.username?.substring(0, 2).toUpperCase() }</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{ user?.fullName }</span>
                  <span className="truncate text-xs">{ user?.username }</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4"/>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={ isMobile ? "bottom" : "right" }
              align="end"
              sideOffset={ 4 }
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={ "" } alt={ user?.fullName }/>
                    <AvatarFallback
                      className="rounded-lg">{ user?.username?.substring(0, 2).toUpperCase() }</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{ user?.fullName }</span>
                    <span className="truncate text-xs">{ user?.username }</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Balcão
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="gap-2 p-2"
              >
                { user?.branchName }
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem onClick={ () => router.push("/sign-out") }>
                <LogOut/>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
