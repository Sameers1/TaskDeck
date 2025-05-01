
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import TaskCard, { Task } from "@/components/TaskCard";
import PokerCard from "@/components/PokerCard";
import UserAvatar from "@/components/UserAvatar";
import VotingResult, { Vote } from "@/components/VotingResult";
import { toast } from 'sonner';
import { Plus, Clock, RefreshCw } from "lucide-react";

interface SessionData {
  id: string;
  name: string;
  creator: string;
  deckType: string;
  createdAt: string;
  tasks: Task[];
  participants: { id: string; name: string }[];
}

interface TaskVotes {
  [taskId: string]: Vote[];
}

const Session = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  
  const [session, setSession] = useState<SessionData | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | string | null>(null);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isRevealVotes, setIsRevealVotes] = useState(false);
  const [taskVotes, setTaskVotes] = useState<TaskVotes>({});
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(120); // 2 minutes
  const [originalTimerValue, setOriginalTimerValue] = useState(120);
  
  // Mock user ID - in a real app, this would come from authentication
  const currentUserId = 'user-' + Math.random().toString(36).substring(2, 10);
  const currentUserName = "You"; // In a real app, this would be the authenticated user's name
  
  // Define card decks
  const cardDecks = {
    fibonacci: [0, 1, 2, 3, 5, 8, 13, 21, "?"],
    tshirt: ["XS", "S", "M", "L", "XL", "?"],
    powers: [0, 1, 2, 4, 8, 16, 32, "?"]
  };
  
  useEffect(() => {
    if (!sessionId) return;
    
    // In a real app, we'd fetch from a database
    const sessionData = localStorage.getItem(`session_${sessionId}`);
    
    if (!sessionData) {
      toast.error("Session not found");
      navigate('/');
      return;
    }
    
    setSession(JSON.parse(sessionData));
  }, [sessionId, navigate]);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (timerRunning && timerSeconds === 0) {
      setTimerRunning(false);
      toast("Time's up!");
    }
    
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  const handleAddTask = () => {
    if (!session) return;
    if (!newTaskTitle.trim()) {
      toast.error("Task title is required");
      return;
    }
    
    const newTask: Task = {
      id: 'task-' + Math.random().toString(36).substring(2, 9),
      title: newTaskTitle,
      description: newTaskDescription
    };
    
    const updatedSession = {
      ...session,
      tasks: [...session.tasks, newTask]
    };
    
    // Save to localStorage
    localStorage.setItem(`session_${sessionId}`, JSON.stringify(updatedSession));
    setSession(updatedSession);
    setIsAddTaskDialogOpen(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
    
    toast.success("Task added successfully");
  };
  
  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setSelectedCard(null);
    setIsRevealVotes(false);
    // Reset timer
    setTimerRunning(false);
    setTimerSeconds(originalTimerValue);
  };
  
  const handleVote = (value: number | string) => {
    if (!selectedTask || !session) return;
    
    setSelectedCard(value);
    
    // Record vote
    const vote: Vote = {
      userId: currentUserId,
      userName: currentUserName,
      value
    };
    
    // Update votes for current task
    setTaskVotes(prev => {
      const taskId = selectedTask.id;
      // Filter out previous vote by this user if exists
      const existingVotes = prev[taskId] || [];
      const filteredVotes = existingVotes.filter(v => v.userId !== currentUserId);
      
      return {
        ...prev,
        [taskId]: [...filteredVotes, vote]
      };
    });
    
    toast.success(`You voted: ${value}`);
  };
  
  const handleRevealVotes = () => {
    setIsRevealVotes(true);
  };
  
  const handleNewEstimation = () => {
    if (!selectedTask || !session) return;
    
    // Clear votes for current task
    setTaskVotes(prev => ({
      ...prev,
      [selectedTask.id]: []
    }));
    
    setSelectedCard(null);
    setIsRevealVotes(false);
    
    // Reset timer
    setTimerRunning(false);
    setTimerSeconds(originalTimerValue);
    
    toast.success("Starting new estimation round");
  };
  
  const handleConfirmEstimation = (finalValue: number | string) => {
    if (!selectedTask || !session) return;
    
    // Update task with estimation points
    const updatedTasks = session.tasks.map(task => {
      if (task.id === selectedTask.id) {
        return {
          ...task,
          estimationPoints: typeof finalValue === 'number' ? finalValue : undefined
        };
      }
      return task;
    });
    
    const updatedSession = {
      ...session,
      tasks: updatedTasks
    };
    
    // Save to localStorage
    localStorage.setItem(`session_${sessionId}`, JSON.stringify(updatedSession));
    setSession(updatedSession);
    
    // Update selected task
    setSelectedTask(prevTask => {
      if (!prevTask) return null;
      return {
        ...prevTask,
        estimationPoints: typeof finalValue === 'number' ? finalValue : undefined
      };
    });
    
    toast.success(`Task estimated at ${finalValue} points`);
  };
  
  const handleToggleTimer = () => {
    setTimerRunning(prev => !prev);
  };
  
  const handleResetTimer = () => {
    setTimerSeconds(originalTimerValue);
    setTimerRunning(false);
  };
  
  const handleUpdateTimerValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 60;
    setOriginalTimerValue(value);
    setTimerSeconds(value);
  };
  
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Loading session...</h2>
            <p className="text-gray-500">Please wait</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Get current card deck
  const currentDeck = cardDecks[session.deckType as keyof typeof cardDecks] || cardDecks.fibonacci;
  
  // Get votes for current task
  const currentTaskVotes = selectedTask ? taskVotes[selectedTask.id] || [] : [];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{session.name}</h1>
            <p className="text-gray-500">Session ID: {session.id} • Created by {session.creator}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tasks Panel */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Tasks</CardTitle>
                  <Button size="sm" onClick={() => setIsAddTaskDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-1" /> Add Task
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {session.tasks.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-2">No tasks added yet</p>
                        <Button 
                          variant="outline"
                          onClick={() => setIsAddTaskDialogOpen(true)}
                        >
                          Add Your First Task
                        </Button>
                      </div>
                    ) : (
                      session.tasks.map(task => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          isActive={selectedTask?.id === task.id}
                          onClick={() => handleSelectTask(task)}
                        />
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Estimation Panel */}
            <div className="md:col-span-2">
              {!selectedTask ? (
                <Card className="h-full">
                  <div className="flex items-center justify-center h-full py-12">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">No Task Selected</h3>
                      <p className="text-gray-500 mb-4">Select a task from the left panel to start the estimation</p>
                      {session.tasks.length === 0 && (
                        <Button onClick={() => setIsAddTaskDialogOpen(true)}>
                          Add Your First Task
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Task Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{selectedTask.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{selectedTask.description || "No description provided."}</p>
                    </CardContent>
                  </Card>
                  
                  {/* Timer */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-lg font-medium">{formatTime(timerSeconds)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        className="w-20"
                        value={originalTimerValue}
                        onChange={handleUpdateTimerValue}
                        disabled={timerRunning}
                      />
                      <Button 
                        variant={timerRunning ? "destructive" : "outline"}
                        size="sm"
                        onClick={handleToggleTimer}
                      >
                        {timerRunning ? "Pause" : "Start"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResetTimer}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Participants */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Participants ({session.participants.length})</h3>
                    <div className="flex flex-wrap gap-4">
                      {session.participants.map((participant, idx) => (
                        <UserAvatar
                          key={idx}
                          name={participant.name}
                          hasVoted={currentTaskVotes.some(v => v.userId === participant.id)}
                        />
                      ))}
                      <UserAvatar
                        name={currentUserName}
                        hasVoted={currentTaskVotes.some(v => v.userId === currentUserId)}
                      />
                    </div>
                  </div>
                  
                  {/* Voting Area */}
                  {!isRevealVotes ? (
                    <div className="space-y-4">
                      <h3 className="font-medium">Your Vote</h3>
                      <div className="flex flex-wrap gap-3">
                        {currentDeck.map((value, idx) => (
                          <PokerCard
                            key={idx}
                            value={value}
                            isSelected={selectedCard === value}
                            onSelect={() => handleVote(value)}
                          />
                        ))}
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button onClick={handleRevealVotes}>Reveal All Votes</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <VotingResult 
                        votes={currentTaskVotes} 
                      />
                      
                      <div className="flex flex-wrap gap-3 pt-4">
                        {currentDeck.map((value, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            className="h-12"
                            onClick={() => handleConfirmEstimation(value)}
                          >
                            Confirm: {value}
                          </Button>
                        ))}
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={handleNewEstimation}
                        className="w-full"
                      >
                        Start New Voting Round
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Add Task Dialog */}
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Add a user story or task for estimation
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="taskTitle" className="text-sm font-medium">
                Task Title
              </label>
              <Input
                id="taskTitle"
                placeholder="Enter task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="taskDescription" className="text-sm font-medium">
                Description (optional)
              </label>
              <Textarea
                id="taskDescription"
                placeholder="Enter task description, acceptance criteria, etc."
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Session;
