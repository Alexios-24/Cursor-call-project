"use client"

import * as React from "react"

import { useBoardStore } from "@/lib/store"
import { BoardStage, Priority } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const PRIORITY_OPTIONS: Array<{ value: Priority; label: string }> = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
]

export function AddTaskSheet() {
  const columns = useBoardStore((state) => state.columns)
  const isAddTaskSheetOpen = useBoardStore((state) => state.isAddTaskSheetOpen)
  const addTaskDraftColumn = useBoardStore((state) => state.addTaskDraftColumn)
  const closeAddTaskSheet = useBoardStore((state) => state.closeAddTaskSheet)
  const addTask = useBoardStore((state) => state.addTask)

  const [title, setTitle] = React.useState("")
  const [assigneeName, setAssigneeName] = React.useState("")
  const [dueDate, setDueDate] = React.useState("")
  const [columnId, setColumnId] = React.useState<BoardStage>(addTaskDraftColumn)
  const [priority, setPriority] = React.useState<Priority>("medium")
  const [titleError, setTitleError] = React.useState<string | null>(null)

  const resetForm = React.useCallback((nextColumn: BoardStage) => {
    setTitle("")
    setAssigneeName("")
    setDueDate("")
    setPriority("medium")
    setColumnId(nextColumn)
    setTitleError(null)
  }, [])

  React.useEffect(() => {
    if (isAddTaskSheetOpen) {
      setColumnId(addTaskDraftColumn)
      setTitleError(null)
    }
  }, [addTaskDraftColumn, isAddTaskSheetOpen])

  const handleClose = React.useCallback(() => {
    closeAddTaskSheet()
    resetForm(addTaskDraftColumn)
  }, [addTaskDraftColumn, closeAddTaskSheet, resetForm])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setTitleError("Title is required.")
      return
    }

    addTask({
      title: trimmedTitle,
      columnId,
      assigneeName: assigneeName.trim() || undefined,
      dueDate: dueDate || undefined,
      priority,
    })
    resetForm(columnId)
  }

  return (
    <Sheet
      open={isAddTaskSheetOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose()
        }
      }}
    >
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add Task</SheetTitle>
          <SheetDescription>Create a new task and add it to a board column.</SheetDescription>
        </SheetHeader>

        <form id="add-task-form" onSubmit={handleSubmit} className="grid gap-4 px-4 pb-4">
          <div className="grid gap-2">
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Create wireframes"
              autoFocus
            />
            {titleError ? <p className="text-destructive text-xs">{titleError}</p> : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-column">Column</Label>
            <Select value={columnId} onValueChange={(value) => setColumnId(value as BoardStage)}>
              <SelectTrigger id="task-column" className="w-full">
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((column) => (
                  <SelectItem key={column.id} value={column.id}>
                    {column.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-priority">Priority</Label>
            <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
              <SelectTrigger id="task-priority" className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {PRIORITY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-assignee">Assignee</Label>
            <Input
              id="task-assignee"
              value={assigneeName}
              onChange={(event) => setAssigneeName(event.target.value)}
              placeholder="Optional"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-due-date">Due date</Label>
            <Input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>
        </form>

        <SheetFooter className="border-t">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="add-task-form">
            Add task
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
