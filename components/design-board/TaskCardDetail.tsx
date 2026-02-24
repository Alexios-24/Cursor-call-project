"use client"

import { CheckCheckIcon, ChevronDownIcon, ShieldCheckIcon, SparklesIcon } from "lucide-react"

import { useBoardStore } from "@/lib/store"
import { Task } from "@/lib/types"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

function Metric({ label, value }: { label: string; value?: number }) {
  if (value === undefined) {
    return null
  }

  const sign = value > 0 ? "+" : ""
  return (
    <div className="bg-muted/40 flex items-center justify-between rounded-md border px-2 py-1 text-[10px]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{`${sign}${value.toFixed(1)}%`}</span>
    </div>
  )
}

export function TaskCardDetail({ task }: { task: Task }) {
  const toggleAuditItem = useBoardStore((state) => state.toggleAuditItem)
  const setValidationOverride = useBoardStore((state) => state.setValidationOverride)

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground mt-2 h-7 w-full justify-between px-1 text-xs"
        >
          Validation and audit
          <ChevronDownIcon className="size-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-2 text-xs">
        <div className="rounded-md border bg-background p-2">
          <p className="mb-1 inline-flex items-center gap-1 text-[11px] font-medium">
            <SparklesIcon className="size-3.5" />
            Validation gate
          </p>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            <span className="font-medium text-foreground">Hypothesis:</span>{" "}
            {task.validationGate.hypothesis}
          </p>
          <p className="text-muted-foreground mt-1 text-[11px] leading-relaxed">
            <span className="font-medium text-foreground">Evidence:</span>{" "}
            {task.validationGate.evidence}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1 text-[10px]">
            <span className="bg-muted rounded px-1.5 py-0.5 capitalize">
              {task.validationGate.confidence} confidence
            </span>
            <span className="bg-muted rounded px-1.5 py-0.5 capitalize">
              {task.validationGate.state.replace("-", " ")}
            </span>
            {task.validationGate.state !== "override" ? (
              <Button
                size="xs"
                variant="outline"
                className="h-5 text-[10px]"
                onClick={() => setValidationOverride(task.id, "Progress is blocked by release timing constraints.")}
              >
                Add override
              </Button>
            ) : null}
          </div>
          {task.validationGate.overrideReason ? (
            <p className="text-muted-foreground mt-1 text-[10px]">
              Override note: {task.validationGate.overrideReason}
            </p>
          ) : null}
        </div>

        <div className="rounded-md border bg-background p-2">
          <p className="mb-1 inline-flex items-center gap-1 text-[11px] font-medium">
            <ShieldCheckIcon className="size-3.5" />
            Audit checklist
          </p>
          <div className="space-y-1">
            {task.auditChecklist.map((item) => (
              <label
                key={item.id}
                className="hover:bg-muted/50 flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-[11px]"
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleAuditItem(task.id, item.id)}
                  className="accent-primary size-3.5"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {task.impactMetrics ? (
          <div className="rounded-md border bg-background p-2">
            <p className="mb-1 inline-flex items-center gap-1 text-[11px] font-medium">
              <CheckCheckIcon className="size-3.5" />
              Measurable impact
            </p>
            <div className="grid gap-1">
              <Metric label="Engagement delta" value={task.impactMetrics.engagement} />
              <Metric label="Conversion uplift" value={task.impactMetrics.conversion} />
              <Metric label="Retention impact" value={task.impactMetrics.retention} />
            </div>
          </div>
        ) : null}
      </CollapsibleContent>
    </Collapsible>
  )
}
