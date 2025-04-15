
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, Camera } from "lucide-react";
import { motion } from "framer-motion";

interface ProfilePictureProps {
  avatarUrl: string | null;
  userInitials: string;
  onAvatarChange: (file: File) => void;
}

const ProfilePicture = ({ avatarUrl, userInitials, onAvatarChange }: ProfilePictureProps) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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
      
      // Call the parent component's handler to update the avatar URL
      onAvatarChange(file);
    } catch (error) {
      console.error("Error handling file change:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء معالجة الملف",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div 
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-lg">
          <AvatarImage 
            src={avatarUrl || ""} 
            alt="Profile picture" 
            className="object-cover transition-all duration-300" 
          />
          <AvatarFallback className="text-3xl bg-gradient-to-br from-primary/90 to-primary/40 text-primary-foreground">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          animate={{ opacity: isHovering ? 0.7 : 0 }}
        >
          <label className="cursor-pointer w-full h-full flex items-center justify-center">
            <Camera className="h-8 w-8 text-white" />
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
              disabled={isUploading}
            />
          </label>
        </motion.div>
        
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
            <Loader2 className="h-10 w-10 text-white animate-spin" />
          </div>
        )}
      </motion.div>
      
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="sm"
          className="relative overflow-hidden border-primary/20 hover:bg-primary/5 text-sm" 
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              <span>جاري الرفع...</span>
            </>
          ) : (
            <>
              <Upload className="ml-2 h-4 w-4" />
              <span>تغيير الصورة</span>
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
