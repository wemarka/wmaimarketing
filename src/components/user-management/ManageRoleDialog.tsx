
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Info, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

interface Permission {
  id: string;
  name: string;
  description: string | null;
}

interface ManageRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  onUpdateRole: () => Promise<void>;
}

const ManageRoleDialog = ({
  open,
  onOpenChange,
  selectedUser,
  setSelectedUser,
  onUpdateRole,
}: ManageRoleDialogProps) => {
  const [activeTab, setActiveTab] = useState<"role" | "permissions">("role");
  const [saving, setSaving] = useState(false);

  if (!selectedUser) return null;
  
  const getUserInitials = (user: User) => {
    if (!user.first_name && !user.last_name) {
      return user.email.substring(0, 2).toUpperCase();
    }
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  // Define role information for better display and explanation
  const roleInfo = {
    admin: {
      title: "مدير",
      description: "وصول كامل إلى جميع ميزات النظام وإدارة المستخدمين والأذونات",
      color: "red",
    },
    marketing: {
      title: "تسويق",
      description: "إدارة المحتوى والحملات التسويقية وتحليل الأداء",
      color: "blue",
    },
    designer: {
      title: "مصمم",
      description: "إنشاء وتحرير المحتوى البصري والإعلانات",
      color: "purple",
    },
    user: {
      title: "مستخدم",
      description: "وصول أساسي للمشاهدة والعمليات العادية",
      color: "gray",
    },
  };

  // Get current role information
  const currentRoleInfo = roleInfo[selectedUser.role as keyof typeof roleInfo];

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdateRole();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>إدارة دور المستخدم</DialogTitle>
          <DialogDescription>
            تغيير دور المستخدم وصلاحياته في النظام.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 mb-4 p-4 bg-muted/30 rounded-lg">
          <Avatar className="h-14 w-14">
            <AvatarImage src={selectedUser.avatar_url || ""} alt={`${selectedUser.first_name || 'مستخدم'}`} />
            <AvatarFallback>{getUserInitials(selectedUser)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium text-lg">
              {selectedUser.first_name || ''} {selectedUser.last_name || ''}
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedUser.email}
            </div>
            <div className="mt-1">
              <Badge className={`bg-${currentRoleInfo.color}-100 text-${currentRoleInfo.color}-800 hover:bg-${currentRoleInfo.color}-100`}>
                {currentRoleInfo.title}
              </Badge>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "role" | "permissions")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="role">الدور الوظيفي</TabsTrigger>
            <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
          </TabsList>

          <TabsContent value="role" className="py-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-1">
                  تغيير الدور
                </label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(value) =>
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
                    <SelectItem value="user">مستخدم</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm mt-0">
                  {roleInfo[selectedUser.role as keyof typeof roleInfo].description}
                </AlertDescription>
              </Alert>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">صلاحيات الدور:</h4>
                <div className="space-y-3 text-sm border rounded-lg p-3 bg-background">
                  {selectedUser.role === "admin" && (
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
                  )}
                  {selectedUser.role === "marketing" && (
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
                  )}
                  {selectedUser.role === "designer" && (
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
                  )}
                  {selectedUser.role === "user" && (
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
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="py-4">
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
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageRoleDialog;
