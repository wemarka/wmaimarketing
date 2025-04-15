
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface CompactMenuButtonProps {
  show: boolean;
}

const CompactMenuButton: React.FC<CompactMenuButtonProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <SidebarTrigger>
      <Button variant="ghost" size="icon" className="md:hidden hover:bg-beauty-purple/10">
        <Menu className="h-5 w-5" />
      </Button>
    </SidebarTrigger>
  );
};

export default CompactMenuButton;
