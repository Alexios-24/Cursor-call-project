"use client"

import { ChevronDownIcon, MenuIcon, UserPlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TOP_TABS = [
  "Overview",
  "Tasks",
  "Threads",
  "Resources",
  "Workflows",
  "Research",
  "Usability",
  "Projects",
]

export function BoardHeader() {
  return (
    <header className="border-b border-border/80 bg-background/90 px-4 py-3 backdrop-blur-sm lg:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <SidebarTrigger className="md:hidden">
            <MenuIcon />
          </SidebarTrigger>
          <Tabs defaultValue="Tasks">
            <TabsList className="flex-wrap bg-transparent p-0">
              {TOP_TABS.map((tab) => (
                <TabsTrigger
                  value={tab}
                  key={tab}
                  className="data-active:bg-muted data-active:text-foreground rounded-md px-2.5 py-1 text-xs"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs">
            Manage
            <ChevronDownIcon />
          </Button>
          <Button size="sm" className="text-xs">
            <UserPlusIcon />
            Invite
          </Button>
        </div>
      </div>
    </header>
  )
}
