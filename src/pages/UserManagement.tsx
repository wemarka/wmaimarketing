
import React from "react";
import { UserPlus } from "lucide-react";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserManagement } from "@/hooks/useUserManagement";
import UserTable from "@/components/user-management/UserTable";
import SearchBar from "@/components/user-management/SearchBar";
import AddUserDialog from "@/components/user-management/AddUserDialog";
import ManageRoleDialog from "@/components/user-management/ManageRoleDialog";

const UserManagement = () => {
  const {
    users,
    loading,
    searchTerm,
    setSearchTerm,
    isAddUserOpen,
    setIsAddUserOpen,
    isManageRoleOpen,
    setIsManageRoleOpen,
    selectedUser,
    setSelectedUser,
    newUser,
    setNewUser,
    handleAddUser,
    handleUpdateRole,
  } = useUserManagement();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1>إدارة المستخدمين</h1>
            <p className="text-muted-foreground">
              إدارة حسابات الموظفين وصلاحياتهم
            </p>
          </div>
          <Button onClick={() => setIsAddUserOpen(true)}>
            <UserPlus className="h-4 w-4 ml-2" />
            إضافة مستخدم
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>المستخدمون</CardTitle>
            <CardDescription>
              قائمة جميع المستخدمين في النظام. يمكنك إدارة أدوارهم وصلاحياتهم.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <UserTable
              users={users}
              loading={loading}
              searchTerm={searchTerm}
              onManageRole={(user) => {
                setSelectedUser(user);
                setIsManageRoleOpen(true);
              }}
            />
          </CardContent>
        </Card>

        {/* Add User Dialog */}
        <AddUserDialog
          open={isAddUserOpen}
          onOpenChange={setIsAddUserOpen}
          newUser={newUser}
          setNewUser={setNewUser}
          onAddUser={handleAddUser}
        />

        {/* Manage Role Dialog */}
        <ManageRoleDialog
          open={isManageRoleOpen}
          onOpenChange={setIsManageRoleOpen}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          onUpdateRole={handleUpdateRole}
        />
      </div>
    </Layout>
  );
};

export default UserManagement;
