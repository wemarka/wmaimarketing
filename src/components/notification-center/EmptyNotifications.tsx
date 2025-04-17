
import React from "react";
import { Bell } from "lucide-react";
import { useTranslation } from "react-i18next";

const EmptyNotifications: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="py-12 text-center">
      <Bell className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
      <p className="text-muted-foreground">
        {t("notificationCenter.noNotifications", "لا توجد إشعارات لعرضها")}
      </p>
    </div>
  );
};

export default EmptyNotifications;
