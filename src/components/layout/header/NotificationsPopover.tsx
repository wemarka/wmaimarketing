
import React from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

interface NotificationsPopoverProps {
  notificationCount: number;
  onNotificationClick: () => void;
}

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  notificationCount,
  onNotificationClick,
}) => {
  const { toast } = useToast();

  const handleViewAllClick = () => {
    toast({
      title: "عرض كل الإشعارات",
      description: "سيتم توجيهك إلى صفحة الإشعارات",
    });
    onNotificationClick();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-[10px] bg-red-500"
              variant="destructive"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-medium text-lg">الإشعارات</h3>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          <div className="p-3 border-b hover:bg-muted/40 cursor-pointer" onClick={onNotificationClick}>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-700 border-0">تسويق</Badge>
              <div>
                <p className="text-sm font-medium">إحصائيات الحملة الأخيرة جاهزة</p>
                <p className="text-xs text-muted-foreground">منذ ٢٠ دقيقة</p>
              </div>
            </div>
          </div>
          <div className="p-3 border-b hover:bg-muted/40 cursor-pointer" onClick={onNotificationClick}>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700 border-0">تعليق</Badge>
              <div>
                <p className="text-sm font-medium">علق شخص ما على منشورك "أفضل منتجات العناية للبشرة"</p>
                <p className="text-xs text-muted-foreground">منذ ساعتين</p>
              </div>
            </div>
          </div>
          <div className="p-3 border-b hover:bg-muted/40 cursor-pointer" onClick={onNotificationClick}>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700 border-0">نشر</Badge>
              <div>
                <p className="text-sm font-medium">تم نشر المحتوى المجدول بنجاح</p>
                <p className="text-xs text-muted-foreground">منذ ٥ ساعات</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 flex justify-center border-t">
          <Button variant="link" size="sm" className="text-xs" onClick={handleViewAllClick}>
            عرض كل الإشعارات
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
