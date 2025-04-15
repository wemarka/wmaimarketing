
import React from "react";
import { Bell } from "lucide-react";

interface EmptyNotificationsProps {
  activeTab: string;
}

const EmptyNotifications: React.FC<EmptyNotificationsProps> = ({ activeTab }) => {
  return (
    <div className="py-12 px-4 text-center text-muted-foreground">
      <div className="flex justify-center mb-3">
        <Bell className="h-12 w-12 text-muted-foreground/40" />
      </div>
      <p className="mb-1">لا توجد إشعارات {activeTab !== "all" ? "في هذا القسم" : ""}</p>
      <p className="text-sm">ستظهر الإشعارات الجديدة هنا</p>
    </div>
  );
};

export default EmptyNotifications;
