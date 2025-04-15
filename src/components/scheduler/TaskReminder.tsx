
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSchedulerData } from "./hooks/useSchedulerData";
import { TaskReminder as TaskReminderType } from "@/components/dashboard/notifications/types";
import { format, isAfter, isBefore } from "date-fns";
import { ar } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// مكون لعرض عنصر مهمة واحدة
const TaskItem: React.FC<{
  task: TaskReminderType;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ task, onComplete, onDelete }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  const dueDate = new Date(task.dueDate);
  const isOverdue = isBefore(dueDate, new Date()) && !task.completed;
  
  const formattedDate = format(dueDate, "d MMM", { locale: isRTL ? ar : undefined });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 border rounded-md ${
        task.completed 
          ? "border-slate-200 bg-slate-50/50" 
          : isOverdue 
            ? "border-red-200 bg-red-50/50" 
            : task.priority === "high" 
              ? "border-amber-200 bg-amber-50/50"
              : "border-slate-200"
      } mb-2`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-2">
          <input 
            type="checkbox" 
            checked={task.completed}
            onChange={() => onComplete(task.id)}
            className="mt-1"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </span>
              {isOverdue && !task.completed && (
                <span className="inline-flex items-center text-xs text-red-500 font-medium">
                  <AlertTriangle size={12} className="mr-1" /> {t("tasks.overdue")}
                </span>
              )}
            </div>
            {task.description && (
              <p className={`text-xs ${task.completed ? "line-through text-muted-foreground" : "text-muted-foreground"}`}>
                {task.description}
              </p>
            )}
            <div className="text-xs text-muted-foreground mt-1 flex gap-2">
              <span>{formattedDate}</span>
              <span className={`px-1 rounded text-xs ${
                task.priority === "high" ? "bg-red-100 text-red-700" :
                task.priority === "medium" ? "bg-amber-100 text-amber-700" :
                "bg-green-100 text-green-700"
              }`}>
                {task.priority === "high" ? t("priority.high") :
                task.priority === "medium" ? t("priority.medium") :
                t("priority.low")}
              </span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0 rounded-full hover:bg-red-100 hover:text-red-500"
          onClick={() => onDelete(task.id)}
        >
          &times;
        </Button>
      </div>
    </motion.div>
  );
};

// مكون لعرض قائمة بالمهام
export const TaskReminderList: React.FC<{
  tasks: TaskReminderType[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ tasks, onComplete, onDelete }) => {
  return (
    <div className="space-y-1">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

// مكون القطعة الرئيسية للمهام
export const TaskReminderWidget: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { taskReminders } = useSchedulerData();
  const [tasks, setTasks] = useState<TaskReminderType[]>(taskReminders || []);
  
  const onComplete = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    toast({
      title: t("tasks.statusChanged"),
      description: t("tasks.statusUpdated"),
    });
  };
  
  const onDelete = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    
    toast({
      title: t("tasks.deleted"),
      description: t("tasks.taskRemoved"),
    });
  };
  
  const onAddTask = () => {
    // في تطبيق حقيقي، هنا يمكن فتح نافذة حوار لإضافة مهمة
    toast({
      title: t("tasks.addNew"),
      description: t("tasks.createTask"),
    });
  };

  // فصل المهام إلى مجموعات: متأخرة، اليوم، قادمة، مكتملة
  const overdueActiveTasks = tasks.filter(task => 
    !task.completed && isBefore(new Date(task.dueDate), new Date())
  );
  
  const todayActiveTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    return (
      !task.completed && 
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  });
  
  const upcomingActiveTasks = tasks.filter(task => 
    !task.completed && isAfter(new Date(task.dueDate), new Date())
  );
  
  const completedTasks = tasks.filter(task => task.completed);
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{t("tasks.reminders")}</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 flex items-center gap-1"
          onClick={onAddTask}
        >
          <PlusCircle className="h-4 w-4" />
          {t("tasks.addNew")}
        </Button>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[500px]">
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {overdueActiveTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-red-500 mb-2">{t("tasks.overdue")}</h3>
                <TaskReminderList 
                  tasks={overdueActiveTasks} 
                  onComplete={onComplete}
                  onDelete={onDelete}
                />
              </div>
            )}
            
            {todayActiveTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">{t("tasks.today")}</h3>
                <TaskReminderList 
                  tasks={todayActiveTasks} 
                  onComplete={onComplete}
                  onDelete={onDelete}
                />
              </div>
            )}
            
            {upcomingActiveTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">{t("tasks.upcoming")}</h3>
                <TaskReminderList 
                  tasks={upcomingActiveTasks} 
                  onComplete={onComplete}
                  onDelete={onDelete}
                />
              </div>
            )}
            
            {completedTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">{t("tasks.completed")}</h3>
                <TaskReminderList 
                  tasks={completedTasks} 
                  onComplete={onComplete}
                  onDelete={onDelete}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {t("tasks.noTasks")}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskReminderWidget;
