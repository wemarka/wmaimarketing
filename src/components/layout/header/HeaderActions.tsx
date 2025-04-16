
import React from "react";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

interface HeaderActionsProps {
  isRTL: boolean;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ isRTL }) => {
  return (
    <div className="flex items-center gap-4">
      <SearchBar />
      <Button size="icon" variant="ghost" className="rounded-full h-9 w-9 bg-white/15 hover:bg-white/25">
        <Bell className="h-4.5 w-4.5" />
      </Button>
      <Button size="icon" variant="ghost" className="rounded-full h-9 w-9 bg-white/15 hover:bg-white/25">
        <Settings className="h-4.5 w-4.5" />
      </Button>
      <UserMenu />
    </div>
  );
};

export default HeaderActions;
