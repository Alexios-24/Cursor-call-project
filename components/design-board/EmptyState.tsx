"use client"

import { LightbulbIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function EmptyState({ stageLabel }: { stageLabel: string }) {
  return (
    <div className="bg-background/80 text-muted-foreground grid min-h-[112px] place-items-center rounded-lg border border-dashed p-3 text-center">
      <div className="space-y-2">
        <p className="text-xs font-medium">No tasks yet in {stageLabel}</p>
        <p className="text-[11px]">
          Add a task to keep workflow momentum visible for everyone.
        </p>
        <Button size="sm" variant="outline" className="h-7 text-xs">
          <PlusIcon />
          Add task
        </Button>
        <p className="inline-flex items-center justify-center gap-1 text-[10px]">
          <LightbulbIcon className="size-3" />
          Tip: Add validation notes early to reduce review loops.
        </p>
      </div>
    </div>
  )
}
