
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { ProfileData } from "@/types/profile";

interface UserProfileProps {
  expanded: boolean;
  profile?: ProfileData;
  userEmail?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ expanded, profile, userEmail }) => {
  return (
    <div className={cn(
      "flex items-center",
      expanded ? "justify-start space-x-3" : "justify-center"
    )}>
      <Avatar className="h-10 w-10 border-2 border-white">
        <img
          src={profile?.avatar_url || "https://github.com/shadcn.png"}
          alt="User Avatar"
          className="object-cover"
        />
      </Avatar>
      
      {expanded && (
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {profile ? `${profile.first_name} ${profile.last_name}` : "John Wilson"}
          </span>
          <span className="text-xs text-gray-500">
            {userEmail || "Wilson@gmail.com"}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
