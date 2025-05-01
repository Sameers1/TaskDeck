"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Pause, Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SessionTimerProps {
  duration: number
  isRunning: boolean
  onStart: () => void
  onStop: () => void
  onComplete: () => void
}

export function SessionTimer({ duration, isRunning, onStart, onStop, onComplete }: SessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isWarning, setIsWarning] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            onComplete()
            return 0
          }

          // Set warning when less than 30 seconds left
          if (prev <= 30 && !isWarning) {
            setIsWarning(true)
          }

          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isRunning, timeLeft, onComplete, isWarning])

  useEffect(() => {
    setTimeLeft(duration)
    setIsWarning(false)
  }, [duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Calculate progress percentage
  const progress = (timeLeft / duration) * 100

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center gap-2 rounded-full border px-4 py-3 bg-background shadow-sm h-12">
        <div
          className={`absolute left-0 top-0 bottom-0 rounded-full ${
            isWarning ? "bg-red-500/20" : "bg-primary/10"
          } transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
        <Clock className={`h-5 w-5 ${isWarning ? "text-red-500 animate-pulse" : "text-primary"} relative z-10`} />
        <span className={`font-mono text-base font-medium relative z-10 ${isWarning ? "text-red-500" : ""}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={isRunning ? "pause" : "play"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="outline"
            size="icon"
            className={`h-12 w-12 rounded-full ${
              isRunning
                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600"
                : "bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600"
            }`}
            onClick={isRunning ? onStop : onStart}
          >
            {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
