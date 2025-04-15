
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { User } from "./types";

export const useUserData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
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
  
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    fetchUsers
  };
};
