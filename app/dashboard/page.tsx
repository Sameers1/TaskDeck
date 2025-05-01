"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, ArrowRight, Clock, Users, Sparkles, Search, BarChart4 } from "lucide-react"
import { mockSessions } from "@/lib/mock-data"
import { formatDistanceToNow } from "@/lib/utils"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { LayoutSelector, type LayoutType } from "@/components/layout-selector"
import { PokerCard } from "@/components/poker-card"

export default function DashboardPage() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<any[]>([])
  const [sessionId, setSessionId] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [layout, setLayout] = useState<LayoutType>("classic")
  const [stats, setStats] = useState({
    totalSessions: 0,
    activeUsers: 0,
    completedTasks: 0,
    averageTime: "0"
  })

  useEffect(() => {
    // In a real app, this would be an API call
    // Simulate loading sessions
    const timer = setTimeout(() => {
      setSessions(mockSessions.slice(0, 3))
      setStats({
        totalSessions: 24,
        activeUsers: 8,
        completedTasks: 156,
        averageTime: "18min"
      })
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleJoinSession = (e: React.FormEvent) => {
    e.preventDefault()
    if (sessionId) {
      window.location.href = `/sessions/${sessionId}`
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="container py-8">
      <motion.div
        className="mb-8 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome back, <span className="gradient-heading">{user?.name || "User"}</span>
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your sessions</p>
        </div>
        <div className="flex items-center gap-3">
          <LayoutSelector onChange={setLayout} />
          <ThemeToggle />
          <Link href="/sessions/new">
            <Button className="gap-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90">
              <Plus className="h-4 w-4" /> New Session
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card className="relative overflow-hidden border-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Sessions</CardTitle>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{stats.totalSessions}</div>
                <div className="rounded-full bg-primary/10 p-2">
                  <BarChart4 className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="relative overflow-hidden border-secondary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent" />
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{stats.activeUsers}</div>
                <div className="rounded-full bg-secondary/10 p-2">
                  <Users className="h-4 w-4 text-secondary" />
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="relative overflow-hidden border-accent/10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Tasks</CardTitle>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{stats.completedTasks}</div>
                <div className="rounded-full bg-accent/10 p-2">
                  <Clock className="h-4 w-4 text-accent" />
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="relative overflow-hidden border-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Session Time</CardTitle>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{stats.averageTime}</div>
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="rounded-xl overflow-hidden border-primary/10">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="h-6 w-1/3 bg-muted/50 rounded-md animate-pulse"></div>
                <div className="h-4 w-2/3 bg-muted/30 rounded-md animate-pulse"></div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="h-10 bg-muted/30 rounded-md animate-pulse"></div>
                  <div className="h-20 bg-muted/20 rounded-md animate-pulse"></div>
                </div>
              </CardContent>
              <CardFooter className="pb-6">
                <div className="h-10 w-full bg-muted/30 rounded-full animate-pulse"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Card className="card-hover rounded-xl overflow-hidden border-primary/10 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <CardHeader className="relative z-10 bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Join Session
                </CardTitle>
                <CardDescription>Enter a session ID to join an existing session</CardDescription>
              </CardHeader>
              <form onSubmit={handleJoinSession}>
                <CardContent className="relative z-10 pt-6">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Enter session ID"
                      value={sessionId}
                      onChange={(e) => setSessionId(e.target.value)}
                      className="rounded-full border-primary/20 focus-visible:ring-primary"
                    />
                    <Button type="submit" disabled={!sessionId} className="rounded-full">
                      Join
                    </Button>
                  </div>
                </CardContent>
              </form>
              <CardFooter className="relative z-10 pb-6 flex justify-center">
                <div className="flex gap-2">
                  <PokerCard value="A" suit="hearts" size="sm" variant={layout} />
                  <PokerCard value="K" suit="spades" size="sm" variant={layout} />
                  <PokerCard value="Q" suit="diamonds" size="sm" variant={layout} />
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="card-hover rounded-xl overflow-hidden border-secondary/10 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <CardHeader className="relative z-10 bg-gradient-to-r from-secondary/10 to-accent/10">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  Create New Session
                </CardTitle>
                <CardDescription>Start a new planning poker session</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-6">
                <p className="text-sm text-muted-foreground">
                  Create a new session to estimate user stories with your team members in real-time.
                </p>
              </CardContent>
              <CardFooter className="relative z-10 pb-6">
                <Link href="/sessions/new" className="w-full">
                  <Button className="w-full gap-2 rounded-full bg-gradient-to-r from-secondary to-accent hover:opacity-90">
                    <Plus className="h-4 w-4" /> Create Session
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="card-hover rounded-xl overflow-hidden border-accent/10 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <CardHeader className="relative z-10 bg-gradient-to-r from-accent/10 to-primary/10">
                <CardTitle className="flex items-center gap-2">
                  <BarChart4 className="h-5 w-5 text-accent" />
                  Recent Sessions
                </CardTitle>
                <CardDescription>View your recent planning poker sessions</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-6">
                <div className="space-y-3">
                  {sessions.length > 0 ? (
                    sessions.map((session, index) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                      >
                        <Link
                          href={`/sessions/${session.id}`}
                          className="flex items-center justify-between rounded-lg border border-accent/10 p-3 hover:bg-accent/5 hover:shadow-md transition-all duration-300"
                        >
                          <div>
                            <p className="font-medium">{session.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{formatDistanceToNow(session.createdAt)}</span>
                              <Users className="h-3 w-3 ml-2" />
                              <span>{session.participants.length} participants</span>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </Link>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No recent sessions found. Create a new session to get started.
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="relative z-10 pb-6">
                <Link href="/dashboard/sessions" className="w-full">
                  <Button variant="outline" className="w-full rounded-full border-accent/20">
                    View All Sessions
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="mt-8 rounded-xl overflow-hidden border border-primary/10 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 p-6 relative group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 p-2">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Try different layout styles using the layout selector in the top right corner.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <PokerCard value="A" suit="hearts" size="sm" variant={layout} />
            <PokerCard value="K" suit="clubs" size="sm" variant={layout} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
