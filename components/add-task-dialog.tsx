"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Plus } from "lucide-react"

interface AddTaskDialogProps {
  onAddTask: (title: string, description: string) => void
}

export function AddTaskDialog({ onAddTask }: AddTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTask(title, description)
    setTitle("")
    setDescription("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full gap-2 rounded-xl border-dashed border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 p-8 h-auto"
        >
          <Plus className="h-5 w-5 text-primary" />
          <span>Add New Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Add New Task
            </DialogTitle>
            <DialogDescription>
              Add a user story or task to estimate. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-lg border-primary/20 focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Task description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="rounded-lg border-primary/20 focus-visible:ring-primary"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              disabled={!title.trim()}
            >
              Save Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 