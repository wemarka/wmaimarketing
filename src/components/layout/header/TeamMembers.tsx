
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  name: string;
  avatar: string | null;
  initials: string;
}

interface TeamMembersProps {
  members: TeamMember[];
}

const TeamMembers: React.FC<TeamMembersProps> = ({ 
  members = [
    { name: "أحمد محمد", avatar: null, initials: "أم" },
    { name: "سارة علي", avatar: null, initials: "سع" },
    { name: "محمد خالد", avatar: null, initials: "مخ" }
  ] 
}) => {
  return (
    <div className="flex items-center -space-x-2 space-x-reverse mr-4">
      {members.map((member, idx) => (
        <Avatar 
          key={idx}
          className="border-2 border-[#3a7a89] w-8 h-8 hover:transform hover:scale-110 transition-transform cursor-pointer"
        >
          <AvatarImage src={member.avatar || undefined} />
          <AvatarFallback className="bg-white/20 text-white text-xs">
            {member.initials}
          </AvatarFallback>
        </Avatar>
      ))}
      <span className="mr-4 text-xs font-medium">{members.length} عضو</span>
    </div>
  );
};

export default TeamMembers;
