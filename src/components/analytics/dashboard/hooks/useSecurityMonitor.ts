
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

export type SecurityAlert = {
  id: string;
  type: 'session' | 'login' | 'password' | 'profile';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  resolved: boolean;
};

export const useSecurityMonitor = () => {
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [sessionCount, setSessionCount] = useState(0);
  const [lastLoginAt, setLastLoginAt] = useState<string | null>(null);

  // فحص الجلسات النشطة
  const checkActiveSessions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_user_sessions', {
        user_id: user.id
      });
      
      if (error) throw error;
      
      const sessions = Array.isArray(data) ? data : [];
      setSessionCount(sessions.length);
      
      // البحث عن جلسات مشبوهة (من مواقع جغرافية متباعدة في وقت قصير)
      if (sessions.length > 1) {
        const suspiciousSessions = detectSuspiciousSessions(sessions);
        if (suspiciousSessions.length > 0) {
          const newAlerts = suspiciousSessions.map(session => ({
            id: `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            type: 'session' as const,
            severity: 'high' as const,
            message: `تم اكتشاف جلسة مشبوهة من موقع: ${session.ip_address}`,
            timestamp: new Date().toISOString(),
            resolved: false
          }));
          
          setAlerts(prev => [...prev, ...newAlerts]);
        }
      }
      
      // تحديث وقت آخر تسجيل دخول
      const lastSession = [...sessions].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0];
      
      if (lastSession) {
        setLastLoginAt(lastSession.created_at);
      }
      
    } catch (error) {
      console.error("خطأ في فحص الجلسات النشطة:", error);
    } finally {
      setLoading(false);
    }
  };

  // وظيفة اكتشاف الجلسات المشبوهة (مبسطة للعرض)
  const detectSuspiciousSessions = (sessions: any[]) => {
    // هذه مجرد محاكاة لاكتشاف جلسات مشبوهة
    // في التطبيق الحقيقي، ستقوم بتحليل المواقع الجغرافية والأوقات والأجهزة
    return sessions.filter((_, index) => index === 0 && Math.random() > 0.7);
  };

  // فحص قوة كلمة المرور (مبسطة للعرض)
  const checkPasswordStrength = () => {
    if (!user) return;
    
    // في الحالة الحقيقية، ستحتاج لطريقة آمنة لتقييم قوة كلمة المرور
    // هنا نقوم بمحاكاة اكتشاف كلمة مرور ضعيفة
    const hasWeakPassword = Math.random() > 0.5;
    
    if (hasWeakPassword) {
      const newAlert: SecurityAlert = {
        id: `password-${Date.now()}`,
        type: 'password',
        severity: 'medium',
        message: 'كلمة المرور الحالية ضعيفة. يرجى تحديثها لزيادة أمان حسابك.',
        timestamp: new Date().toISOString(),
        resolved: false
      };
      
      setAlerts(prev => [...prev, newAlert]);
    }
  };

  // تمييز تنبيه كمحلول
  const resolveAlert = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, resolved: true } 
          : alert
      )
    );
    
    toast({
      title: "تم حل التنبيه",
      description: "تم تمييز التنبيه الأمني كمحلول"
    });
  };

  // إجراء فحص أمني كامل
  const runSecurityScan = async () => {
    setLoading(true);
    
    // تفريغ التنبيهات السابقة
    setAlerts([]);
    
    try {
      // فحص الجلسات النشطة
      await checkActiveSessions();
      
      // فحص قوة كلمة المرور
      checkPasswordStrength();
      
      // في التطبيق الحقيقي، ستضيف المزيد من الفحوصات هنا
      
      // إخطار المستخدم باكتمال الفحص
      toast({
        title: "اكتمل الفحص الأمني",
        description: `تم العثور على ${alerts.length} تنبيهات أمنية`
      });
    } catch (error) {
      console.error("خطأ أثناء إجراء الفحص الأمني:", error);
      toast({
        title: "خطأ في الفحص الأمني",
        description: "تعذر إكمال الفحص الأمني",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // إنشاء كلمة مرور قوية
  const generateStrongPassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    
    return password;
  };

  // تحديث عند تغيير المستخدم أو الجلسة
  useEffect(() => {
    if (user && session) {
      checkActiveSessions();
    }
  }, [user, session]);

  return {
    loading,
    alerts,
    sessionCount,
    lastLoginAt,
    resolveAlert,
    runSecurityScan,
    generateStrongPassword
  };
};
