
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask?: (task: any) => void;
  relatedPostId?: string;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ 
  open, 
  onOpenChange,
  onAddTask,
  relatedPostId
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [priority, setPriority] = useState("medium");
  const [assignee, setAssignee] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !dueDate) {
      toast.error("يرجى إدخال عنوان المهمة وتاريخ الاستحقاق");
      return;
    }
    
    const newTask = {
      id: `task-${Date.now()}`,
      title,
      description,
      dueDate: dueDate?.toISOString(),
      priority: priority as "low" | "medium" | "high",
      completed: false,
      assignee: assignee || undefined,
      relatedPostId: relatedPostId || undefined
    };
    
    if (onAddTask) {
      onAddTask(newTask);
    }
    
    toast.success("تمت إضافة المهمة بنجاح");
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate(new Date());
    setPriority("medium");
    setAssignee("");
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetForm();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إضافة مهمة جديدة</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان المهمة</Label>
            <Input 
              id="title" 
              placeholder="أدخل عنوان المهمة" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea 
              id="description" 
              placeholder="أدخل وصف المهمة (اختياري)" 
              className="min-h-[80px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>تاريخ الاستحقاق</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-right font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP", { locale: ar }) : <span>اختر تاريخاً</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">الأولوية</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="اختر الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">منخفضة</SelectItem>
                  <SelectItem value="medium">متوسطة</SelectItem>
                  <SelectItem value="high">عالية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">المسؤول (اختياري)</Label>
            <Input 
              id="assignee" 
              placeholder="اسم الشخص المسؤول" 
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={() => {
              resetForm();
              onOpenChange(false);
            }}>
              إلغاء
            </Button>
            <Button type="submit">إضافة المهمة</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
