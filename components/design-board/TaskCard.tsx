"use client"

import * as React from "react"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { CalendarClockIcon, UserRoundIcon } from "lucide-react"

import { Task } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function formatDueDate(dueDate?: string) {
  if (!dueDate) {
    return "No due date"
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(dueDate))
}

export function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "task",
      columnId: task.columnId,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  const taskNumericId = task.id.match(/\d+$/)?.[0]
  const taskIdLabel = taskNumericId ? `#${taskNumericId}` : task.id
  const assigneeLabel = task.assignee?.name ?? "None"
  const dueDateLabel = task.dueDate ? formatDueDate(task.dueDate) : "None"

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "border-border/80 bg-card cursor-grab py-0 shadow-none transition-colors active:cursor-grabbing",
        isDragging && "ring-primary/20 opacity-90 ring-2"
      )}
    >
      <CardContent className="space-y-5 p-6">
        <p className="text-muted-foreground/80 text-xs font-semibold tracking-wide">{taskIdLabel}</p>
        <h3 className="text-xl leading-tight font-semibold">{task.title}</h3>

        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-muted inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium">
            <UserRoundIcon className="text-muted-foreground size-4" />
            {assigneeLabel}
          </span>
          <span className="bg-muted inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium">
            <CalendarClockIcon className="text-muted-foreground size-4" />
            {dueDateLabel}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
