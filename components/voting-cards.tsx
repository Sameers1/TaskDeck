"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface VotingCardsProps {
  points: (number | string)[]
  selectedValue: number | string | null
  onSelect: (value: number | string) => void
  disabled?: boolean
}

export function VotingCards({ points, selectedValue, onSelect, disabled = false }: VotingCardsProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {points.map((point, index) => (
        <motion.button
          key={point.toString()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={cn(
            "voting-card",
            selectedValue === point
              ? "voting-card-selected"
              : disabled
                ? "voting-card-disabled"
                : "voting-card-default",
          )}
          onClick={() => onSelect(point)}
          disabled={disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {point}
        </motion.button>
      ))}
    </div>
  )
}
