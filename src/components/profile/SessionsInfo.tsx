
import React from "react";
import { Button } from "@/components/ui/button";
import { Key, Laptop, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SessionsInfoProps {
  onLogoutOtherSessions: () => Promise<void>;
  isLoading: boolean;
}

const SessionsInfo = ({ onLogoutOtherSessions, isLoading }: SessionsInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>جلسات تسجيل الدخول</CardTitle>
        <CardDescription>
          إدارة جلسات تسجيل الدخول النشطة على حسابك
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-md border border-muted p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span className="font-medium">الجلسة الحالية</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">نشطة</Badge>
          </div>
          
          <div className="text-muted-foreground text-sm space-y-1">
            <div className="flex items-center gap-2">
              <Laptop className="h-4 w-4" />
              <span>{navigator.userAgent.split(" ").slice(0, 3).join(" ")}</span>
            </div>
            <p>تاريخ آخر دخول: {new Date().toLocaleDateString("ar-SA")}</p>
          </div>
        </div>
        
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-800 font-medium">أمان الحساب</p>
            <p className="text-amber-700 text-sm mt-1">
              تسجيل الخروج من جميع الجلسات الأخرى سيؤدي إلى تسجيل الخروج من جميع الأجهزة الأخرى المتصلة بحسابك.
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onLogoutOtherSessions}
          disabled={isLoading}
        >
          {isLoading ? "جاري تسجيل الخروج..." : "تسجيل الخروج من جميع الجلسات الأخرى"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SessionsInfo;
