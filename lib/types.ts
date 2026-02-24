export type BoardStage =
  | "backlog"
  | "discovery"
  | "in-progress"
  | "review"
  | "qa"
  | "shipped"
  | "measured"

export type Priority = "low" | "medium" | "high" | "urgent"
export type ValidationState = "validated" | "partially-validated" | "override"

export type TagType = "research" | "ux" | "ui" | "content" | "validation"

export interface Reviewer {
  id: string
  name: string
  role: string
  approved: boolean
}

export interface Assignee {
  id: string
  name: string
  role: string
  avatar?: string
}

export interface ImpactMetrics {
  engagement?: number
  conversion?: number
  retention?: number
}

export interface AuditChecklistItem {
  id: string
  label: string
  checked: boolean
}

export interface ValidationGate {
  hypothesis: string
  evidence: string
  confidence: "low" | "medium" | "high"
  state: ValidationState
  overrideReason?: string
}

export interface Task {
  id: string
  title: string
  columnId: BoardStage
  assignee?: Assignee
  dueDate?: string
  createdAt: string
  createdBy: string
  priority: Priority
  tags: TagType[]
  commentsPreview: string
  activityCount: number
  impactMetrics?: ImpactMetrics
  reviewers?: Reviewer[]
  auditChecklist: AuditChecklistItem[]
  validationGate: ValidationGate
}

export interface Column {
  id: BoardStage
  title: string
  description: string
}

export type TaskScopeFilter = "all" | "assigned" | "added"
export type BoardView = "board" | "list"
