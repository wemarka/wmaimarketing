
import React, { useState } from "react";
import { Calendar, Clock, ClipboardList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AddTaskDialog from "../AddTaskDialog";
import { TaskReminder } from "@/components/dashboard/notifications/types";
import { toast } from "sonner";

interface TaskReminderIntegrationProps {
  postId: string;
  postTitle: string;
  scheduledDate: string;
}

const TaskReminderIntegration: React.FC<TaskReminderIntegrationProps> = ({ 
  postId, 
  postTitle,
  scheduledDate 
}) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskReminder[]>([]);

  // In a real app, this would fetch tasks related to this post from an API
  // For demo purposes, we're using a placeholder

  const handleAddTask = (task: TaskReminder) => {
    setTasks([...tasks, task]);
    toast.success("تم إضافة المهمة المرتبطة بالمنشور");
  };

  // Calculate days remaining until scheduled date
  const daysRemaining = () => {
    const today = new Date();
    const scheduledDay = new Date(scheduledDate);
    const differenceInTime = scheduledDay.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
    if (differenceInDays < 0) return "تم النشر";
    if (differenceInDays === 0) return "اليوم";
    if (differenceInDays === 1) return "غداً";
    return `${differenceInDays} أيام متبقية`;
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 ml-1.5" />
          <span>
            {new Date(scheduledDate).toLocaleDateString('ar-SA', {
              day: 'numeric',
              month: 'long'
            })}
          </span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 ml-1.5" />
          <span>
            {new Date(scheduledDate).toLocaleTimeString('ar-SA', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          {daysRemaining()}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium flex items-center">
          <ClipboardList className="h-4 w-4 ml-1.5" />
          المهام المرتبطة ({tasks.length})
        </h4>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs"
          onClick={() => setIsAddTaskOpen(true)}
        >
          <Plus className="h-3.5 w-3.5 ml-1" />
          إضافة مهمة
        </Button>
      </div>
      
      {tasks.length > 0 ? (
        <div className="mt-2 space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="text-sm p-2 bg-muted rounded-md flex justify-between items-center">
              <div>
                <span className="font-medium">{task.title}</span>
                <div className="text-xs text-muted-foreground">
                  {new Date(task.dueDate).toLocaleDateString('ar-SA', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </div>
              </div>
              <Badge className="text-xs" variant={task.priority === "high" ? "destructive" : 
                task.priority === "medium" ? "default" : "secondary"}>
                {task.priority === "high" ? "عالية" : 
                 task.priority === "medium" ? "متوسطة" : "منخفضة"}
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-2 text-sm text-muted-foreground text-center py-3 bg-muted/40 rounded-md">
          لا توجد مهام مرتبطة بهذا المنشور
        </div>
      )}
      
      <AddTaskDialog 
        open={isAddTaskOpen} 
        onOpenChange={setIsAddTaskOpen}
        onAddTask={handleAddTask}
        relatedPostId={postId}
      />
    </div>
  );
};

export default TaskReminderIntegration;
