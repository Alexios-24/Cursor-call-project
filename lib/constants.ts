import { BoardStage, Column, TagType, Task } from "@/lib/types"

export const BOARD_COLUMNS: Column[] = [
  { id: "backlog", title: "Backlog", description: "Requirements and intake" },
  { id: "discovery", title: "Discovery", description: "Research and framing" },
  { id: "in-progress", title: "In Progress", description: "Design execution" },
  { id: "review", title: "Review", description: "Design lead and PM review" },
  { id: "qa", title: "QA", description: "Validation and handoff checks" },
  { id: "shipped", title: "Shipped", description: "Live experiences" },
  { id: "measured", title: "Measured", description: "Impact readout" },
]

export const TAG_OPTIONS: TagType[] = [
  "research",
  "ux",
  "ui",
  "content",
  "validation",
]

const SHARED_AUDIT = [
  { id: "a11y", label: "WCAG AA contrast and focus states", checked: true },
  { id: "consistency", label: "Design system token compliance", checked: true },
  { id: "heuristics", label: "Heuristic evaluation completed", checked: false },
]

export const INITIAL_TASKS: Record<BoardStage, Task[]> = {
  backlog: [
    {
      id: "DT-103",
      title: "Create mobile nav hypotheses for onboarding drop-off",
      columnId: "backlog",
      createdAt: "2026-02-06",
      createdBy: "john-smith",
      dueDate: "2026-02-28",
      priority: "high",
      tags: ["research", "ux"],
      commentsPreview: "Need assumptions from latest funnel report.",
      activityCount: 3,
      assignee: {
        id: "john-smith",
        name: "John Smith",
        role: "UX Designer",
      },
      validationGate: {
        hypothesis:
          "Simplifying first-run navigation should reduce onboarding abandonment.",
        evidence: "Awaiting moderated test sessions.",
        confidence: "low",
        state: "partially-validated",
      },
      auditChecklist: SHARED_AUDIT,
      reviewers: [
        { id: "lead-1", name: "Jane D.", role: "Design Lead", approved: false },
        { id: "pm-1", name: "Alex P.", role: "Product Manager", approved: false },
      ],
    },
  ],
  discovery: [
    {
      id: "DT-099",
      title: "Synthesize interview findings for dashboard IA",
      columnId: "discovery",
      createdAt: "2026-02-01",
      createdBy: "alex-pm",
      dueDate: "2026-02-25",
      priority: "medium",
      tags: ["research", "content", "validation"],
      commentsPreview: "Affinity map uploaded. Need confidence scoring.",
      activityCount: 8,
      assignee: {
        id: "maya-research",
        name: "Maya R.",
        role: "UX Researcher",
      },
      validationGate: {
        hypothesis: "Users struggle to locate reporting entry points.",
        evidence: "8/12 participants hesitated during first click test.",
        confidence: "high",
        state: "validated",
      },
      auditChecklist: [
        ...SHARED_AUDIT.map((item) => ({ ...item })),
        { id: "evidence", label: "Evidence linked in notes", checked: true },
      ],
      reviewers: [
        { id: "lead-1", name: "Jane D.", role: "Design Lead", approved: true },
        { id: "pm-1", name: "Alex P.", role: "Product Manager", approved: false },
      ],
    },
  ],
  "in-progress": [],
  review: [
    {
      id: "DT-094",
      title: "Finalize high-fidelity billing settings flow",
      columnId: "review",
      createdAt: "2026-01-28",
      createdBy: "john-smith",
      dueDate: "2026-02-24",
      priority: "urgent",
      tags: ["ui", "ux", "validation"],
      commentsPreview: "PM requested a stronger recovery pattern for errors.",
      activityCount: 11,
      assignee: {
        id: "john-smith",
        name: "John Smith",
        role: "UX Designer",
      },
      validationGate: {
        hypothesis:
          "Reducing form steps and improving error language increases completion.",
        evidence: "Prototype test shows +14% completion in task-based study.",
        confidence: "high",
        state: "validated",
      },
      auditChecklist: [
        ...SHARED_AUDIT.map((item) => ({ ...item })),
        { id: "copy", label: "Content style audit completed", checked: true },
      ],
      reviewers: [
        { id: "lead-1", name: "Jane D.", role: "Design Lead", approved: true },
        { id: "pm-1", name: "Alex P.", role: "Product Manager", approved: true },
      ],
    },
  ],
  qa: [
    {
      id: "DT-086",
      title: "QA pass for accessibility and keyboard flow",
      columnId: "qa",
      createdAt: "2026-01-21",
      createdBy: "qa-lead",
      dueDate: "2026-02-26",
      priority: "high",
      tags: ["validation", "ux"],
      commentsPreview: "Two focus-order issues remaining in modal.",
      activityCount: 6,
      assignee: {
        id: "sam-qa",
        name: "Sam K.",
        role: "QA Engineer",
      },
      validationGate: {
        hypothesis: "Keyboard-first flow remains efficient after redesign.",
        evidence: "Traversal time unchanged in scripted keyboard test.",
        confidence: "medium",
        state: "partially-validated",
      },
      auditChecklist: [
        ...SHARED_AUDIT.map((item) => ({ ...item })),
        { id: "handoff", label: "Engineering handoff checklist signed", checked: true },
      ],
      reviewers: [
        { id: "lead-1", name: "Jane D.", role: "Design Lead", approved: true },
        { id: "pm-1", name: "Alex P.", role: "Product Manager", approved: true },
      ],
    },
  ],
  shipped: [
    {
      id: "DT-074",
      title: "Launch redesigned task create modal",
      columnId: "shipped",
      createdAt: "2026-01-10",
      createdBy: "john-smith",
      dueDate: "2026-02-10",
      priority: "medium",
      tags: ["ui", "content"],
      commentsPreview: "Monitoring event payload quality this week.",
      activityCount: 4,
      assignee: {
        id: "john-smith",
        name: "John Smith",
        role: "UX Designer",
      },
      validationGate: {
        hypothesis: "Inline help text reduces first-attempt errors.",
        evidence: "Error rate dropped from 9.1% to 5.8%.",
        confidence: "high",
        state: "validated",
      },
      auditChecklist: SHARED_AUDIT.map((item) => ({ ...item, checked: true })),
      reviewers: [
        { id: "lead-1", name: "Jane D.", role: "Design Lead", approved: true },
        { id: "pm-1", name: "Alex P.", role: "Product Manager", approved: true },
      ],
    },
  ],
  measured: [
    {
      id: "DT-063",
      title: "Measure impact of redesigned project switcher",
      columnId: "measured",
      createdAt: "2025-12-20",
      createdBy: "john-smith",
      dueDate: "2026-02-01",
      priority: "medium",
      tags: ["validation", "ux", "ui"],
      commentsPreview: "Leadership requested impact summary for QBR.",
      activityCount: 5,
      assignee: {
        id: "john-smith",
        name: "John Smith",
        role: "UX Designer",
      },
      impactMetrics: {
        engagement: 9.8,
        conversion: 3.2,
        retention: 2.1,
      },
      validationGate: {
        hypothesis: "Simplified switcher layout improves exploration depth.",
        evidence: "Average session depth increased from 4.1 to 4.7 actions.",
        confidence: "high",
        state: "validated",
      },
      auditChecklist: SHARED_AUDIT.map((item) => ({ ...item, checked: true })),
      reviewers: [
        { id: "lead-1", name: "Jane D.", role: "Design Lead", approved: true },
        { id: "pm-1", name: "Alex P.", role: "Product Manager", approved: true },
      ],
    },
  ],
}
