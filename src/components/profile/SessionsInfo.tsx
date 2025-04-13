
import React from "react";
import { Button } from "@/components/ui/button";
import { Key, Laptop } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SessionsInfoProps {
  onLogoutOtherSessions: () => Promise<void>;
  isLoading: boolean;
}

const SessionsInfo = ({ onLogoutOtherSessions, isLoading }: SessionsInfoProps) => {
  return (
    <div className="rounded-md border border-muted p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Key className="h-4 w-4 ml-2" />
          <span className="font-medium">الجلسة الحالية</span>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">نشطة</Badge>
      </div>
      
      <div className="text-muted-foreground text-sm space-y-1">
        <div className="flex items-center">
          <Laptop className="h-4 w-4 ml-2" />
          <span>{navigator.userAgent.split(" ").slice(0, 3).join(" ")}</span>
        </div>
        <p>تاريخ آخر دخول: {new Date().toLocaleDateString("ar-SA")}</p>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={onLogoutOtherSessions}
        disabled={isLoading}
      >
        {isLoading ? "جاري تسجيل الخروج..." : "تسجيل الخروج من جميع الجلسات الأخرى"}
      </Button>
    </div>
  );
};

export default SessionsInfo;
