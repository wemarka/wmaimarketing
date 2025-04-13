
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, ImageIcon, MessageSquare, Video, RotateCw, List, Clock } from "lucide-react";
import ContentEnhancer from "@/components/ai/ContentEnhancer";
import ImageGenerator from "@/components/ai/ImageGenerator";
import TimelineTab from "@/components/documentation/TimelineTab";
import { PhaseData } from "@/components/documentation/TimelineTab";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AIStudio = () => {
  // State for phases
  const [demoPhases, setDemoPhases] = useState<PhaseData[]>([
    {
      id: 1,
      name: "تخطيط المحتوى",
      status: "completed",
      progress: 100,
      description: "إعداد إستراتيجية المحتوى وتحديد الأهداف وجمهور المستهدف"
    },
    {
      id: 2,
      name: "إنتاج المحتوى",
      status: "in-progress",
      progress: 65,
      description: "كتابة النصوص وإعداد الصور باستخدام الذكاء الاصطناعي"
    },
    {
      id: 3,
      name: "مراجعة وتحسين",
      status: "not-started",
      progress: 0,
      description: "مراجعة المحتوى وتحسينه لزيادة فعاليته وجاذبيته"
    },
    {
      id: 4,
      name: "النشر والتوزيع",
      status: "not-started",
      progress: 0,
      description: "نشر المحتوى على القنوات المناسبة وتوزيعه على الجمهور المستهدف"
    }
  ]);
  
  // State for editing phase
  const [editingPhase, setEditingPhase] = useState<PhaseData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Function to add a new phase
  const handleAddPhase = (newPhase: Omit<PhaseData, "id">) => {
    const maxId = demoPhases.reduce((max, phase) => Math.max(max, phase.id), 0);
    const phaseWithId: PhaseData = {
      ...newPhase,
      id: maxId + 1
    };
    setDemoPhases([...demoPhases, phaseWithId]);
  };
  
  // Function to open edit dialog
  const handleEditPhase = (phase: PhaseData) => {
    setEditingPhase(phase);
    setIsEditDialogOpen(true);
  };
  
  // Function to save edited phase
  const saveEditedPhase = () => {
    if (!editingPhase) return;
    
    setDemoPhases(demoPhases.map(phase => 
      phase.id === editingPhase.id ? editingPhase : phase
    ));
    
    setIsEditDialogOpen(false);
    setEditingPhase(null);
    
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم تحديث المرحلة بنجاح",
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-beauty-gold" />
            استوديو الذكاء الاصطناعي
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            استفد من قوة الذكاء الاصطناعي لتحسين محتواك وإنشاء صور جذابة وتعزيز جهود التسويق الخاصة بك
          </p>
        </div>

        <Tabs defaultValue="content" className="space-y-8">
          <TabsList>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              تحسين المحتوى
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              إنشاء الصور
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              الجدول الزمني
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              تحسين الفيديوهات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ContentEnhancer />
          </TabsContent>
          
          <TabsContent value="images">
            <ImageGenerator />
          </TabsContent>
          
          <TabsContent value="timeline">
            <TimelineTab 
              phases={demoPhases} 
              onAddPhase={handleAddPhase}
              onEditPhase={handleEditPhase}
            />
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="border rounded-md p-8 text-center">
              <RotateCw className="h-10 w-10 text-muted-foreground mb-4 mx-auto animate-spin animate-once" />
              <h3 className="text-lg font-medium mb-2">قريبًا</h3>
              <p className="text-muted-foreground">
                ميزة تحسين الفيديوهات بالذكاء الاصطناعي قيد التطوير وستكون متاحة قريبًا
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Edit Phase Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent dir="rtl">
            <DialogHeader>
              <DialogTitle>تعديل المرحلة</DialogTitle>
            </DialogHeader>
            
            {editingPhase && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">اسم المرحلة</label>
                  <Input 
                    value={editingPhase.name} 
                    onChange={(e) => setEditingPhase({...editingPhase, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">الوصف</label>
                  <Textarea 
                    value={editingPhase.description} 
                    onChange={(e) => setEditingPhase({...editingPhase, description: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">الحالة</label>
                  <Select 
                    value={editingPhase.status} 
                    onValueChange={(value: "completed" | "in-progress" | "not-started") => {
                      const newProgress = value === "completed" ? 100 : 
                                          value === "not-started" ? 0 : 
                                          editingPhase.progress;
                      setEditingPhase({...editingPhase, status: value, progress: newProgress});
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-started">لم يبدأ</SelectItem>
                      <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                      <SelectItem value="completed">مكتمل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">نسبة الإكمال ({editingPhase.progress}%)</label>
                  <Input 
                    type="range" 
                    min={0} 
                    max={100} 
                    value={editingPhase.progress} 
                    onChange={(e) => setEditingPhase({...editingPhase, progress: parseInt(e.target.value)})}
                  />
                </div>
                
                <Button onClick={saveEditedPhase} className="w-full mt-4">
                  حفظ التغييرات
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AIStudio;
