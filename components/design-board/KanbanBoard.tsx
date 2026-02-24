"use client"

import * as React from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"

import { Column } from "@/components/design-board/Column"
import { Card, CardContent } from "@/components/ui/card"
import { useBoardStore } from "@/lib/store"
import { BoardStage, Task } from "@/lib/types"

function taskMatches(task: Task, scope: "all" | "assigned" | "added", currentUserId: string) {
  if (scope === "assigned") {
    return task.assignee?.id === currentUserId
  }

  if (scope === "added") {
    return task.createdBy === currentUserId
  }

  return true
}

function taskSearchMatches(task: Task, query: string) {
  if (!query) {
    return true
  }
  const normalized = query.toLowerCase()
  return (
    task.id.toLowerCase().includes(normalized) ||
    task.title.toLowerCase().includes(normalized) ||
    task.tags.some((tag) => tag.toLowerCase().includes(normalized))
  )
}

function taskTagMatches(task: Task, activeTags: string[]) {
  if (!activeTags.length) {
    return true
  }
  return activeTags.every((tag) => task.tags.includes(tag as Task["tags"][number]))
}

function ListView({ tasks }: { tasks: Record<BoardStage, Task[]> }) {
  const columns = useBoardStore((state) => state.columns)

  return (
    <div className="space-y-3">
      {columns.map((column) => (
        <Card key={column.id} className="py-0">
          <CardContent className="space-y-2 p-3">
            <p className="text-sm font-semibold">
              {column.title} <span className="text-muted-foreground text-xs">({tasks[column.id].length})</span>
            </p>
            {tasks[column.id].length ? (
              <ul className="space-y-1">
                {tasks[column.id].map((task) => (
                  <li
                    key={task.id}
                    className="bg-muted/40 flex items-center justify-between rounded-md px-2 py-1.5 text-xs"
                  >
                    <span className="font-medium">
                      {task.id} · {task.title}
                    </span>
                    <span className="text-muted-foreground capitalize">{task.priority}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-xs">No tasks yet.</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function findTaskStage(taskId: string, tasksByColumn: Record<BoardStage, Task[]>) {
  const entries = Object.entries(tasksByColumn) as Array<[BoardStage, Task[]]>
  return entries.find(([, tasks]) => tasks.some((task) => task.id === taskId))?.[0]
}

export function KanbanBoard() {
  const columns = useBoardStore((state) => state.columns)
  const tasksByColumn = useBoardStore((state) => state.tasksByColumn)
  const scope = useBoardStore((state) => state.scope)
  const searchQuery = useBoardStore((state) => state.searchQuery)
  const activeTags = useBoardStore((state) => state.activeTags)
  const currentUserId = useBoardStore((state) => state.currentUserId)
  const moveTask = useBoardStore((state) => state.moveTask)
  const view = useBoardStore((state) => state.view)

  const [activeTaskId, setActiveTaskId] = React.useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const filteredTasks = React.useMemo(() => {
    const entries = Object.entries(tasksByColumn) as Array<[BoardStage, Task[]]>
    return Object.fromEntries(
      entries.map(([stage, tasks]) => [
        stage,
        tasks.filter(
          (task) =>
            taskMatches(task, scope, currentUserId) &&
            taskSearchMatches(task, searchQuery) &&
            taskTagMatches(task, activeTags)
        ),
      ])
    ) as Record<BoardStage, Task[]>
  }, [activeTags, currentUserId, scope, searchQuery, tasksByColumn])

  const allTasks = React.useMemo(() => {
    return Object.values(tasksByColumn).flat()
  }, [tasksByColumn])

  const activeTask = activeTaskId ? allTasks.find((task) => task.id === activeTaskId) : null

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveTaskId(null)
    if (!over) {
      return
    }

    const activeId = String(active.id)
    const overId = String(over.id)
    if (activeId === overId) {
      return
    }

    const sourceStage = findTaskStage(activeId, tasksByColumn)
    if (!sourceStage) {
      return
    }

    const overData = over.data.current
    let targetStage: BoardStage | undefined
    let overTaskId: string | undefined

    if (overData?.type === "column") {
      targetStage = overData.columnId as BoardStage
    } else {
      targetStage = findTaskStage(overId, tasksByColumn)
      overTaskId = overId
    }

    if (!targetStage) {
      return
    }

    moveTask({ activeId, sourceStage, targetStage, overTaskId })
  }

  if (view === "list") {
    return (
      <div className="p-4 lg:p-6">
        <ListView tasks={filteredTasks} />
      </div>
    )
  }

  return (
    <div className="px-4 pb-8 lg:px-6 lg:pb-10">
      <div className="w-full overflow-x-auto overflow-y-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={(event) => setActiveTaskId(String(event.active.id))}
          onDragCancel={() => setActiveTaskId(null)}
          onDragEnd={handleDragEnd}
        >
          <div className="flex w-max min-h-[calc(100vh-13rem)] gap-4 py-4 pl-1 pr-4">
            {columns.map((column) => (
              <Column key={column.id} column={column} tasks={filteredTasks[column.id]} />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? (
              <Card className="w-[320px] py-0 shadow-sm">
                <CardContent className="p-3">
                  <p className="text-muted-foreground text-xs">{activeTask.id}</p>
                  <p className="text-sm font-semibold">{activeTask.title}</p>
                </CardContent>
              </Card>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
