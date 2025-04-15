
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Permission } from "./types";

export const usePermissionsData = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);

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

  useEffect(() => {
    fetchPermissions();
  }, []);

  return { permissions };
};
