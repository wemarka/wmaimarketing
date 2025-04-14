
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { platforms } from "@/modules/content-creator/utils/platformIcons";

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

  const resetForm = () => {
    setTitle("");
    setContent("");
    setPlatform("");
    setDate(undefined);
    setTime("");
    setIsRecurring(false);
    setRecurrencePattern("weekly");
    setRecurrenceEndDate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>جدولة منشور جديد</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان المنشور</Label>
            <Input 
              id="title" 
              placeholder="أدخل عنواناً وصفياً" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">محتوى المنشور</Label>
            <Textarea 
              id="content" 
              placeholder="اكتب محتوى منشورك هنا..." 
              className="min-h-[100px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">المنصة</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger id="platform">
                <SelectValue placeholder="اختر المنصة" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(platforms).map(([key, { icon, label }]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      {React.cloneElement(icon as React.ReactElement, {
                        className: `h-4 w-4 ${
                          key === "instagram" ? "text-pink-600" : 
                          key === "facebook" ? "text-blue-600" : 
                          key === "linkedin" ? "text-blue-700" :
                          key === "youtube" ? "text-red-600" :
                          key === "pinterest" ? "text-red-700" :
                          key === "twitter" ? "text-sky-500" :
                          "text-slate-600"
                        }`
                      })}
                      <span>{label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>التاريخ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>اختر تاريخاً</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">الوقت</Label>
              <Input 
                id="time" 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          
          {/* إضافة خيارات التكرار */}
          <div className="space-y-3 border-t pt-3">
            <div className="flex items-center gap-2">
              <input
                id="isRecurring"
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="isRecurring" className="cursor-pointer">نشر متكرر</Label>
            </div>
            
            {isRecurring && (
              <div className="space-y-3 pl-6 border-l-2 border-muted">
                <div className="space-y-2">
                  <Label htmlFor="recurrencePattern">نمط التكرار</Label>
                  <Select value={recurrencePattern} onValueChange={setRecurrencePattern}>
                    <SelectTrigger id="recurrencePattern">
                      <SelectValue placeholder="اختر نمط التكرار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">يومي</SelectItem>
                      <SelectItem value="weekly">أسبوعي</SelectItem>
                      <SelectItem value="monthly">شهري</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>تاريخ انتهاء التكرار</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !recurrenceEndDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {recurrenceEndDate ? format(recurrenceEndDate, "PPP") : <span>اختر تاريخاً</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={recurrenceEndDate}
                        onSelect={setRecurrenceEndDate}
                        initialFocus
                        className="pointer-events-auto"
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>الوسائط</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                اسحب الصور أو الفيديو هنا أو انقر للتصفح
              </p>
              <Input 
                id="media" 
                type="file" 
                className="hidden" 
                accept="image/*,video/*"
              />
              <Button variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('media')?.click()}>
                تحميل الوسائط
              </Button>
            </div>
          </div>

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
