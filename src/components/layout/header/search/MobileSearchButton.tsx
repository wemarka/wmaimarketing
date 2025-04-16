
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileSearchButton: React.FC = () => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="md:hidden rounded-full h-9 w-9 bg-white/15 hover:bg-white/25"
    >
      <Search className="h-4.5 w-4.5" />
    </Button>
  );
};

export default MobileSearchButton;
