
import React from "react";
import { Button } from "@/components/ui/button";
import { Key, Laptop, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface SessionsInfoProps {
  onLogoutOtherSessions: () => Promise<void>;
  isLoading: boolean;
}

const SessionsInfo = ({ onLogoutOtherSessions, isLoading }: SessionsInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="overflow-hidden border-2 border-border/30 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="bg-card/50 backdrop-blur-sm flex flex-row items-center gap-4">
          <div className="p-2 rounded-full bg-primary/10">
            <Key className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              جلسات تسجيل الدخول
            </CardTitle>
            <CardDescription>
              إدارة جلسات تسجيل الدخول النشطة على حسابك
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <motion.div 
            className="rounded-md border border-muted p-4 space-y-4 hover:border-primary/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-50 border border-green-200">
                  <Key className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-medium">الجلسة الحالية</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">نشطة</Badge>
            </div>
            
            <div className="text-muted-foreground text-sm space-y-2">
              <div className="flex items-center gap-2">
                <Laptop className="h-4 w-4" />
                <span>{navigator.userAgent.split(" ").slice(0, 3).join(" ")}</span>
              </div>
              <p>تاريخ آخر دخول: {new Date().toLocaleDateString("ar-SA")}</p>
            </div>
          </motion.div>
          
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
            className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors" 
            onClick={onLogoutOtherSessions}
            disabled={isLoading}
          >
            {isLoading ? "جاري تسجيل الخروج..." : "تسجيل الخروج من جميع الجلسات الأخرى"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SessionsInfo;
