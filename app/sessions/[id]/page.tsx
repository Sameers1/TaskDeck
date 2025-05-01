"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { mockSessions, storyPoints } from "@/lib/mock-data"
import { TaskList } from "@/components/task-list"
import { ParticipantsList } from "@/components/participants-list"
import { SessionTimer } from "@/components/session-timer"
import { SessionChat } from "@/components/session-chat"
import { Sparkles, ArrowLeft, Users, BarChart4, Plus, Wand2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { ThemeToggle } from "@/components/theme-toggle"
import { LayoutSelector, type LayoutType } from "@/components/layout-selector"
import { PokerCardDeck } from "@/components/poker-card-deck"
import { PokerCard } from "@/components/poker-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function SessionPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const sessionId = params.id as string

  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTask, setActiveTask] = useState<any>(null)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [selectedCard, setSelectedCard] = useState<number | string | null>(null)
  const [revealVotes, setRevealVotes] = useState(false)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerDuration, setTimerDuration] = useState(120) // 2 minutes
  const [showConfetti, setShowConfetti] = useState(false)
  const [layout, setLayout] = useState<LayoutType>(() => {
    // Try to get the layout from localStorage, default to "classic"
    if (typeof window !== "undefined") {
      const savedLayout = localStorage.getItem("scrum-poker-layout")
      return savedLayout ? JSON.parse(savedLayout) : "classic"
    }
    return "classic"
  })

  const [aiSuggestion, setAiSuggestion] = useState<{
    estimate: string
    complexity: string
    suggestions: string[]
  } | null>(null)

  useEffect(() => {
    // In a real app, this would be an API call to get session data
    const fetchSession = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Find session in mock data or create a new one
        const foundSession = mockSessions.find((s) => s.id === sessionId)

        if (foundSession) {
          setSession(foundSession)
          if (foundSession.tasks.length > 0) {
            const inProgressTask = foundSession.tasks.find((t) => t.status === "in-progress")
            setActiveTask(inProgressTask || foundSession.tasks[0])
          }
        } else {
          // Create a new session if not found
          const newSession = {
            id: sessionId,
            name: "New Session",
            createdAt: new Date(),
            status: "active",
            owner: {
              id: user?.id,
              name: user?.name,
            },
            participants: [{ id: user?.id, name: user?.name }],
            tasks: [],
          }
          setSession(newSession)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load session data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) {
      fetchSession()
    }
  }, [sessionId, user, toast])

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newTaskTitle.trim()) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive",
      })
      return
    }

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDescription,
      status: "pending",
      votes: [],
    }

    const updatedSession = {
      ...session,
      tasks: [...session.tasks, newTask],
    }

    setSession(updatedSession)
    setNewTaskTitle("")
    setNewTaskDescription("")

    if (!activeTask) {
      setActiveTask(newTask)
    }

    toast({
      title: "Success",
      description: "Task added successfully",
    })
  }

  const handleSelectTask = (task: any) => {
    setActiveTask(task)
    setRevealVotes(false)
    setSelectedCard(null)
    setTimerRunning(false)
  }

  const handleVote = (value: number | string) => {
    if (!activeTask) return

    setSelectedCard(value)

    // Update the votes
    const existingVoteIndex = activeTask.votes.findIndex((v: any) => v.userId === user?.id)
    const updatedVotes = [...activeTask.votes]

    if (existingVoteIndex >= 0) {
      updatedVotes[existingVoteIndex] = { userId: user?.id, name: user?.name, value }
    } else {
      updatedVotes.push({ userId: user?.id, name: user?.name, value })
    }

    const updatedTask = {
      ...activeTask,
      votes: updatedVotes,
    }

    // Update the task in the session
    const updatedTasks = session.tasks.map((t: any) => (t.id === activeTask.id ? updatedTask : t))

    setSession({
      ...session,
      tasks: updatedTasks,
    })

    setActiveTask(updatedTask)
  }

  const handleRevealVotes = () => {
    setRevealVotes(true)

    // Small confetti burst when revealing votes
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ["#9333ea", "#e11d48", "#06b6d4"],
    })
  }

  const handleResetVotes = () => {
    if (!activeTask) return

    const updatedTask = {
      ...activeTask,
      votes: [],
    }

    const updatedTasks = session.tasks.map((t: any) => (t.id === activeTask.id ? updatedTask : t))

    setSession({
      ...session,
      tasks: updatedTasks,
    })

    setActiveTask(updatedTask)
    setRevealVotes(false)
    setSelectedCard(null)
  }

  const handleFinalizeEstimate = (estimate: number | string) => {
    if (!activeTask) return

    const updatedTask = {
      ...activeTask,
      status: "completed",
      finalEstimate: estimate,
    }

    const updatedTasks = session.tasks.map((t: any) => (t.id === activeTask.id ? updatedTask : t))

    setSession({
      ...session,
      tasks: updatedTasks,
    })

    setActiveTask(updatedTask)

    // Trigger confetti
    setShowConfetti(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#9333ea", "#e11d48", "#06b6d4"],
    })

    setTimeout(() => setShowConfetti(false), 2000)

    toast({
      title: "Success",
      description: `Task estimated at ${estimate} points`,
    })
  }

  const handleStartTimer = () => {
    setTimerRunning(true)
  }

  const handleStopTimer = () => {
    setTimerRunning(false)
  }

  const handleTimerComplete = () => {
    setTimerRunning(false)
    toast({
      title: "Time's up!",
      description: "Discussion time has ended",
    })
  }

  const handleLayoutChange = (newLayout: LayoutType) => {
    console.log("Changing layout to:", newLayout)
    setLayout(newLayout)
    // Save to localStorage directly as a backup
    if (typeof window !== "undefined") {
      localStorage.setItem("scrum-poker-layout", JSON.stringify(newLayout))
    }
  }

  const generateAiSuggestion = () => {
    // This would be an API call in production
    setAiSuggestion({
      estimate: "3-5 story points",
      complexity: "Medium",
      suggestions: [
        "Break down the task into smaller subtasks",
        "Consider adding automated tests",
        "Document API changes",
      ],
    })
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-75 blur-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <Sparkles className="relative h-12 w-12 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading poker session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <motion.div
        className="mb-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-heading">{session.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Session ID: {session.id}</span>
              <span className="inline-flex items-center gap-1 text-xs">
                <Users className="h-3 w-3" /> {session.participants.length}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline" onClick={() => router.push("/dashboard")} className="rounded-full">
            Exit Session
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="tasks" className="space-y-6">
            <TabsList className="rounded-full p-1 bg-muted/50 backdrop-blur-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TabsTrigger value="tasks" className="rounded-full">
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="discussion" className="rounded-full">
                  Discussion
                </TabsTrigger>
              </div>
              <div className="flex items-center gap-3">
                <LayoutSelector onChange={setLayout} />
                <SessionTimer
                  duration={timerDuration}
                  isRunning={timerRunning}
                  onStart={handleStartTimer}
                  onStop={handleStopTimer}
                  onComplete={handleTimerComplete}
                />
              </div>
            </TabsList>
            <TabsContent value="tasks" className="space-y-4 animate-in">
              <div className="flex justify-between items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Plus className="h-4 w-4" /> Add New Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Add New Task
                      </DialogTitle>
                      <DialogDescription>
                        Add a user story or task to estimate. Use AI assistance for better task planning.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddTask} className="space-y-6 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Task Title</Label>
                        <Input
                          id="title"
                          placeholder="Enter task title"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          className="rounded-lg border-primary/20 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Task Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the task in detail"
                          value={newTaskDescription}
                          onChange={(e) => setNewTaskDescription(e.target.value)}
                          rows={3}
                          className="rounded-lg border-primary/20 focus-visible:ring-primary"
                        />
                      </div>

                      <div className="rounded-lg border border-primary/10 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">AI Assistance</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={generateAiSuggestion}
                          >
                            <Wand2 className="h-4 w-4" />
                            Generate Suggestions
                          </Button>
                        </div>

                        {aiSuggestion && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-3"
                          >
                            <div className="flex gap-4">
                              <div className="flex-1 rounded-md bg-primary/5 p-3">
                                <p className="text-xs text-muted-foreground mb-1">Estimated Points</p>
                                <p className="font-medium">{aiSuggestion.estimate}</p>
                              </div>
                              <div className="flex-1 rounded-md bg-secondary/5 p-3">
                                <p className="text-xs text-muted-foreground mb-1">Complexity</p>
                                <p className="font-medium">{aiSuggestion.complexity}</p>
                              </div>
                            </div>
                            <div className="rounded-md bg-accent/5 p-3">
                              <p className="text-xs text-muted-foreground mb-2">Suggestions</p>
                              <ul className="space-y-1 text-sm">
                                {aiSuggestion.suggestions.map((suggestion, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-accent">•</span>
                                    <span>{suggestion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <div className="flex justify-end gap-3">
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline">Cancel</Button>
                        </DialogTrigger>
                        <Button
                          type="submit"
                          className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                        >
                          <Plus className="h-4 w-4" /> Add Task
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <TaskList tasks={session.tasks} activeTaskId={activeTask?.id} onSelectTask={handleSelectTask} />
            </TabsContent>
            <TabsContent value="discussion" className="animate-in">
              <SessionChat sessionId={session.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="rounded-xl overflow-hidden border-secondary/10 shadow-md">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-accent/10">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                Participants
              </CardTitle>
              <CardDescription>{session.participants.length} people in this session</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ParticipantsList participants={session.participants} />
            </CardContent>
          </Card>

          {activeTask ? (
            <Card className="rounded-xl overflow-hidden border-accent/10 shadow-md card-pattern">
              <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10">
                <CardTitle>{activeTask.title}</CardTitle>
                <CardDescription>{activeTask.description || "No description provided"}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-3 font-medium flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Your Vote
                      </span>
                      <span className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
                        Layout: {layout.charAt(0).toUpperCase() + layout.slice(1)}
                      </span>
                    </h4>
                    <PokerCardDeck
                      points={storyPoints}
                      selectedValue={selectedCard}
                      onSelect={handleVote}
                      disabled={activeTask.status === "completed"}
                      layout={layout}
                    />
                  </div>

                  {activeTask.votes.length > 0 && (
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="font-medium flex items-center gap-2">
                          <BarChart4 className="h-4 w-4 text-secondary" />
                          Votes
                        </h4>
                        <span className="text-sm text-muted-foreground rounded-full bg-secondary/10 px-3 py-1">
                          {activeTask.votes.length} of {session.participants.length} voted
                        </span>
                      </div>

                      <AnimatePresence>
                        {revealVotes ? (
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {activeTask.votes.map((vote: any, index: number) => (
                              <motion.div
                                key={vote.userId}
                                className="flex items-center justify-between rounded-lg border border-accent/20 p-3 bg-accent/5"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                              >
                                <span>{vote.name || `User ${vote.userId}`}</span>
                                <PokerCard
                                  value={vote.value}
                                  size="sm"
                                  variant={layout}
                                  suit={["hearts", "diamonds", "clubs", "spades"][index % 4] as any}
                                />
                              </motion.div>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.div
                            className="grid grid-cols-4 gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {activeTask.votes.map((vote: any, index: number) => (
                              <motion.div
                                key={vote.userId}
                                initial={{ rotateY: 180, opacity: 0 }}
                                animate={{ rotateY: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                              >
                                <PokerCard value="?" variant={layout} size="sm" />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 pb-6">
                {activeTask.status === "completed" ? (
                  <div className="w-full rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 p-4 text-center">
                    <p className="text-lg">
                      Final estimate: <span className="font-bold text-primary">{activeTask.finalEstimate}</span> points
                    </p>
                  </div>
                ) : (
                  <>
                    {revealVotes ? (
                      <div className="flex w-full gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 rounded-full border-primary/20"
                          onClick={handleResetVotes}
                        >
                          Reset Votes
                        </Button>
                        <Button
                          className="flex-1 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                          onClick={() => {
                            // Calculate the most common vote or average
                            const votes = activeTask.votes.map((v: any) => v.value)
                            const numericVotes = votes.filter((v: any) => typeof v === "number")

                            if (numericVotes.length > 0) {
                              // Simple average for now
                              const sum = numericVotes.reduce((a: number, b: number) => a + b, 0)
                              const avg = Math.round(sum / numericVotes.length)
                              handleFinalizeEstimate(avg)
                            } else {
                              toast({
                                title: "Error",
                                description: "No numeric votes to calculate estimate",
                                variant: "destructive",
                              })
                            }
                          }}
                        >
                          Finalize Estimate
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-md"
                        onClick={handleRevealVotes}
                        disabled={activeTask.votes.length === 0}
                      >
                        Reveal Votes
                      </Button>
                    )}
                  </>
                )}
              </CardFooter>
            </Card>
          ) : (
            <Card className="rounded-xl overflow-hidden border-accent/10 shadow-md">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">
                  No active task selected. Add a task or select one from the list.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
