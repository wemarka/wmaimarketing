
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreVertical, UserPlus, Shield, UserX, PenLine, Eye } from "lucide-react";

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isManageRoleOpen, setIsManageRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "user",
  });

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Get users with their profiles
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select(`
          id,
          first_name,
          last_name,
          avatar_url,
          role,
          created_at
        `);

      if (error) throw error;

      // We need to get emails from auth.users, but we can't directly join them through the client
      // So for now we'll just display profiles data
      // In a real app, you'd either use a Supabase function to combine this data
      // or handle this server-side
      
      const usersWithProfiles = profiles.map((profile) => ({
        id: profile.id,
        email: `user-${profile.id.substring(0, 6)}@example.com`, // Placeholder
        first_name: profile.first_name,
        last_name: profile.last_name,
        avatar_url: profile.avatar_url,
        role: profile.role || "user",
        created_at: profile.created_at,
      }));
      
      setUsers(usersWithProfiles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء جلب بيانات المستخدمين",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      // Register the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // Update the user's profile
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            role: newUser.role,
          })
          .eq("id", data.user.id);

        if (profileError) throw profileError;

        toast({
          title: "تم إضافة المستخدم",
          description: "تمت إضافة المستخدم بنجاح",
        });

        setIsAddUserOpen(false);
        setNewUser({
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          role: "user",
        });
        
        fetchUsers();
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة المستخدم",
        variant: "destructive",
      });
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          role: selectedUser.role,
        })
        .eq("id", selectedUser.id);

      if (error) throw error;

      toast({
        title: "تم تحديث الدور",
        description: "تم تحديث دور المستخدم بنجاح",
      });

      setIsManageRoleOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث دور المستخدم",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.first_name && user.first_name.toLowerCase().includes(searchLower)) ||
      (user.last_name && user.last_name.toLowerCase().includes(searchLower)) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  const getUserInitials = (user: User) => {
    if (!user.first_name && !user.last_name) {
      return user.email.substring(0, 2).toUpperCase();
    }
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">مدير</Badge>;
      case "marketing":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">تسويق</Badge>;
      case "designer":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">مصمم</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">مستخدم</Badge>;
    }
  };

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
            <div className="mb-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث عن مستخدم..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="كل الأدوار" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الأدوار</SelectItem>
                  <SelectItem value="admin">مدير</SelectItem>
                  <SelectItem value="marketing">تسويق</SelectItem>
                  <SelectItem value="designer">مصمم</SelectItem>
                  <SelectItem value="user">مستخدم</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <p>جاري تحميل البيانات...</p>
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المستخدم</TableHead>
                      <TableHead>الدور</TableHead>
                      <TableHead>تاريخ الإنشاء</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead className="w-[100px]">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          لا توجد نتائج مطابقة
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={user.avatar_url || ""} alt={`${user.first_name || 'User'}`} />
                                <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {user.first_name} {user.last_name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>
                            {new Date(user.created_at).toLocaleDateString("ar-SA")}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              نشط
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="ml-2 h-4 w-4" />
                                  عرض الملف الشخصي
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <PenLine className="ml-2 h-4 w-4" />
                                  تعديل
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setIsManageRoleOpen(true);
                                  }}
                                >
                                  <Shield className="ml-2 h-4 w-4" />
                                  إدارة الدور
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <UserX className="ml-2 h-4 w-4" />
                                  تعطيل الحساب
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add User Dialog */}
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة مستخدم جديد</DialogTitle>
              <DialogDescription>
                أضف مستخدم جديد للنظام وحدد دوره وصلاحياته.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium mb-1">
                    الاسم الأول
                  </label>
                  <Input
                    id="first_name"
                    value={newUser.first_name}
                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium mb-1">
                    الاسم الأخير
                  </label>
                  <Input
                    id="last_name"
                    value={newUser.last_name}
                    onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  البريد الإلكتروني
                </label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  كلمة المرور
                </label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-1">
                  الدور
                </label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value })}
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
              <div className="flex items-center space-x-2">
                <Checkbox id="send_email" />
                <label
                  htmlFor="send_email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
                >
                  إرسال دعوة بالبريد الإلكتروني
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddUser}>إضافة مستخدم</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Manage Role Dialog */}
        <Dialog open={isManageRoleOpen} onOpenChange={setIsManageRoleOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إدارة دور المستخدم</DialogTitle>
              <DialogDescription>
                تغيير دور المستخدم وصلاحياته في النظام.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
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
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsManageRoleOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleUpdateRole}>حفظ التغييرات</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default UserManagement;
