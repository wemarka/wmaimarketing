
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/hooks/user-management/types";
import { roleInfo } from "@/hooks/user-management/useRoleManagement";

interface UserInfoSectionProps {
  selectedUser: User;
  getUserInitials: (user: User) => string;
}

const UserInfoSection = ({ selectedUser, getUserInitials }: UserInfoSectionProps) => {
  // Get current role information
  const currentRoleInfo = roleInfo[selectedUser.role as keyof typeof roleInfo];

  return (
    <div className="flex items-center gap-3 mb-4 p-4 bg-muted/30 rounded-lg">
      <Avatar className="h-14 w-14">
        <AvatarImage src={selectedUser.avatar_url || ""} alt={`${selectedUser.first_name || 'مستخدم'}`} />
        <AvatarFallback>{getUserInitials(selectedUser)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="font-medium text-lg">
          {selectedUser.first_name || ''} {selectedUser.last_name || ''}
        </div>
        <div className="text-sm text-muted-foreground">
          {selectedUser.email}
        </div>
        <div className="mt-1">
          <Badge className={`bg-${currentRoleInfo.color}-100 text-${currentRoleInfo.color}-800 hover:bg-${currentRoleInfo.color}-100`}>
            {currentRoleInfo.title}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSection;
