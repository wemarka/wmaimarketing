
import React from "react";
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

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
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
  if (!selectedUser) return null;
  
  const getUserInitials = (user: User) => {
    if (!user.first_name && !user.last_name) {
      return user.email.substring(0, 2).toUpperCase();
    }
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إدارة دور المستخدم</DialogTitle>
          <DialogDescription>
            تغيير دور المستخدم وصلاحياته في النظام.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src={selectedUser.avatar_url || ""} alt={`${selectedUser.first_name || 'User'}`} />
              <AvatarFallback>{getUserInitials(selectedUser)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">
                {selectedUser.first_name} {selectedUser.last_name}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedUser.email}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              الدور
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
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">الصلاحيات المضمنة:</h4>
            <div className="space-y-2 text-sm">
              {selectedUser.role === "admin" && (
                <>
                  <div className="flex items-center">
                    <Checkbox id="perm1" checked disabled />
                    <label htmlFor="perm1" className="mr-2">إدارة المستخدمين</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="perm2" checked disabled />
                    <label htmlFor="perm2" className="mr-2">إدارة المحتوى</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="perm3" checked disabled />
                    <label htmlFor="perm3" className="mr-2">الوصول إلى التحليلات</label>
                  </div>
                </>
              )}
              {selectedUser.role === "marketing" && (
                <>
                  <div className="flex items-center">
                    <Checkbox id="perm2" checked disabled />
                    <label htmlFor="perm2" className="mr-2">إدارة المحتوى</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="perm3" checked disabled />
                    <label htmlFor="perm3" className="mr-2">الوصول إلى التحليلات</label>
                  </div>
                </>
              )}
              {selectedUser.role === "designer" && (
                <div className="flex items-center">
                  <Checkbox id="perm2" checked disabled />
                  <label htmlFor="perm2" className="mr-2">إدارة المحتوى</label>
                </div>
              )}
              {selectedUser.role === "user" && (
                <div className="flex items-center">
                  <Checkbox id="perm4" checked disabled />
                  <label htmlFor="perm4" className="mr-2">عرض المحتوى</label>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={onUpdateRole}>حفظ التغييرات</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageRoleDialog;
