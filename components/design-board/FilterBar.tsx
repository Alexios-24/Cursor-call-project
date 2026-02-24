"use client"

import { FilterIcon, LayoutGridIcon, ListIcon, SearchIcon } from "lucide-react"

import { TAG_OPTIONS } from "@/lib/constants"
import { useBoardStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FilterBar() {
  const {
    scope,
    setScope,
    view,
    setView,
    searchQuery,
    setSearchQuery,
    activeTags,
    toggleTag,
  } = useBoardStore((state) => state)

  return (
    <div className="border-b border-border/80 px-4 py-3 lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={scope} onValueChange={(value) => setScope(value as "all" | "assigned" | "added")}>
          <TabsList className="h-8">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="assigned" className="text-xs">
              Assigned to me
            </TabsTrigger>
            <TabsTrigger value="added" className="text-xs">
              Added by me
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <FilterIcon />
                {activeTags.length ? `${activeTags.length} tags` : "All tags"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-52">
              <PopoverHeader>
                <PopoverTitle>Tag Filter</PopoverTitle>
              </PopoverHeader>
              <div className="grid gap-1">
                {TAG_OPTIONS.map((tag) => (
                  <Button
                    key={tag}
                    variant={activeTags.includes(tag) ? "secondary" : "ghost"}
                    size="sm"
                    className="justify-start text-xs capitalize"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <label className="bg-muted/60 ring-foreground/10 flex h-8 items-center gap-1 rounded-md px-2 ring-1">
            <SearchIcon className="text-muted-foreground size-3.5" />
            <Input
              aria-label="Find tasks"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Find"
              className="h-7 w-36 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
            />
          </label>

          <div className="bg-muted inline-flex rounded-md p-0.5">
            <Button
              aria-label="List view"
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon-xs"
              onClick={() => setView("list")}
            >
              <ListIcon />
            </Button>
            <Button
              aria-label="Board view"
              variant={view === "board" ? "secondary" : "ghost"}
              size="icon-xs"
              onClick={() => setView("board")}
            >
              <LayoutGridIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
