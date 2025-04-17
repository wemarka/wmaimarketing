
import React, { useState } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserPreferencesDialog from "./notification/UserPreferencesDialog";
import { useToast } from "@/components/ui/use-toast";

const UserPreferencesButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleOpenClick = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleOpenClick}
        className="rounded-full h-9 w-9 relative"
        title="تخصيص الواجهة"
      >
        <Palette className="h-5 w-5" />
      </Button>
      
      <UserPreferencesDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </>
  );
};

export default UserPreferencesButton;
