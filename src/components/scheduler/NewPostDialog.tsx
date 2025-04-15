
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

import {
  DateTimeSection,
  MediaUploadSection,
  PlatformSection,
  RecurrenceSection,
  RecurringToggle,
  TitleContentSection
} from "./post-dialog";

interface NewPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewPostDialog: React.FC<NewPostDialogProps> = ({ open, onOpenChange }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  
  // إضافة إعدادات التكرار
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState("weekly");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date | undefined>(undefined);
  
  // Media state
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !platform || !date || !time) {
      toast({
        title: "خطأ في التحقق",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    // إضافة معلومات التكرار إلى رسالة النجاح
    const recurringText = isRecurring 
      ? ` (يتكرر ${recurrencePattern === 'weekly' ? 'أسبوعياً' : 
             recurrencePattern === 'monthly' ? 'شهرياً' : 'يومياً'})`
      : '';
    
    toast({
      title: "تمت الجدولة بنجاح",
      description: `تم جدولة المنشور${recurringText}`,
    });
    
    resetForm();
    onOpenChange(false);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeMedia = (index: number) => {
    setPreviewUrls(prev => {
      const newUrls = [...prev];
      URL.revokeObjectURL(newUrls[index]); // Revoke URL to prevent memory leaks
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setPlatform("");
    setDate(undefined);
    setTime("");
    setIsRecurring(false);
    setRecurrencePattern("weekly");
    setRecurrenceEndDate(undefined);
    
    // Clean up preview URLs to prevent memory leaks
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>جدولة منشور جديد</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <TitleContentSection
            title={title}
            content={content}
            setTitle={setTitle}
            setContent={setContent}
          />

          <PlatformSection
            platform={platform}
            setPlatform={setPlatform}
          />

          <DateTimeSection
            date={date}
            time={time}
            setDate={setDate}
            setTime={setTime}
          />
          
          <div className="space-y-3 border-t pt-3">
            <RecurringToggle
              isRecurring={isRecurring}
              setIsRecurring={setIsRecurring}
            />
            
            <RecurrenceSection
              isRecurring={isRecurring}
              recurrencePattern={recurrencePattern}
              recurrenceEndDate={recurrenceEndDate}
              setRecurrencePattern={setRecurrencePattern}
              setRecurrenceEndDate={setRecurrenceEndDate}
            />
          </div>

          <MediaUploadSection
            previewUrls={previewUrls}
            onMediaChange={handleMediaChange}
            onRemoveMedia={removeMedia}
          />

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button" onClick={resetForm}>إلغاء</Button>
            </DialogClose>
            <Button type="submit">جدولة المنشور</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostDialog;
