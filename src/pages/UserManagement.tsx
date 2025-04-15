
import React, { useState, useEffect } from "react";
import { UserPlus, Shield, UserCheck } from "lucide-react";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserManagement } from "@/hooks/useUserManagement";
import UserTable from "@/components/user-management/UserTable";
import SearchBar from "@/components/user-management/SearchBar";
import AddUserDialog from "@/components/user-management/AddUserDialog";
import ManageRoleDialog from "@/components/user-management/ManageRoleDialog";
import RolePermissionsTable from "@/components/user-management/RolePermissionsTable";
import { useToast } from "@/hooks/use-toast";

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
    activateUserByEmail,
    activateSpecificUser
  } = useUserManagement();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");

  // Effect to activate abdalrhmanalhosary@gmail.com as admin when the component loads
  useEffect(() => {
    const activateAdmin = async () => {
      // Check if abdalrhmanalhosary@gmail.com exists in the users list
      const adminEmail = "abdalrhmanalhosary@gmail.com";
      const adminUser = users.find(u => u.email === adminEmail);
      
      // If user exists, check if they're already an admin
      if (adminUser && adminUser.role !== "admin") {
        await activateSpecificUser();
        toast({
          title: "تم تفعيل المدير",
          description: `تم تفعيل ${adminEmail} كمدير بنجاح`,
        });
      }
    };
    
    if (users.length > 0 && !loading) {
      activateAdmin();
    }
  }, [users, loading]);

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
          <div className="flex space-x-2 space-x-reverse">
            <Button 
              onClick={activateSpecificUser}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <UserCheck className="h-4 w-4" />
              تفعيل المدير
            </Button>
            <Button onClick={() => setIsAddUserOpen(true)}>
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة مستخدم
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>إدارة المستخدمين والصلاحيات</CardTitle>
            <CardDescription>
              إدارة المستخدمين في النظام وتحديد الأدوار والصلاحيات.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "users" | "roles")}>
              <TabsList className="mb-6">
                <TabsTrigger value="users">المستخدمون</TabsTrigger>
                <TabsTrigger value="roles">الأدوار والصلاحيات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="space-y-4">
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
                  onActivateUser={activateUserByEmail}
                />
              </TabsContent>

              <TabsContent value="roles">
                <div className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 ml-2" />
                      <h3 className="text-lg font-medium">نظام الأدوار والصلاحيات</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      يوفر النظام أربعة أدوار أساسية بصلاحيات مختلفة:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mr-4">
                      <li><strong>مدير</strong> - وصول كامل لجميع ميزات النظام وإدارة المستخدمين</li>
                      <li><strong>تسويق</strong> - إدارة المحتوى والحملات التسويقية والتحليلات</li>
                      <li><strong>مصمم</strong> - إنشاء وتحرير المحتوى البصري والإعلانات</li>
                      <li><strong>مستخدم</strong> - وصول محدود لعرض المحتوى</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">جدول الأدوار والصلاحيات</h3>
                    <RolePermissionsTable />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
