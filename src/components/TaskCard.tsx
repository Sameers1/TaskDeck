
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface Task {
  id: string;
  title: string;
  description: string;
  estimationPoints?: number;
}

interface TaskCardProps {
  task: Task;
  isActive: boolean;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isActive, onClick }) => {
  return (
    <Card 
      className={`mb-4 cursor-pointer transition-all hover:shadow-md ${isActive ? 'border-scrum-purple border-2' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{task.title}</CardTitle>
        {task.estimationPoints !== undefined && (
          <div className="absolute right-4 top-4 bg-scrum-purple text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {task.estimationPoints}
          </div>
        )}
        <CardDescription className="text-sm text-gray-500 truncate">ID: {task.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 line-clamp-2">{task.description}</p>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
