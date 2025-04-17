
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Loader2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { SecurityCheck, SecurityTestDialogProps } from "./types";
import SecurityCheckItem from "./SecurityCheckItem";
import ProgressIndicator from "./ProgressIndicator";
import SecurityScore from "./SecurityScore";

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
              <ProgressIndicator progress={progress} />
              
              <div className="space-y-3 mt-6">
                <AnimatePresence>
                  {securityChecks.map((check) => (
                    <SecurityCheckItem key={check.id} check={check} />
                  ))}
                </AnimatePresence>
              </div>
              
              <SecurityScore 
                securityChecks={securityChecks} 
                progress={progress} 
                isRunning={isRunning} 
              />
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
