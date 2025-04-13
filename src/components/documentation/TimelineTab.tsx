
import React, { useState } from "react";
import TimelineItem from "./TimelineItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Plus, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export interface PhaseData {
  id: number;
  name: string;
  status: "completed" | "in-progress" | "not-started";
  progress: number;
  description: string;
}

export interface TimelineTabProps {
  phases: PhaseData[];
  onAddPhase?: (phase: Omit<PhaseData, "id">) => void;
  onEditPhase?: (phase: PhaseData) => void;
}

const TimelineTab: React.FC<TimelineTabProps> = ({ phases, onAddPhase, onEditPhase }) => {
  const [displayPhases, setDisplayPhases] = useState<PhaseData[]>(phases);
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPhase, setNewPhase] = useState<Omit<PhaseData, "id">>({
    name: "",
    status: "not-started",
    progress: 0,
    description: "",
  });
  const { toast } = useToast();

  // Update displayPhases when phases prop changes
  React.useEffect(() => {
    setDisplayPhases(filterActive ? phases.filter(phase => phase.status === "in-progress") : phases);
  }, [phases, filterActive]);

  const showActiveOnly = () => {
    if (filterActive) {
      setDisplayPhases(phases);
      setFilterActive(false);
    } else {
      setDisplayPhases(phases.filter(phase => phase.status === "in-progress"));
      setFilterActive(true);
    }
  };

  const handleAddPhase = () => {
    if (!newPhase.name.trim()) {
      toast({
        title: "يرجى إدخال اسم المرحلة",
        description: "اسم المرحلة مطلوب لإضافة مرحلة جديدة",
        variant: "destructive"
      });
      return;
    }

    if (onAddPhase) {
      onAddPhase(newPhase);
      toast({
        title: "تمت الإضافة بنجاح",
        description: "تمت إضافة المرحلة الجديدة إلى الجدول الزمني",
      });
    }

    // Reset form and close dialog
    setNewPhase({
      name: "",
      status: "not-started",
      progress: 0,
      description: "",
    });
    setDialogOpen(false);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-beauty-gold" />
            <span>الجدول الزمني للمشروع</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={showActiveOnly}
              className="text-xs"
            >
              {filterActive ? "عرض الكل" : "عرض المراحل النشطة فقط"}
            </Button>
            
            {onAddPhase && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="text-xs gap-1">
                    <Plus className="h-3 w-3" />
                    إضافة مرحلة
                  </Button>
                </DialogTrigger>
                <DialogContent dir="rtl">
                  <DialogHeader>
                    <DialogTitle>إضافة مرحلة جديدة</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">اسم المرحلة</label>
                      <Input 
                        value={newPhase.name} 
                        onChange={(e) => setNewPhase({...newPhase, name: e.target.value})}
                        placeholder="أدخل اسم المرحلة" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الوصف</label>
                      <Textarea 
                        value={newPhase.description} 
                        onChange={(e) => setNewPhase({...newPhase, description: e.target.value})}
                        placeholder="أدخل وصف المرحلة" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الحالة</label>
                      <Select 
                        value={newPhase.status} 
                        onValueChange={(value: "completed" | "in-progress" | "not-started") => 
                          setNewPhase({...newPhase, status: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر حالة المرحلة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-started">لم تبدأ</SelectItem>
                          <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                          <SelectItem value="completed">مكتملة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(newPhase.status === "in-progress" || newPhase.status === "completed") && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">نسبة الإكمال ({newPhase.progress}%)</label>
                        <Input 
                          type="range" 
                          min={0} 
                          max={100} 
                          value={newPhase.progress} 
                          onChange={(e) => setNewPhase({...newPhase, progress: Number(e.target.value)})}
                        />
                      </div>
                    )}
                    
                    <Button onClick={handleAddPhase} className="w-full mt-4">
                      إضافة المرحلة
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-6 mt-4">
          {displayPhases.length > 0 ? (
            displayPhases.map((phase, index) => (
              <TimelineItem 
                key={phase.id} 
                phase={phase} 
                isLast={index === displayPhases.length - 1}
                onEdit={onEditPhase} 
              />
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              لا توجد مراحل نشطة حاليا
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineTab;
