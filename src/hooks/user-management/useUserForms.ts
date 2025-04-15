
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { User, NewUser } from "./types";
import type { AppRole } from "@/types/profile";

export const useUserForms = (fetchUsers: () => Promise<void>) => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isManageRoleOpen, setIsManageRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<NewUser>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "user",
  });

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
