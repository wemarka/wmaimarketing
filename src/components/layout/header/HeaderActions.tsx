
import React from "react";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import SearchBar from "./SearchBar";

interface HeaderActionsProps {
  isRTL: boolean;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ isRTL }) => {
  const { profile } = useAuth();
  
  // Get user initials for avatar fallback
  const userInitials = profile?.first_name && profile?.last_name ? 
    `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}` : "??";

  return (
    <div className="flex items-center gap-4">
      <SearchBar />
      <Button size="icon" variant="ghost" className="rounded-full h-9 w-9 bg-white/15 hover:bg-white/25">
        <Bell className="h-4.5 w-4.5" />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-full h-9 w-9 bg-white/15 hover:bg-white/25">
        <Settings className="h-4.5 w-4.5" />
      </Button>
      <Avatar className="h-9 w-9 border-2 border-white/20">
        {profile?.avatar_url ? 
          <AvatarImage src={profile.avatar_url} alt="صورة المستخدم" /> 
          : 
          <AvatarFallback className="bg-[#4a8a99] text-white">
            {userInitials}
          </AvatarFallback>
        }
      </Avatar>
    </div>
  );
};

export default HeaderActions;
