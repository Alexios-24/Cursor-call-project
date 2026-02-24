"use client"

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { PlusIcon } from "lucide-react"

import { EmptyState } from "@/components/design-board/EmptyState"
import { TaskCard } from "@/components/design-board/TaskCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useBoardStore } from "@/lib/store"
import { Column as ColumnType, Task } from "@/lib/types"
import { cn } from "@/lib/utils"

export function Column({
  column,
  tasks,
}: {
  column: ColumnType
  tasks: Task[]
}) {
  const openAddTaskSheet = useBoardStore((state) => state.openAddTaskSheet)
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: "column",
      columnId: column.id,
    },
  })

  return (
    <Card
      className={cn(
        "w-[320px] shrink-0 py-0 shadow-none",
        isOver && "ring-primary/40 ring-2"
      )}
    >
      <CardHeader className="border-b pt-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm">{column.title}</CardTitle>
            <p className="text-muted-foreground mt-1 text-xs">{column.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={`Add task in ${column.title}`}
            onClick={() => openAddTaskSheet(column.id)}
          >
            <PlusIcon />
          </Button>
        </div>
        <Badge variant="outline" className="mt-2 w-fit text-[10px]">
          {tasks.length} tasks
        </Badge>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <div ref={setNodeRef} className="min-h-[420px] space-y-3">
          <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
          {!tasks.length ? <EmptyState stageLabel={column.title} /> : null}
        </div>
      </CardContent>
    </Card>
  )
}
