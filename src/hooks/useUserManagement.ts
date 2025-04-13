
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
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
    fetchPermissions();
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

      if (profiles) {
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
      }
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

  const fetchPermissions = async () => {
    try {
      const { data, error } = await supabase
        .from("permissions")
        .select("id, name, description");

      if (error) throw error;

      if (data) {
        setPermissions(data);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
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

        // Log this activity
        await supabase.from("user_activity_log").insert({
          user_id: data.user.id,
          activity_type: "account_creation",
          description: `تم إنشاء حساب جديد بدور ${newUser.role}`
        });

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
    } catch (error: any) {
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
      // Get the old role before updating
      const { data: oldRoleData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", selectedUser.id)
        .single();
      
      const oldRole = oldRoleData?.role || "user";

      // Update the role
      const { error } = await supabase
        .from("profiles")
        .update({
          role: selectedUser.role,
        })
        .eq("id", selectedUser.id);

      if (error) throw error;

      // Log this activity
      await supabase.from("user_activity_log").insert({
        user_id: selectedUser.id,
        activity_type: "role_update",
        description: `تم تغيير الدور من ${oldRole} إلى ${selectedUser.role}`
      });

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

  return {
    users,
    permissions,
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
  };
};
