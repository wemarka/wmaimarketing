
import React from "react";
import { AlertCircle, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { User } from "@/hooks/user-management/types";

interface PermissionsTabContentProps {
  selectedUser: User;
}

const PermissionsTabContent = ({ selectedUser }: PermissionsTabContentProps) => {
  return (
    <div>
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-sm mt-0">
          صلاحيات المستخدم مرتبطة بالدور الذي تم تعيينه. قم بتغيير الدور في تبويب "الدور الوظيفي".
        </AlertDescription>
      </Alert>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2 flex items-center">
          <Shield className="inline-block h-4 w-4 ml-1" />
          الصلاحيات حسب المجموعة
        </h4>
        <div className="space-y-4">
          <div className="border rounded-lg p-3">
            <h5 className="font-medium mb-2">إدارة المستخدمين</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">عرض المستخدمين</span>
                <Badge variant={selectedUser.role === "admin" || selectedUser.role === "marketing" ? "default" : "outline"}>
                  {selectedUser.role === "admin" || selectedUser.role === "marketing" ? "مسموح" : "غير مسموح"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">إضافة مستخدمين</span>
                <Badge variant={selectedUser.role === "admin" ? "default" : "outline"}>
                  {selectedUser.role === "admin" ? "مسموح" : "غير مسموح"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">إدارة الأدوار</span>
                <Badge variant={selectedUser.role === "admin" ? "default" : "outline"}>
                  {selectedUser.role === "admin" ? "مسموح" : "غير مسموح"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-3">
            <h5 className="font-medium mb-2">إدارة المحتوى</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">إنشاء محتوى</span>
                <Badge variant={selectedUser.role !== "user" ? "default" : "outline"}>
                  {selectedUser.role !== "user" ? "مسموح" : "غير مسموح"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">تحرير محتوى</span>
                <Badge variant={selectedUser.role !== "user" ? "default" : "outline"}>
                  {selectedUser.role !== "user" ? "مسموح" : "غير مسموح"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">حذف محتوى</span>
                <Badge variant={selectedUser.role === "admin" || selectedUser.role === "marketing" ? "default" : "outline"}>
                  {selectedUser.role === "admin" || selectedUser.role === "marketing" ? "مسموح" : "غير مسموح"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-3">
            <h5 className="font-medium mb-2">التحليلات</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">عرض التقارير</span>
                <Badge variant={selectedUser.role === "admin" || selectedUser.role === "marketing" ? "default" : "outline"}>
                  {selectedUser.role === "admin" || selectedUser.role === "marketing" ? "مسموح" : "غير مسموح"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">تصدير البيانات</span>
                <Badge variant={selectedUser.role === "admin" ? "default" : "outline"}>
                  {selectedUser.role === "admin" ? "مسموح" : "غير مسموح"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsTabContent;
