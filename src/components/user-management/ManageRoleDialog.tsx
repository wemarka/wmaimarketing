
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/hooks/user-management/types";
import { useRoleManagement } from "@/hooks/user-management/useRoleManagement";
import UserInfoSection from "./role-dialog/UserInfoSection";
import RoleTabContent from "./role-dialog/RoleTabContent";
import PermissionsTabContent from "./role-dialog/PermissionsTabContent";
import { AppRole } from "@/types/profile";

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
  const {
    activeTab,
    setActiveTab,
    saving,
    getUserInitials,
    handleSave
  } = useRoleManagement(selectedUser, setSelectedUser, onUpdateRole);

  if (!selectedUser) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>إدارة دور المستخدم</DialogTitle>
          <DialogDescription>
            تغيير دور المستخدم وصلاحياته في النظام.
          </DialogDescription>
        </DialogHeader>

        <UserInfoSection 
          selectedUser={selectedUser} 
          getUserInitials={getUserInitials} 
        />

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "role" | "permissions")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="role">الدور الوظيفي</TabsTrigger>
            <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
          </TabsList>

          <TabsContent value="role" className="py-4">
            <RoleTabContent 
              selectedUser={selectedUser} 
              setSelectedUser={setSelectedUser} 
            />
          </TabsContent>

          <TabsContent value="permissions" className="py-4">
            <PermissionsTabContent selectedUser={selectedUser} />
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
