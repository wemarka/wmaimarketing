import React, { useState } from "react";
import { format, isAfter, isBefore, isToday, addDays } from "date-fns";
import { ar } from "date-fns/locale";
import { CheckCircle2, Calendar, AlertTriangle, Clock, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskReminder } from "@/components/dashboard/notifications/types";
import { cn } from "@/lib/utils";
import AddTaskDialog from "./AddTaskDialog";

interface TaskReminderItemProps {
  task: TaskReminder;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskReminderItem: React.FC<TaskReminderItemProps> = ({ 
  task, 
  onComplete, 
  onDelete 
}) => {
  const dueDate = new Date(task.dueDate);
  const isOverdue = isBefore(dueDate, new Date()) && !task.completed;
  const isDueToday = isToday(dueDate) && !task.completed;
  const isDueSoon = isBefore(dueDate, addDays(new Date(), 2)) && !isToday(dueDate) && !task.completed;
  
  const priorityColors = {
    low: "bg-blue-100 text-blue-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700"
  };
  
  const statusClass = cn(
    "flex items-center text-xs",
    task.completed ? "text-green-600" : 
    isOverdue ? "text-red-600" :
    isDueToday ? "text-amber-600" : "text-slate-600"
  );

  return (
    <div className={cn(
      "border rounded-lg p-3 relative transition-colors",
      task.completed ? "bg-green-50 border-green-200" :
      isOverdue ? "bg-red-50 border-red-200" :
      isDueToday ? "bg-amber-50 border-amber-200" :
      isDueSoon ? "bg-blue-50 border-blue-200" : "bg-card border-border"
    )}>
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-6 w-6 rounded-full",
              task.completed ? "text-green-600 hover:text-green-700" : 
              "text-muted-foreground hover:text-primary"
            )}
            onClick={() => onComplete(task.id)}
          >
            <CheckCircle2 className="h-5 w-5" fill={task.completed ? "currentColor" : "none"} />
            <span className="sr-only">Mark as complete</span>
          </Button>
          
