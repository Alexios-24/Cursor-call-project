"use client"

import * as React from "react"
import dynamic from "next/dynamic"

import { AddTaskFAB } from "@/components/design-board/AddTaskFAB"
import { BoardHeader } from "@/components/design-board/BoardHeader"
import { DesignSidebar } from "@/components/design-board/DesignSidebar"
import { FilterBar } from "@/components/design-board/FilterBar"
import { ProfilePanel } from "@/components/design-board/ProfilePanel"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const KanbanBoard = dynamic(
  () => import("@/components/design-board/KanbanBoard").then((module) => module.KanbanBoard),
  {
    ssr: false,
    loading: () => (
      <div className="px-4 py-6 lg:px-6">
        <div className="text-muted-foreground rounded-lg border border-dashed px-4 py-10 text-sm">
          Loading board...
        </div>
      </div>
    ),
  }
)

export function BoardLayout() {
  return (
    <SidebarProvider
      defaultOpen
      style={{ "--sidebar-width": "5.25rem" } as React.CSSProperties}
    >
      <DesignSidebar />
      <SidebarInset className="min-h-svh">
        <div className="flex min-h-svh">
          <ProfilePanel />
          <div className="flex min-w-0 flex-1 flex-col">
            <BoardHeader />
            <FilterBar />
            <KanbanBoard />
          </div>
        </div>
        <AddTaskFAB />
      </SidebarInset>
    </SidebarProvider>
  )
}
