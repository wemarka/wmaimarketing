
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { UserRole } from "@/modules/dashboard/utils/types/sidebarTypes";
import { User } from "@/hooks/user-management/types";
import { roleInfo } from "@/hooks/user-management/useRoleManagement";

interface RoleTabContentProps {
  selectedUser: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const RoleTabContent = ({ selectedUser, setSelectedUser }: RoleTabContentProps) => {
  const renderRolePermissions = () => {
    switch (selectedUser.role) {
      case "admin":
        return (
          <>
            <div className="flex items-center">
              <Checkbox id="perm1" checked disabled />
              <label htmlFor="perm1" className="mr-2">إدارة المستخدمين والأدوار</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="perm2" checked disabled />
              <label htmlFor="perm2" className="mr-2">إنشاء وتحرير وحذف المحتوى</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="perm3" checked disabled />
              <label htmlFor="perm3" className="mr-2">الوصول إلى التحليلات والتقارير</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="perm4" checked disabled />
              <label htmlFor="perm4" className="mr-2">إدارة الإعدادات العامة للنظام</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="perm5" checked disabled />
              <label htmlFor="perm5" className="mr-2">جدولة ونشر المحتوى</label>
            </div>
          </>
        );
      case "marketing":
        return (
          <>
            <div className="flex items-center">
              <Checkbox id="perm2" checked disabled />
              <label htmlFor="perm2" className="mr-2">إنشاء وتحرير المحتوى</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="perm3" checked disabled />
              <label htmlFor="perm3" className="mr-2">الوصول إلى التحليلات</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="perm5" checked disabled />
              <label htmlFor="perm5" className="mr-2">جدولة ونشر المحتوى</label>
            </div>
          </>
        );
      case "designer":
        return (
          <>
            <div className="flex items-center">
              <Checkbox id="perm2" checked disabled />
              <label htmlFor="perm2" className="mr-2">إنشاء وتحرير الصور والإعلانات</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="perm6" checked disabled />
              <label htmlFor="perm6" className="mr-2">رفع الملفات والصور</label>
            </div>
          </>
        );
      case "editor":
        return (
          <>
            <div className="flex items-center">
              <Checkbox id="perm2" checked disabled />
              <label htmlFor="perm2" className="mr-2">إنشاء وتحرير المحتوى النصي</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="perm6" checked disabled />
              <label htmlFor="perm6" className="mr-2">إدارة المدونة</label>
            </div>
          </>
        );
      case "analyst":
        return (
          <>
            <div className="flex items-center">
              <Checkbox id="perm3" checked disabled />
              <label htmlFor="perm3" className="mr-2">الوصول إلى التحليلات والتقارير</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="perm7" checked disabled />
              <label htmlFor="perm7" className="mr-2">إنشاء تقارير أداء</label>
            </div>
          </>
        );
      case "user":
      default:
        return (
          <>
            <div className="flex items-center">
              <Checkbox id="perm4" checked disabled />
              <label htmlFor="perm4" className="mr-2">عرض المحتوى</label>
            </div>
            <div className="flex items-center">
              <Checkbox id="perm7" checked disabled />
              <label htmlFor="perm7" className="mr-2">تعديل الملف الشخصي</label>
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="role" className="block text-sm font-medium mb-1">
          تغيير الدور
        </label>
        <Select
          value={selectedUser.role}
          onValueChange={(value: UserRole) =>
            setSelectedUser({ ...selectedUser, role: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر الدور" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">مدير</SelectItem>
            <SelectItem value="marketing">تسويق</SelectItem>
            <SelectItem value="designer">مصمم</SelectItem>
            <SelectItem value="editor">محرر</SelectItem>
            <SelectItem value="analyst">محلل</SelectItem>
            <SelectItem value="user">مستخدم</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm mt-0">
          {roleInfo[selectedUser.role as keyof typeof roleInfo]?.description || "وصف الدور غير متوفر"}
        </AlertDescription>
      </Alert>

      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">صلاحيات الدور:</h4>
        <div className="space-y-3 text-sm border rounded-lg p-3 bg-background">
          {renderRolePermissions()}
        </div>
      </div>
    </div>
  );
};

export default RoleTabContent;
