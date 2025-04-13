
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";

interface ProfilePictureProps {
  avatarUrl: string | null;
  userInitials: string;
  onAvatarChange: (url: string) => void;
}

const ProfilePicture = ({ avatarUrl, userInitials, onAvatarChange }: ProfilePictureProps) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "خطأ في الملف",
        description: "يرجى اختيار صورة صالحة",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "الملف كبير جدا",
        description: "يجب أن يكون حجم الصورة أقل من 2 ميجابايت",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Generate a unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from("profile_pictures")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Error uploading profile picture:", uploadError);
        throw uploadError;
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from("profile_pictures")
        .getPublicUrl(fileName);

      if (!publicUrlData.publicUrl) throw new Error("Failed to get public URL");

      // Call the parent component's handler to update the avatar URL
      onAvatarChange(publicUrlData.publicUrl);

      toast({
        title: "تم التحديث",
        description: "تم تحديث الصورة الشخصية بنجاح",
      });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الصورة الشخصية",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-32 w-32">
        <AvatarImage src={avatarUrl || ""} alt="Profile picture" className="object-cover" />
        <AvatarFallback className="text-3xl">{userInitials}</AvatarFallback>
      </Avatar>
      
      <div className="flex items-center">
        <Button variant="outline" className="relative overflow-hidden" disabled={isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري الرفع...
            </>
          ) : (
            <>
              <Upload className="ml-2 h-4 w-4" />
              تغيير الصورة
            </>
          )}
          <input
            type="file"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={handleFileChange}
            accept="image/*"
            disabled={isUploading}
          />
        </Button>
      </div>
    </div>
  );
};

export default ProfilePicture;
