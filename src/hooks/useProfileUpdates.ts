
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useActivityLog } from "@/hooks/useActivityLog"; 

export const useProfileUpdates = () => {
  const { user } = useAuth();
  const [updating, setUpdating] = useState(false);
  const { logActivity } = useActivityLog();

  const updateAvatarUrl = async (file: File) => {
    if (!user) return;

    try {
      setUpdating(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile_picture.${fileExt}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile_pictures')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: profileUpdateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (profileUpdateError) throw profileUpdateError;

      // Log activity
      await logActivity('profile_picture_update', 'تم تحديث الصورة الشخصية');

      toast({
        title: "نجاح",
        description: "تم تحديث الصورة الشخصية بنجاح"
      });

      return publicUrl;
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast({
        title: "خطأ",
        description: "فشل تحديث الصورة الشخصية",
        variant: "destructive"
      });
      return null;
    } finally {
      setUpdating(false);
    }
  };

  return { updateAvatarUrl, updating };
};
