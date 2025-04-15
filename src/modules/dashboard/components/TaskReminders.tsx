
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus, X, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority: "low" | "medium" | "high";
}

const TaskReminders = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "إعداد تقرير أداء الحملات الأسبوعي",
      completed: false,
      dueDate: "2025-04-16",
      priority: "high"
    },
    {
      id: "2",
      text: "تحديث محتوى صفحة المنتجات الجديدة",
      completed: false,
      dueDate: "2025-04-17",
      priority: "medium"
    },
    {
      id: "3",
      text: "مراجعة التعليقات على منشورات الأسبوع الماضي",
      completed: true,
      dueDate: "2025-04-15",
      priority: "low"
    }
  ]);
  
  const [newTask, setNewTask] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { toast } = useToast();
  
  const handleAddTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
        dueDate: new Date().toISOString().split('T')[0],
        priority: "medium"
      };
      
      setTasks([task, ...tasks]);
      setNewTask("");
      setIsAddingTask(false);
      
      toast({
        title: "تمت إضافة المهمة",
        description: "تمت إضافة المهمة الجديدة بنجاح",
      });
    }
  };
  
  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    
    toast({
      title: "تم حذف المهمة",
      description: "تم حذف المهمة بنجاح",
    });
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "عالية";
      case "medium":
        return "متوسطة";
      case "low":
        return "منخفضة";
      default:
        return "";
    }
  };
  
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' });
  };
  
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">المهام والتذكيرات</CardTitle>
        <Button 
          size="sm" 
          onClick={() => setIsAddingTask(!isAddingTask)}
          variant={isAddingTask ? "secondary" : "default"}
        >
          {isAddingTask ? (
            <>
              <X className="mr-1 h-4 w-4" />
              إلغاء
            </>
          ) : (
            <>
              <Plus className="mr-1 h-4 w-4" />
              مهمة جديدة
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {isAddingTask && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className="bg-muted/40 p-3 rounded-lg space-y-3">
                <Input
                  placeholder="أضف مهمة جديدة..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="mb-2"
                  onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                />
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    تاريخ الاستحقاق
                  </Button>
                  <Button onClick={handleAddTask} size="sm">
                    إضافة
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="space-y-6">
          {/* المهام النشطة */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center">
              <span className="h-5 w-5 mr-1.5 flex items-center justify-center rounded-full bg-primary/20">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
              </span>
              مهام نشطة ({activeTasks.length})
            </h3>
            
            {activeTasks.length > 0 ? (
              <div className="space-y-2">
                {activeTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start p-3 rounded-lg border bg-card hover:bg-accent/5"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      className="mt-0.5"
                    />
                    <div className="ml-3 flex-grow">
                      <p className={cn("text-sm", task.completed && "line-through text-muted-foreground")}>
                        {task.text}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        {task.dueDate && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {formatDueDate(task.dueDate)}
                          </div>
                        )}
                        <div className={cn("text-xs px-1.5 py-0.5 rounded-sm border", getPriorityColor(task.priority))}>
                          {getPriorityLabel(task.priority)}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-50 hover:opacity-100"
                      onClick={() => deleteTask(task.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground px-3">لا توجد مهام نشطة</p>
            )}
          </div>
          
          {/* المهام المكتملة */}
          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                مكتملة ({completedTasks.length})
              </h3>
              
              <div className="space-y-2">
                {completedTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    className="flex items-start p-3 rounded-lg border border-dashed bg-muted/30 hover:bg-accent/5"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      className="mt-0.5"
                    />
                    <div className="ml-3 flex-grow">
                      <p className="text-sm line-through text-muted-foreground">
                        {task.text}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-30 hover:opacity-100"
                      onClick={() => deleteTask(task.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskReminders;