          <div>
            <h3 className={cn(
              "font-medium",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={cn(
                "text-sm text-muted-foreground mt-1",
                task.completed && "line-through"
              )}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="secondary" className={priorityColors[task.priority]}>
                {task.priority === "low" ? "منخفضة" : 
                 task.priority === "medium" ? "متوسطة" : "عالية"}
              </Badge>
              
              <div className={statusClass}>
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {format(dueDate, "d MMMM", { locale: ar })}
              </div>
              
              {task.assignee && (
                <div className="text-xs text-muted-foreground">
                  {task.assignee}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete task</span>
        </Button>
      </div>
      
      {(isOverdue || isDueToday) && !task.completed && (
        <div className={cn(
          "absolute top-3 right-3 flex items-center text-xs font-medium",
          isOverdue ? "text-red-600" : "text-amber-600"
        )}>
          {isOverdue ? (
            <>
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              متأخرة
            </>
          ) : (
            <>
              <Clock className="h-3.5 w-3.5 mr-1" />
              اليوم
            </>
          )}
        </div>
      )}
    </div>
  );
};

interface TaskReminderListProps {
  tasks: TaskReminder[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskReminderList: React.FC<TaskReminderListProps> = ({ 
  tasks, 
  onComplete, 
  onDelete 
}) => {
  // Group tasks by status
  const overdueTasks = tasks.filter(task => 
    !task.completed && isBefore(new Date(task.dueDate), new Date())
  );
  
  const todayTasks = tasks.filter(task => 
    !task.completed && isToday(new Date(task.dueDate))
  );
  
  const upcomingTasks = tasks.filter(task => 
    !task.completed && 
    isAfter(new Date(task.dueDate), new Date()) &&
    !isToday(new Date(task.dueDate))
  );
  
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-5">
      {overdueTasks.length > 0 && (
        <div>
          <h3 className="font-medium text-red-600 flex items-center mb-2">
            <AlertTriangle className="h-4 w-4 mr-1.5" />
            مهام متأخرة ({overdueTasks.length})
          </h3>
          <div className="space-y-2">
            {overdueTasks.map(task => (
              <TaskReminderItem 
                key={task.id} 
                task={task} 
                onComplete={onComplete} 
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
      
      {todayTasks.length > 0 && (
        <div>
          <h3 className="font-medium text-amber-600 flex items-center mb-2">
            <Clock className="h-4 w-4 mr-1.5" />
            مهام اليوم ({todayTasks.length})
          </h3>
          <div className="space-y-2">
            {todayTasks.map(task => (
              <TaskReminderItem 
                key={task.id} 
                task={task} 
                onComplete={onComplete} 
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
      
      {upcomingTasks.length > 0 && (
        <div>
          <h3 className="font-medium text-blue-600 flex items-center mb-2">
            <Calendar className="h-4 w-4 mr-1.5" />
            مهام قادمة ({upcomingTasks.length})
          </h3>
          <div className="space-y-2">
            {upcomingTasks.map(task => (
              <TaskReminderItem 
                key={task.id} 
                task={task} 
                onComplete={onComplete} 
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
      
      {completedTasks.length > 0 && (
        <div>
          <h3 className="font-medium text-green-600 flex items-center mb-2">
            <CheckCircle2 className="h-4 w-4 mr-1.5" />
            مهام مكتملة ({completedTasks.length})
          </h3>
          <div className="space-y-2">
            {completedTasks.map(task => (
              <TaskReminderItem 
                key={task.id} 
                task={task} 
                onComplete={onComplete} 
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface TaskReminderWidgetProps {
  className?: string;
}

const TaskReminderWidget: React.FC<TaskReminderWidgetProps> = ({ className }) => {
  // Mock task data - in a real application, this would come from an API or state
  const [tasks, setTasks] = React.useState<TaskReminder[]>([
    {
      id: "1",
      title: "مراجعة محتوى منشور التجميل",
      description: "التأكد من محتوى منشور مجموعة التجميل الصيفية",
      dueDate: new Date().toISOString(), // Today
      priority: "high",
      completed: false,
      relatedPostId: "post-123"
    },
    {
      id: "2",
      title: "تحضير صور المنتجات الجديدة",
      description: "تجهيز صور للمنتجات الجديدة للإعلان القادم",
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // Yesterday
      priority: "medium",
      completed: false
    },
    {
      id: "3",
      title: "كتابة نص إعلان الشتاء",
      description: "تحضير نص الإعلان للمجموعة الشتوية القادمة",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), // 2 days from now
      priority: "low",
      completed: false,
      assignee: "سارة أحمد"
    },
    {
      id: "4",
      title: "تحليل أداء الحملة السابقة",
      description: "مراجعة تقارير الأداء والإحصائيات",
      dueDate: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(), // 3 days ago
      priority: "high",
      completed: true
    },
  ]);

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAddTask = (newTask: TaskReminder) => {
    setTasks([newTask, ...tasks]);
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">تذكيرات المهام</CardTitle>
          <CardDescription>
            {tasks.filter(t => !t.completed).length} مهام مطلوبة
          </CardDescription>
        </div>
        <Button 
          onClick={() => setIsAddTaskOpen(true)}
          variant="outline" 
          size="sm"
          className="h-8"
        >
          <Plus className="h-4 w-4 ml-1" />
          مهمة جديدة
        </Button>
      </CardHeader>
      <CardContent>
        <TaskReminderList 
          tasks={tasks} 
          onComplete={handleCompleteTask} 
          onDelete={handleDeleteTask} 
        />
      </CardContent>
      
      <AddTaskDialog 
        open={isAddTaskOpen} 
        onOpenChange={setIsAddTaskOpen}
        onAddTask={handleAddTask}
      />
    </Card>
  );
};

export { TaskReminderWidget, TaskReminderList, TaskReminderItem };
