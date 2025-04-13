
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, CheckCircle2, XCircle, AlertTriangle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SecurityTestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SecurityCheck = {
  id: string;
  name: string;
  status: "pending" | "running" | "passed" | "warning" | "failed";
  message?: string;
};

const SecurityTestDialog = ({ open, onOpenChange }: SecurityTestDialogProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([
    { id: "password", name: "قوة كلمة المرور", status: "pending" },
    { id: "sessions", name: "فحص الجلسات النشطة", status: "pending" },
    { id: "activity", name: "نشاط مشبوه", status: "pending" },
    { id: "2fa", name: "المصادقة الثنائية", status: "pending" },
    { id: "personal", name: "معلومات شخصية", status: "pending" }
  ]);

  const runSecurityCheck = () => {
    setIsRunning(true);
    setProgress(0);
    
    // Reset all checks to pending
    setSecurityChecks(checks => checks.map(check => ({ ...check, status: "pending" as const, message: undefined })));
    
    // Simulate security checks
    const totalChecks = securityChecks.length;
    let currentCheck = 0;
    
    const simulateCheck = (index: number) => {
      if (index >= totalChecks) {
        setIsRunning(false);
        setProgress(100);
        return;
      }
      
      const updatedChecks = [...securityChecks];
      updatedChecks[index].status = "running";
      setSecurityChecks(updatedChecks);
      
      // Simulate delay for check running
      setTimeout(() => {
        const checkResults = [
          // Password check (warning - moderate strength)
          { status: "warning", message: "كلمة المرور ذات قوة متوسطة. نوصي باستخدام كلمة مرور أقوى." },
          // Sessions check (passed)
          { status: "passed", message: "لا توجد جلسات مشبوهة نشطة." },
          // Suspicious activity (failed)
          { status: "failed", message: "تم اكتشاف محاولة تسجيل دخول مشبوهة من موقع جغرافي غير معتاد." },
          // 2FA check (failed)
          { status: "failed", message: "المصادقة الثنائية غير مفعلة. نوصي بتفعيلها لزيادة أمان حسابك." },
          // Personal info check (passed)
          { status: "passed", message: "معلوماتك الشخصية محمية بشكل جيد." }
        ];
        
        updatedChecks[index].status = checkResults[index].status as "passed" | "warning" | "failed";
        updatedChecks[index].message = checkResults[index].message;
        setSecurityChecks(updatedChecks);
        
        // Update progress
        currentCheck++;
        setProgress((currentCheck / totalChecks) * 100);
        
        // Move to next check
        simulateCheck(index + 1);
      }, 1000);
    };
    
    simulateCheck(0);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case "passed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-300" />;
    }
  };
  
  const getSecurityScore = () => {
    if (!isRunning && progress === 0) return null;
    
    const completed = securityChecks.filter(check => check.status !== "pending" && check.status !== "running");
    if (completed.length === 0) return null;
    
    const passed = securityChecks.filter(check => check.status === "passed").length;
    const warnings = securityChecks.filter(check => check.status === "warning").length;
    const score = Math.round(((passed + (warnings * 0.5)) / securityChecks.length) * 100);
    
    let scoreClass = "text-red-500";
    if (score >= 70) scoreClass = "text-green-500";
    else if (score >= 40) scoreClass = "text-amber-500";
    
    return (
      <motion.div 
        className="flex flex-col items-center justify-center p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xl font-bold mb-2">
          درجة الأمان: <span className={scoreClass}>{score}%</span>
        </div>
        <Progress value={score} className="h-2 w-full" />
      </motion.div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            اختبار أمان الحساب
          </DialogTitle>
          <DialogDescription>
            يقوم الاختبار بتحليل إعدادات حسابك وتحديد مستوى الأمان ومقترحات التحسين.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          {progress === 0 && !isRunning && (
            <div className="text-center p-6">
              <Shield className="h-16 w-16 mx-auto text-primary/50 mb-4" />
              <p className="text-muted-foreground">
                اضغط على زر "بدء الاختبار" لتشغيل اختبار شامل لأمان حسابك.
              </p>
            </div>
          )}
          
          {(progress > 0 || isRunning) && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>جاري فحص أمان الحساب...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="space-y-3 mt-6">
                <AnimatePresence>
                  {securityChecks.map((check) => (
                    <motion.div
                      key={check.id}
                      className={`flex items-start gap-3 p-3 rounded-md border ${
                        check.status === "running" ? "border-blue-200 bg-blue-50" :
                        check.status === "passed" ? "border-green-200 bg-green-50" : 
                        check.status === "warning" ? "border-amber-200 bg-amber-50" :
                        check.status === "failed" ? "border-red-200 bg-red-50" :
                        "border-gray-200"
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mt-0.5">
                        {getStatusIcon(check.status)}
                      </div>
                      <div>
                        <div className="font-medium">{check.name}</div>
                        {check.message && (
                          <p className="text-sm mt-1">
                            {check.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {getSecurityScore()}
            </>
          )}
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isRunning}
          >
            إغلاق
          </Button>
          <Button 
            onClick={runSecurityCheck}
            disabled={isRunning}
            className="gap-2"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                جاري الفحص...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                {progress > 0 ? "إعادة الاختبار" : "بدء الاختبار"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SecurityTestDialog;
