"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

const STORAGE_KEY = "design-board-theme"

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light"
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function useTheme() {
  const [theme, setTheme] = React.useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null
    const nextTheme = saved ?? "system"
    setTheme(nextTheme)
  }, [])

  React.useEffect(() => {
    const root = document.documentElement
    const applied = theme === "system" ? getSystemTheme() : theme
    setResolvedTheme(applied)
    root.classList.toggle("dark", applied === "dark")
  }, [theme])

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const listener = () => {
      if (theme === "system") {
        const systemTheme = getSystemTheme()
        setResolvedTheme(systemTheme)
        document.documentElement.classList.toggle("dark", systemTheme === "dark")
      }
    }

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [theme])

  const updateTheme = React.useCallback((nextTheme: Theme) => {
    setTheme(nextTheme)
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
  }, [])

  return {
    theme,
    resolvedTheme,
    setTheme: updateTheme,
  }
}
