
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Globe, Monitor, Smartphone, Calendar, Clock, AlertCircle } from "lucide-react";
import { usePasswordManagement } from "@/hooks/usePasswordManagement";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type SessionInfo = {
  id: string;
  created_at: string;
  last_active: string;
  ip_address: string;
  user_agent: string;
  is_current: boolean;
  location?: string;
  device_type: "desktop" | "mobile" | "tablet" | "unknown";
};

const SessionsInfo = () => {
  const { loggingOut, logoutOtherSessions } = usePasswordManagement();
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        // في التطبيق الحقيقي، ستستخدم دالة RPC لجلب الجلسات
        // هنا نستخدم بيانات تجريبية
        
        // محاكاة استدعاء الخادم
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // الجلسة الحالية
        const currentSession = {
          id: "current-session-123",
          created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          last_active: new Date().toISOString(),
          ip_address: "192.168.1.1",
          user_agent: navigator.userAgent,
          is_current: true,
          location: "الرياض، المملكة العربية السعودية",
          device_type: detectDeviceType(navigator.userAgent)
        };
        
        // جلسات أخرى
        const otherSessions = [
          {
            id: "session-456",
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
            last_active: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
            ip_address: "182.168.32.45",
            user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
            is_current: false,
            location: "جدة، المملكة العربية السعودية",
            device_type: "desktop" as const
          },
          {
            id: "session-789",
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
            last_active: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            ip_address: "104.28.42.25",
            user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X)",
            is_current: false,
            location: "القاهرة، مصر",
            device_type: "mobile" as const
          }
        ];
        
        setSessions([currentSession, ...otherSessions]);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        toast({
          title: "خطأ في جلب المعلومات",
          description: "تعذر جلب معلومات الجلسات النشطة",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSessions();
  }, []);
  
  // اكتشاف نوع الجهاز من معلومات المتصفح
  const detectDeviceType = (userAgent: string): "desktop" | "mobile" | "tablet" | "unknown" => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|tablet|PlayBook|Silk|Android(?!.*Mobile)/i.test(userAgent);
    
    if (isTablet) return "tablet";
    if (isMobile) return "mobile";
    if (userAgent.includes("Windows") || userAgent.includes("Macintosh") || userAgent.includes("Linux")) return "desktop";
    return "unknown";
  };
  
  // الحصول على أيقونة الجهاز
  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "desktop":
        return <Monitor className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };
  
  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // تنسيق الوقت
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // حساب الوقت منذ آخر نشاط
  const getLastActiveText = (dateString: string) => {
    const lastActive = new Date(dateString).getTime();
    const now = Date.now();
    const diffMinutes = Math.floor((now - lastActive) / (1000 * 60));
    
    if (diffMinutes < 1) return "الآن";
    if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `منذ ${diffDays} يوم`;
  };
  
  // إنهاء جلسة محددة
  const terminateSession = async (sessionId: string) => {
    try {
      // في التطبيق الحقيقي، ستستدعي وظيفة من الخادم لإنهاء الجلسة
      // هنا نحذفها من القائمة المحلية فقط
      
      toast({
        title: "جاري إنهاء الجلسة...",
        description: "يتم الآن إنهاء الجلسة المحددة"
      });
      
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSessions(currentSessions => 
        currentSessions.filter(session => session.id !== sessionId)
      );
      
      toast({
        title: "تم إنهاء الجلسة",
        description: "تم إنهاء الجلسة بنجاح"
      });
    } catch (error) {
      console.error("Error terminating session:", error);
      toast({
        title: "خطأ",
        description: "تعذر إنهاء الجلسة",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="h-5 w-5 text-beauty-purple" />
          الجلسات النشطة
        </CardTitle>
        <CardDescription>
          مراجعة وإدارة جميع الجلسات النشطة لحسابك
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {loading ? (
          <div className="py-8 text-center text-muted-foreground">
            جاري تحميل معلومات الجلسات...
          </div>
        ) : sessions.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            لا توجد جلسات نشطة
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <motion.div
                key={session.id}
                className={`p-4 rounded-lg border ${session.is_current ? 'bg-beauty-purple/5 border-beauty-purple/20' : 'bg-gray-50 border-gray-100'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getDeviceIcon(session.device_type)}
                      <span className="font-medium">
                        {session.device_type === "mobile" ? "هاتف محمول" : 
                         session.device_type === "tablet" ? "جهاز لوحي" : "جهاز كمبيوتر"}
                      </span>
                      {session.is_current && (
                        <Badge variant="default" className="ml-2 bg-beauty-purple text-white">
                          الجلسة الحالية
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-2">
                      {session.user_agent.split(' ').slice(0, 3).join(' ')}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{session.ip_address}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{formatDate(session.created_at)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{getLastActiveText(session.last_active)}</span>
                      </div>
                      
                      {session.location && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{session.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {!session.is_current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => terminateSession(session.id)}
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      إنهاء
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {sessions.length > 1 && (
          <>
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between">
              <div className="text-sm flex items-center">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                <span>لديك {sessions.length - 1} جلسة نشطة أخرى</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 border-red-200 hover:bg-red-50"
                onClick={logoutOtherSessions}
                disabled={loggingOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                إنهاء جميع الجلسات الأخرى
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionsInfo;
