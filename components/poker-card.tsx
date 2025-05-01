"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Heart, Diamond, Club, Spade } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface PokerCardProps {
  value: number | string
  selected?: boolean
  onClick?: () => void
  disabled?: boolean
  suit?: "hearts" | "diamonds" | "clubs" | "spades" | "random"
  size?: "sm" | "md" | "lg"
  variant?: "classic" | "modern" | "compact" | "grid"
}

export function PokerCard({
  value,
  selected = false,
  onClick,
  disabled = false,
  suit = "random",
  size = "md",
  variant = "classic",
}: PokerCardProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [cardSuit, setCardSuit] = useState<"hearts" | "diamonds" | "clubs" | "spades">("hearts")

  // Determine card suit
  useEffect(() => {
    if (suit === "random") {
      const suits: ("hearts" | "diamonds" | "clubs" | "spades")[] = ["hearts", "diamonds", "clubs", "spades"]
      setCardSuit(suits[Math.floor(Math.random() * suits.length)])
    } else {
      setCardSuit(suit)
    }
  }, [suit])

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Determine card color based on suit
  const isRed = cardSuit === "hearts" || cardSuit === "diamonds"
  const textColor = isRed ? "text-red-500" : "text-slate-800 dark:text-slate-200"

  // Determine card size
  const sizeClasses = {
    sm: "h-16 w-12",
    md: "h-24 w-16",
    lg: "h-32 w-20",
  }

  // Get suit icon
  const SuitIcon = () => {
    switch (cardSuit) {
      case "hearts":
        return <Heart className={cn("h-4 w-4", isRed ? "text-red-500" : "")} fill="currentColor" />
      case "diamonds":
        return <Diamond className={cn("h-4 w-4", isRed ? "text-red-500" : "")} fill="currentColor" />
      case "clubs":
        return <Club className="h-4 w-4" />
      case "spades":
        return <Spade className="h-4 w-4" />
      default:
        return <Heart className={cn("h-4 w-4", isRed ? "text-red-500" : "")} fill="currentColor" />
    }
  }

  // Card variants
  const cardVariants = {
    classic: {
      base: "relative rounded-lg border-2 bg-white dark:bg-slate-900 shadow-md transition-all duration-300 transform-gpu",
      selected: "border-primary shadow-lg shadow-primary/20 scale-110",
      default: "border-slate-200 dark:border-slate-700 hover:border-primary/70 hover:shadow-md hover:scale-105",
      disabled: "opacity-50 cursor-not-allowed",
    },
    modern: {
      base: "relative rounded-xl border bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-md transition-all duration-300 transform-gpu",
      selected: "border-primary shadow-lg shadow-primary/20 scale-110",
      default: "border-slate-200 dark:border-slate-700 hover:border-primary/70 hover:shadow-md hover:scale-105",
      disabled: "opacity-50 cursor-not-allowed",
    },
    compact: {
      base: "relative rounded-md border bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 transform-gpu",
      selected: "border-primary shadow-md shadow-primary/20 scale-105",
      default: "border-slate-200 dark:border-slate-700 hover:border-primary/70 hover:scale-102",
      disabled: "opacity-50 cursor-not-allowed",
    },
    grid: {
      base: "relative rounded-lg border-2 bg-white dark:bg-slate-900 shadow-md transition-all duration-300 transform-gpu",
      selected: "border-primary shadow-lg shadow-primary/20 scale-110",
      default: "border-slate-200 dark:border-slate-700 hover:border-primary/70 hover:shadow-md hover:scale-105",
      disabled: "opacity-50 cursor-not-allowed",
    },
  }

  const variantStyle = cardVariants[variant]

  return (
    <motion.div
      className={cn(
        variantStyle.base,
        sizeClasses[size],
        selected ? variantStyle.selected : variantStyle.default,
        disabled && variantStyle.disabled,
        "flex flex-col items-center justify-center cursor-pointer",
      )}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-1 left-1 flex flex-col items-center">
        <span className={cn("text-xs font-bold", textColor)}>{value}</span>
        <SuitIcon />
      </div>
      <span className={cn("text-xl font-bold", textColor)}>{value}</span>
      <div className="absolute bottom-1 right-1 flex flex-col items-center rotate-180">
        <span className={cn("text-xs font-bold", textColor)}>{value}</span>
        <SuitIcon />
      </div>
    </motion.div>
  )
}
