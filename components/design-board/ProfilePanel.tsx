"use client"

import { ChevronDownIcon, PencilIcon, PlusIcon, ArrowLeftIcon, EyeIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

function SectionHeader({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="hover:bg-muted text-muted-foreground flex w-full items-center justify-between rounded-md px-2 py-2 text-xs transition-colors"
    >
      <span className="inline-flex items-center gap-1">
        <ChevronDownIcon className="size-3.5" />
        {label}
      </span>
      <PlusIcon className="size-3.5" />
    </button>
  )
}

export function ProfilePanel() {
  return (
    <aside className="bg-muted/20 hidden w-[280px] flex-col border-r border-border/80 xl:flex">
      <div className="flex items-center gap-2 px-4 py-4">
        <ArrowLeftIcon className="text-muted-foreground size-4" />
        <p className="text-muted-foreground text-xs font-semibold tracking-[0.12em]">
          UX DESIGNERS
        </p>
      </div>

      <div className="px-4">
        <div className="relative mb-3 w-fit">
          <Avatar size="lg" className="size-28 rounded-[30%]">
            <AvatarImage src="/yoga-thumbnail.png" alt="John Smith" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <span className="bg-background absolute right-1 bottom-1 rounded-full border border-border p-1 shadow-sm">
            <PencilIcon className="size-3 text-muted-foreground" />
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">John Smith</h2>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          John is a UX designer focused on scalable experiences. He drives
          stronger research-backed decisions and translates findings into
          measurable interface improvements.
        </p>
        <div className="mt-5 flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-7 rounded-full text-xs">
            <EyeIcon />
            @ Jane D.
          </Button>
          <Button variant="ghost" size="sm" className="h-7 rounded-full text-xs">
            + Teams
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-1 px-3">
        <SectionHeader label="Pages" />
        <SectionHeader label="1 Tag" />
        <SectionHeader label="Integrations" />
      </div>
    </aside>
  )
}
