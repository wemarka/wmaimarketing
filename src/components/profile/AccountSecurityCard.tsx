
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, ClipboardCopy, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useSecurityMonitor } from "@/components/analytics/dashboard/hooks/useSecurityMonitor";
import SecurityTestDialog from "@/components/profile/SecurityTestDialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const AccountSecurityCard: React.FC = () => {
  const { user } = useAuth();
  const { sessionCount, lastLoginAt, loading, runSecurityScan, generateStrongPassword } = useSecurityMonitor();
  const [securityDialogOpen, setSecurityDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  
  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;
    
    let strength = 0;
    
    // طول كلمة المرور
    if (password.length >= 12) strength += 30;
    else if (password.length >= 8) strength += 20;
    else if (password.length >= 6) strength += 10;
    
    // تنوع الأحرف
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    return Math.min(100, strength);
  };
  
  const handleGeneratePassword = () => {
    const password = generateStrongPassword();
    setGeneratedPassword(password);
    setShowPassword(true);
  };
  
  const handleCopyPassword = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      toast({
        title: "تم النسخ",
        description: "تم نسخ كلمة المرور إلى الحافظة",
      });
    }
  };
  
  const passwordStrength = calculatePasswordStrength(generatedPassword);
  
  const getPasswordStrengthLabel = (strength: number) => {
    if (strength >= 80) return { label: "قوية جداً", color: "text-green-500" };
    if (strength >= 60) return { label: "قوية", color: "text-green-400" };
    if (strength >= 40) return { label: "متوسطة", color: "text-amber-500" };
    return { label: "ضعيفة", color: "text-red-500" };
  };
  
  const strengthLabel = getPasswordStrengthLabel(passwordStrength);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-beauty-purple" />
            أمان الحساب
          </CardTitle>
          <Badge variant="outline" className="bg-beauty-purple/10 text-beauty-purple">
            {sessionCount > 0 ? `${sessionCount} جلسة نشطة` : "لا توجد جلسات نشطة"}
          </Badge>
        </div>
        <CardDescription>
          إدارة إعدادات الأمان لحسابك ومراقبة النشاط المشبوه
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {lastLoginAt && (
          <div className="text-sm text-muted-foreground">
            آخر تسجيل دخول: {new Date(lastLoginAt).toLocaleString('ar-SA')}
          </div>
        )}
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              تفعيل المصادقة الثنائية
            </div>
            <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
              موصى به
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              مراقبة تسجيلات الدخول
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
              مفعّل
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              إشعارات الأمان
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
              مفعّل
            </Badge>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            منشئ كلمات المرور القوية
          </h4>
          
          {generatedPassword ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    readOnly
                    value={generatedPassword}
                    className="w-full pr-10 py-2 px-3 border rounded-md"
                  />
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "إخفاء" : "إظهار"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button size="icon" variant="outline" onClick={handleCopyPassword} title="نسخ">
                  <ClipboardCopy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>قوة كلمة المرور:</span>
                  <span className={strengthLabel.color}>{strengthLabel.label}</span>
                </div>
                <Progress value={passwordStrength} className="h-2" />
              </div>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGeneratePassword}
              className="w-full"
            >
              إنشاء كلمة مرور قوية
            </Button>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => setSecurityDialogOpen(true)}
          disabled={loading}
        >
          <Shield className="mr-2 h-4 w-4" />
          اختبار أمان الحساب
        </Button>
      </CardFooter>
      
      <SecurityTestDialog 
        open={securityDialogOpen} 
        onOpenChange={setSecurityDialogOpen} 
      />
    </Card>
  );
};

export default AccountSecurityCard;
