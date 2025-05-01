"use client"

import { useState } from "react"
import { PokerCard } from "@/components/poker-card"
import { motion } from "framer-motion"
import type { LayoutType } from "@/components/layout-selector"

interface PokerCardDeckProps {
  points: (number | string)[]
  selectedValue: number | string | null
  onSelect: (value: number | string) => void
  disabled?: boolean
  layout?: LayoutType
}

export function PokerCardDeck({
  points,
  selectedValue,
  onSelect,
  disabled = false,
  layout = "classic",
}: PokerCardDeckProps) {
  // Generate consistent suits for cards
  const [cardSuits] = useState(() => {
    const suits: ("hearts" | "diamonds" | "clubs" | "spades")[] = ["hearts", "diamonds", "clubs", "spades"]
    return points.map((_, index) => suits[index % suits.length])
  })

  // Layout configurations
  const layoutConfigs = {
    classic: {
      container:
        "flex flex-wrap justify-center gap-4 p-4 rounded-xl bg-green-800/10 dark:bg-green-900/20 border border-green-800/20 dark:border-green-700/30",
      cardSize: "md" as const,
      staggerDelay: 0.05,
    },
    modern: {
      container:
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/50",
      cardSize: "md" as const,
      staggerDelay: 0.08,
    },
    compact: {
      container: "flex flex-wrap justify-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900",
      cardSize: "sm" as const,
      staggerDelay: 0.03,
    },
    grid: {
      container:
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/20",
      cardSize: "md" as const,
      staggerDelay: 0.05,
    },
  }

  const config = layoutConfigs[layout]

  return (
    <motion.div
      className={config.container}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: config.staggerDelay,
          },
        },
      }}
    >
      {points.map((point, index) => (
        <motion.div
          key={point.toString()}
          variants={{
            hidden: { opacity: 0, y: 20, rotateY: 90 },
            visible: { opacity: 1, y: 0, rotateY: 0 },
          }}
          transition={{ duration: 0.4 }}
        >
          <PokerCard
            value={point}
            selected={selectedValue === point}
            onClick={() => onSelect(point)}
            disabled={disabled}
            suit={cardSuits[index]}
            size={config.cardSize}
            variant={layout}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
