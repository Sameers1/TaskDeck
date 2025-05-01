"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function JoinSessionPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [sessionId, setSessionId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!sessionId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a session ID",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to validate the session
      // For now, we'll just simulate it
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push(`/sessions/${sessionId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join session. Please check the session ID and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">Back</Button>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Join a Session</h1>
          <p className="text-sm text-muted-foreground">Enter a session ID to join an existing planning poker session</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl">Join Session</CardTitle>
              <CardDescription>Enter the session ID provided by the session owner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="sessionId"
                  placeholder="e.g., ABC123"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Joining..." : "Join Session"}
              </Button>
              {!user && (
                <p className="text-xs text-muted-foreground">You are not logged in. You will join as a guest.</p>
              )}
            </CardFooter>
          </form>
        </Card>

        {!user && (
          <p className="px-8 text-center text-sm text-muted-foreground">
            Want to create your own sessions?{" "}
            <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
