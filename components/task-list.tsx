"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface Task {
  id: string
  title: string
  description?: string
  status: string
  votes: any[]
  finalEstimate?: number | string
}

interface TaskListProps {
  tasks: Task[]
  activeTaskId?: string
  onSelectTask: (task: Task) => void
}

export function TaskList({ tasks, activeTaskId, onSelectTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Card className="card-pattern rounded-xl shadow-md">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">No tasks added yet. Add a task to get started.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="card-pattern rounded-xl shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle>Tasks</CardTitle>
        <CardDescription>
          {tasks.length} task{tasks.length !== 1 ? "s" : ""} in this session
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 hover:shadow-md transition-all duration-300 ${
                task.id === activeTaskId
                  ? "border-primary bg-primary/5 shadow-md"
                  : "hover:border-primary/30 hover:bg-primary/5"
              }`}
              onClick={() => onSelectTask(task)}
            >
              <div className="flex items-center gap-3">
                {task.status === "completed" ? (
                  <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                ) : (
                  <div className="rounded-full bg-muted p-1">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{task.title}</p>
                  {task.description && <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>}
                </div>
              </div>
              {task.status === "completed" && (
                <div className="rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-medium text-white">
                  {task.finalEstimate} points
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
