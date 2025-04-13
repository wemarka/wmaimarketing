
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Plus, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface ProjectUpdate {
  id: number;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'warning' | 'success';
}

interface ProjectUpdatesProps {
  initialUpdates?: ProjectUpdate[];
}

const ProjectUpdates: React.FC<ProjectUpdatesProps> = ({ initialUpdates = [] }) => {
  const [updates, setUpdates] = useState<ProjectUpdate[]>(initialUpdates);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUpdate, setNewUpdate] = useState<Omit<ProjectUpdate, 'id' | 'date'>>({
    title: '',
    content: '',
    type: 'info'
  });
  const { toast } = useToast();

  const handleAddUpdate = () => {
    if (!newUpdate.title.trim()) {
      toast({
        title: "العنوان مطلوب",
        description: "يرجى إدخال عنوان للتحديث",
        variant: "destructive"
      });
      return;
    }

    const newUpdateWithId: ProjectUpdate = {
      id: updates.length > 0 ? Math.max(...updates.map(update => update.id)) + 1 : 1,
      title: newUpdate.title,
      content: newUpdate.content,
      type: newUpdate.type,
      date: new Date().toLocaleDateString('ar-EG')
    };

    setUpdates([newUpdateWithId, ...updates]);
    setNewUpdate({ title: '', content: '', type: 'info' });
    setIsAddDialogOpen(false);

    toast({
      title: "تمت الإضافة",
      description: "تمت إضافة التحديث بنجاح",
    });
  };

  const getUpdateIcon = (type: 'info' | 'warning' | 'success') => {
    switch (type) {
      case 'info':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-beauty-gold" />
            <span>تحديثات المشروع</span>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="text-xs gap-1">
                <Plus className="h-3 w-3" />
                إضافة تحديث
              </Button>
            </DialogTrigger>
            <DialogContent dir="rtl">
              <DialogHeader>
                <DialogTitle>إضافة تحديث جديد للمشروع</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">العنوان</label>
                  <Input
                    value={newUpdate.title}
                    onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                    placeholder="أدخل عنوان التحديث"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">المحتوى</label>
                  <Textarea
                    value={newUpdate.content}
                    onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                    placeholder="أدخل تفاصيل التحديث"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">النوع</label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={newUpdate.type === 'info' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setNewUpdate({ ...newUpdate, type: 'info' })}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      معلومة
                    </Button>
                    <Button
                      type="button"
                      variant={newUpdate.type === 'warning' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setNewUpdate({ ...newUpdate, type: 'warning' })}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      تنبيه
                    </Button>
                    <Button
                      type="button"
                      variant={newUpdate.type === 'success' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setNewUpdate({ ...newUpdate, type: 'success' })}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      نجاح
                    </Button>
                  </div>
                </div>

                <Button onClick={handleAddUpdate} className="w-full mt-4">
                  إضافة التحديث
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {updates.length > 0 ? (
          <div className="space-y-4 mt-4">
            {updates.map((update) => (
              <div key={update.id} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    {getUpdateIcon(update.type)}
                    <h3 className="font-medium">{update.title}</h3>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {update.date}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{update.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد تحديثات حتى الآن
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectUpdates;
