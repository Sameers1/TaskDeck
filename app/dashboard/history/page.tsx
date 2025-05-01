"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockSessions } from "@/lib/mock-data"
import { formatDistanceToNow } from "@/lib/utils"

export default function HistoryPage() {
  const [completedSessions, setCompletedSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchCompletedSessions = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Filter completed sessions
        const completed = mockSessions.filter((session) => session.status === "completed")

        setCompletedSessions(completed)
      } catch (error) {
        console.error("Failed to fetch sessions", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompletedSessions()
  }, [])

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Session History</h1>
        <p className="text-muted-foreground">View your completed planning poker sessions</p>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : completedSessions.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Completed Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Tasks</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.name}</TableCell>
                    <TableCell>{formatDistanceToNow(session.createdAt)}</TableCell>
                    <TableCell>{session.participants.length}</TableCell>
                    <TableCell>{session.tasks.length}</TableCell>
                    <TableCell>
                      <Link href={`/sessions/${session.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <p className="mb-4 text-muted-foreground">No completed sessions found.</p>
            <Link href="/sessions/new">
              <Button>Create New Session</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
