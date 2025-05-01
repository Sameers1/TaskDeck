"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface Participant {
  id: string
  name: string
}

interface ParticipantsListProps {
  participants: Participant[]
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  return (
    <div className="space-y-2">
      {participants.map((participant, index) => (
        <motion.div
          key={participant.id}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
              {participant.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{participant.name}</span>
        </motion.div>
      ))}
    </div>
  )
}
