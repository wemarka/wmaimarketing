
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { TaskReminder } from "@/components/dashboard/notifications/types";
import { TaskReminderList } from "../TaskReminder";

interface TaskReminderIntegrationProps {
  tasks: TaskReminder[];
  onAddTask: () => void;
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskReminderIntegration: React.FC<TaskReminderIntegrationProps> = ({
  tasks,
  onAddTask,
  onCompleteTask,
  onDeleteTask
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">المهام المرتبطة</CardTitle>
        <Button 
          onClick={onAddTask}
          variant="outline" 
          size="sm"
          className="h-8 flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          إضافة مهمة
        </Button>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <TaskReminderList 
            tasks={tasks} 
            onComplete={onCompleteTask} 
            onDelete={onDeleteTask}
          />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد مهام مرتبطة بعد
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskReminderIntegration;
