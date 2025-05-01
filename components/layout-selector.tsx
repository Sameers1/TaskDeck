"use client"

import type React from "react"
import { Check, Grid, Rows, Columns, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLocalStorage } from "@/hooks/use-local-storage"

export type LayoutType = "classic" | "modern" | "compact" | "grid"

interface LayoutOption {
  id: LayoutType
  name: string
  icon: React.ReactNode
  description: string
}

const layoutOptions: LayoutOption[] = [
  {
    id: "classic",
    name: "Classic Poker",
    icon: <LayoutGrid className="h-4 w-4" />,
    description: "Traditional poker table layout",
  },
  {
    id: "modern",
    name: "Modern",
    icon: <Grid className="h-4 w-4" />,
    description: "Clean, modern card layout",
  },
  {
    id: "compact",
    name: "Compact",
    icon: <Rows className="h-4 w-4" />,
    description: "Space-efficient layout",
  },
  {
    id: "grid",
    name: "Grid",
    icon: <Columns className="h-4 w-4" />,
    description: "Grid-based card arrangement",
  },
]

interface LayoutSelectorProps {
  onChange?: (layout: LayoutType) => void
}

export function LayoutSelector({ onChange }: LayoutSelectorProps) {
  const [layout, setLayout] = useLocalStorage<LayoutType>("scrum-poker-layout", "classic")

  const handleLayoutChange = (newLayout: LayoutType) => {
    setLayout(newLayout)
    if (onChange) {
      onChange(newLayout)
    }
  }

  const currentLayout = layoutOptions.find((option) => option.id === layout) || layoutOptions[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 rounded-full border-primary/20 bg-background/80 backdrop-blur-sm hover:bg-primary/10"
        >
          {currentLayout.icon}
          <span className="hidden sm:inline">{currentLayout.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {layoutOptions.map((option) => (
          <DropdownMenuItem
            key={option.id}
            className={`flex cursor-pointer items-center justify-between py-2 ${
              layout === option.id ? "bg-primary/10" : ""
            }`}
            onClick={() => handleLayoutChange(option.id)}
          >
            <div className="flex items-center gap-2">
              <div className={`rounded-md p-1 ${layout === option.id ? "bg-primary/20" : "bg-muted"}`}>
                {option.icon}
              </div>
              <div className="flex flex-col">
                <span className={layout === option.id ? "font-medium" : ""}>{option.name}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </div>
            </div>
            {layout === option.id && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
