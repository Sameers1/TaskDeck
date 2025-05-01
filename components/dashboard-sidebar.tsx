"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Home, Plus, LogOut, Users, History, Settings, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="relative">
      <Sidebar collapsible="icon" className="border-r shadow-sm">
        <SidebarHeader className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground group-data-[collapsible=icon]:hidden">
                Scrum Poker
              </span>
            </Link>
          </div>
          <Link href="/sessions/new">
            <Button 
              className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg group-data-[collapsible=icon]:p-2"
              size="sm"
            >
              <Plus className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">New Session</span>
            </Button>
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
                <Link href="/dashboard">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard/sessions"} tooltip="My Sessions">
                <Link href="/dashboard/sessions">
                  <Users className="h-4 w-4" />
                  <span>My Sessions</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard/history"} tooltip="History">
                <Link href="/dashboard/history">
                  <History className="h-4 w-4" />
                  <span>History</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"} tooltip="Settings">
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={user?.name || "Profile"}>
                <div className="rounded-lg bg-muted p-1">
                  <User className="h-4 w-4" />
                </div>
                <span className="truncate">{user?.isGuest ? `Guest: ${user.name}` : user?.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="absolute -right-3 top-6">
        <SidebarTrigger className="rounded-full border bg-background shadow-sm" />
      </div>
    </div>
  )
}
