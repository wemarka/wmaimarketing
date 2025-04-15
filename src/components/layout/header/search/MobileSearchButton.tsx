
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const MobileSearchButton: React.FC = () => {
  const { toast } = useToast();
  
  const handleMobileSearch = () => {
    toast({
      title: "بحث",
      description: "للبحث يرجى استخدام نسخة سطح المكتب",
    });
  };
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden rounded-full h-9 w-9"
      onClick={handleMobileSearch}
    >
      <Search className="h-5 w-5" />
    </Button>
  );
};

export default MobileSearchButton;
