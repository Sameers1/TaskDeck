"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

interface Message {
  id: string
  userId: string
  userName: string
  text: string
  timestamp: Date
}

interface SessionChatProps {
  sessionId: string
}

export function SessionChat({ sessionId }: SessionChatProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulate initial messages
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: "msg-1",
        userId: "system",
        userName: "System",
        text: "Welcome to the discussion! Use this chat to discuss estimates and tasks.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
    ]
    setMessages(initialMessages)
  }, [sessionId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !user) return

    const message: Message = {
      id: `msg-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  return (
    <Card className="flex h-[600px] flex-col rounded-xl overflow-hidden border-primary/10 shadow-md">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Discussion
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`flex gap-3 ${message.userId === user?.id ? "flex-row-reverse" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarFallback
                  className={`${
                    message.userId === "system"
                      ? "bg-muted text-muted-foreground"
                      : message.userId === user?.id
                        ? "bg-gradient-to-br from-primary to-secondary text-white"
                        : "bg-gradient-to-br from-secondary to-accent text-white"
                  }`}
                >
                  {message.userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.userId === user?.id
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : message.userId === "system"
                      ? "bg-muted text-muted-foreground"
                      : "bg-gradient-to-r from-secondary/10 to-accent/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">{message.userId === user?.id ? "You" : message.userName}</span>
                  <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                </div>
                <p className="mt-1">{message.text}</p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="rounded-full border-primary/20 focus-visible:ring-primary"
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
