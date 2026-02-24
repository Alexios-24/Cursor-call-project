"use client"

import {
  BellIcon,
  BlocksIcon,
  BriefcaseBusinessIcon,
  FileTextIcon,
  GlobeIcon,
  LayoutGridIcon,
  PaletteIcon,
  SearchIcon,
  SettingsIcon,
  UserCircle2Icon,
  UsersRoundIcon,
  FlaskConicalIcon,
} from "lucide-react"

import { ThemeToggle } from "@/components/design-board/ThemeToggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const PRIMARY_ITEMS = [
  { label: "Search", icon: SearchIcon, active: false },
  { label: "UX Design", icon: PaletteIcon, active: true },
  { label: "Research", icon: FlaskConicalIcon, active: false },
  { label: "Usability", icon: UsersRoundIcon, active: false },
  { label: "Projects", icon: BriefcaseBusinessIcon, active: false },
  { label: "Browse", icon: LayoutGridIcon, active: false },
]

const FOOTER_ITEMS = [
  { label: "Docs", icon: FileTextIcon },
  { label: "Alerts", icon: BellIcon },
  { label: "Settings", icon: SettingsIcon },
  { label: "Account", icon: UserCircle2Icon },
]

export function DesignSidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border/80">
      <SidebarContent className="items-center pt-4">
        <div className="mb-4 flex items-center justify-center rounded-xl border border-sidebar-border bg-sidebar-accent/60 p-2">
          <BlocksIcon className="size-5" />
        </div>

        <SidebarGroup className="px-2">
          <SidebarMenu className="gap-1">
            {PRIMARY_ITEMS.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  aria-label={item.label}
                  isActive={item.active}
                  className="h-10 items-center justify-center px-2"
                  tooltip={item.label}
                >
                  <item.icon className="size-4" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="items-center px-2 pb-4">
        <SidebarMenu className="w-full gap-1">
          {FOOTER_ITEMS.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                aria-label={item.label}
                className="h-9 items-center justify-center px-2"
                tooltip={item.label}
              >
                <item.icon className="size-4" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <ThemeToggle />
        <button
          aria-label="Workspace visibility"
          className="text-muted-foreground hover:text-foreground mt-1 rounded-md p-1 transition-colors"
          type="button"
        >
          <GlobeIcon className="size-4" />
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}
