"use client"

import { create } from "zustand"

import { BOARD_COLUMNS, INITIAL_TASKS } from "@/lib/constants"
import { BoardStage, BoardView, Priority, TagType, Task, TaskScopeFilter } from "@/lib/types"

interface MoveTaskParams {
  activeId: string
  sourceStage: BoardStage
  targetStage: BoardStage
  overTaskId?: string
}

interface AddTaskParams {
  title: string
  columnId: BoardStage
  assigneeName?: string
  dueDate?: string
  priority: Priority
}

interface BoardState {
  currentUserId: string
  columns: typeof BOARD_COLUMNS
  tasksByColumn: Record<BoardStage, Task[]>
  scope: TaskScopeFilter
  searchQuery: string
  activeTags: TagType[]
  view: BoardView
  isAddTaskSheetOpen: boolean
  addTaskDraftColumn: BoardStage
  setScope: (scope: TaskScopeFilter) => void
  setSearchQuery: (query: string) => void
  toggleTag: (tag: TagType) => void
  setView: (view: BoardView) => void
  openAddTaskSheet: (columnId?: BoardStage) => void
  closeAddTaskSheet: () => void
  addTask: (params: AddTaskParams) => void
  moveTask: (params: MoveTaskParams) => void
  toggleAuditItem: (taskId: string, itemId: string) => void
  setValidationOverride: (taskId: string, overrideReason: string) => void
}

function deepCloneTasks(state: Record<BoardStage, Task[]>) {
  return {
    backlog: [...state.backlog],
    discovery: [...state.discovery],
    "in-progress": [...state["in-progress"]],
    review: [...state.review],
    qa: [...state.qa],
    shipped: [...state.shipped],
    measured: [...state.measured],
  }
}

function findTaskLocation(tasksByColumn: Record<BoardStage, Task[]>, taskId: string) {
  const stages: BoardStage[] = [
    "backlog",
    "discovery",
    "in-progress",
    "review",
    "qa",
    "shipped",
    "measured",
  ]

  for (const stage of stages) {
    const index = tasksByColumn[stage].findIndex((task) => task.id === taskId)
    if (index !== -1) {
      return { stage, index }
    }
  }

  return null
}

function getNextTaskId(tasksByColumn: Record<BoardStage, Task[]>) {
  let maxId = 0
  for (const tasks of Object.values(tasksByColumn)) {
    for (const task of tasks) {
      const match = task.id.match(/^DT-(\d+)$/)
      if (!match) {
        continue
      }
      maxId = Math.max(maxId, Number(match[1]))
    }
  }
  return `DT-${String(maxId + 1).padStart(3, "0")}`
}

function formatTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

function toAssigneeId(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const useBoardStore = create<BoardState>((set) => ({
  currentUserId: "john-smith",
  columns: BOARD_COLUMNS,
  tasksByColumn: INITIAL_TASKS,
  scope: "all",
  searchQuery: "",
  activeTags: [],
  view: "board",
  isAddTaskSheetOpen: false,
  addTaskDraftColumn: "backlog",
  setScope: (scope) => set({ scope }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  toggleTag: (tag) =>
    set((state) => ({
      activeTags: state.activeTags.includes(tag)
        ? state.activeTags.filter((item) => item !== tag)
        : [...state.activeTags, tag],
    })),
  setView: (view) => set({ view }),
  openAddTaskSheet: (columnId) =>
    set((state) => ({
      isAddTaskSheetOpen: true,
      addTaskDraftColumn: columnId ?? state.addTaskDraftColumn,
    })),
  closeAddTaskSheet: () => set({ isAddTaskSheetOpen: false }),
  addTask: ({ title, columnId, assigneeName, dueDate, priority }) =>
    set((state) => {
      const next = deepCloneTasks(state.tasksByColumn)
      const trimmedTitle = title.trim()
      if (!trimmedTitle) {
        return state
      }

      const trimmedAssigneeName = assigneeName?.trim()
      const task: Task = {
        id: getNextTaskId(state.tasksByColumn),
        title: trimmedTitle,
        columnId,
        createdAt: formatTodayDate(),
        createdBy: state.currentUserId,
        dueDate: dueDate || undefined,
        priority,
        tags: [],
        commentsPreview: "",
        activityCount: 0,
        auditChecklist: [],
        validationGate: {
          hypothesis: "Awaiting validation details.",
          evidence: "No evidence recorded yet.",
          confidence: "low",
          state: "partially-validated",
        },
        assignee: trimmedAssigneeName
          ? {
              id: toAssigneeId(trimmedAssigneeName) || "unassigned",
              name: trimmedAssigneeName,
              role: "Designer",
            }
          : undefined,
      }

      next[columnId] = [task, ...next[columnId]]
      return {
        tasksByColumn: next,
        isAddTaskSheetOpen: false,
        addTaskDraftColumn: columnId,
      }
    }),
  moveTask: ({ activeId, sourceStage, targetStage, overTaskId }) =>
    set((state) => {
      const next = deepCloneTasks(state.tasksByColumn)
      const sourceTasks = next[sourceStage]
      const sourceIndex = sourceTasks.findIndex((task) => task.id === activeId)
      if (sourceIndex === -1) {
        return state
      }

      const [activeTask] = sourceTasks.splice(sourceIndex, 1)
      const movedTask = { ...activeTask, columnId: targetStage }

      const targetTasks = next[targetStage]
      if (!overTaskId) {
        targetTasks.push(movedTask)
      } else {
        const targetIndex = targetTasks.findIndex((task) => task.id === overTaskId)
        if (targetIndex === -1) {
          targetTasks.push(movedTask)
        } else {
          targetTasks.splice(targetIndex, 0, movedTask)
        }
      }

      return { tasksByColumn: next }
    }),
  toggleAuditItem: (taskId, itemId) =>
    set((state) => {
      const location = findTaskLocation(state.tasksByColumn, taskId)
      if (!location) {
        return state
      }

      const next = deepCloneTasks(state.tasksByColumn)
      const task = next[location.stage][location.index]
      next[location.stage][location.index] = {
        ...task,
        auditChecklist: task.auditChecklist.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        ),
      }

      return { tasksByColumn: next }
    }),
  setValidationOverride: (taskId, overrideReason) =>
    set((state) => {
      const location = findTaskLocation(state.tasksByColumn, taskId)
      if (!location) {
        return state
      }

      const next = deepCloneTasks(state.tasksByColumn)
      const task = next[location.stage][location.index]
      next[location.stage][location.index] = {
        ...task,
        validationGate: {
          ...task.validationGate,
          state: "override",
          overrideReason,
        },
      }

      return { tasksByColumn: next }
    }),
}))
