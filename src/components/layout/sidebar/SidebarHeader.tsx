
import React from "react";
import { SidebarHeader as Header } from "@/components/ui/sidebar";
import { Crown } from "lucide-react";

const SidebarHeader: React.FC = () => {
  return (
    <Header className="flex h-14 items-center px-4">
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-beauty-pink to-beauty-lightpurple flex items-center justify-center">
          <Crown className="h-4 w-4 text-white" />
        </div>
        <span className="mr-2 text-xl font-semibold">Beauty AI</span>
      </div>
    </Header>
  );
};

export default SidebarHeader;
