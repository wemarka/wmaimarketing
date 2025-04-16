
import React from "react";
import { Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TeamMembers from "./TeamMembers";

interface TeamMember {
  name: string;
  avatar: string | null;
  initials: string;
}

interface HeaderActionsProps {
  teamMembers: TeamMember[];
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ teamMembers }) => {
  return (
    <motion.div 
      className="flex items-center space-x-4 space-x-reverse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      {/* Actions */}
      <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
        <Search className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
        <div className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px]">
            3
          </span>
        </div>
      </Button>
      
      {/* Team members */}
      <TeamMembers members={teamMembers} />
    </motion.div>
  );
};

export default HeaderActions;
