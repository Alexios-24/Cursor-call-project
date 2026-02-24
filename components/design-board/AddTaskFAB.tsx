"use client"

import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AddTaskFAB() {
  return (
    <Button
      aria-label="Add new design task"
      size="icon-lg"
      className="fixed right-5 bottom-5 z-40 rounded-full shadow-lg transition-transform hover:scale-105"
    >
      <PlusIcon className="size-5" />
    </Button>
  )
}
