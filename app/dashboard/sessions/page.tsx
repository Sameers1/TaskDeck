"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Clock, Users, ArrowRight } from "lucide-react"
import { mockSessions } from "@/lib/mock-data"
import { formatDistanceToNow } from "@/lib/utils"

export default function SessionsPage() {
  const [sessions, setSessions] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchSessions = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setSessions(mockSessions)
      } catch (error) {
        console.error("Failed to fetch sessions", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [])

  const filteredSessions = sessions.filter((session) => session.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container py-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Sessions</h1>
          <p className="text-muted-foreground">Manage your planning poker sessions</p>
        </div>
        <Link href="/sessions/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Session
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : filteredSessions.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{session.name}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      session.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {session.status === "active" ? "Active" : "Completed"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDistanceToNow(session.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{session.participants.length} participants</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium">Tasks:</p>
                  <p className="text-sm text-muted-foreground">
                    {session.tasks.length} task{session.tasks.length !== 1 ? "s" : ""} (
                    {session.tasks.filter((t: any) => t.status === "completed").length} completed)
                  </p>
                </div>
                <Link href={`/sessions/${session.id}`}>
                  <Button variant="outline" className="w-full gap-2">
                    View Session <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <p className="mb-4 text-muted-foreground">No sessions found. Create a new session to get started.</p>
            <Link href="/sessions/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Create Session
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
