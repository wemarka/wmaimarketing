
import React from "react";
import { SidebarFooter as Footer } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut, HelpCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const SidebarFooter: React.FC = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    signOut && signOut();
    toast({
      title: "تم تسجيل الخروج بنجاح",
      description: "نأمل أن نراك مرة أخرى قريباً",
    });
  };
  
  const handleHelp = () => {
    navigate('/documentation');
    toast({
      title: "مركز المساعدة",
      description: "تم توجيهك إلى صفحة الوثائق والمساعدة",
    });
  };

  return (
    <Footer className="p-4">
      <div className="flex flex-col gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start" 
          onClick={handleHelp}
        >
          <HelpCircle className="ml-2 h-4 w-4" />
          <span>المساعدة</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSignOut}
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/50"
        >
          <LogOut className="ml-2 h-4 w-4" />
          <span>تسجيل الخروج</span>
        </Button>
      </div>
    </Footer>
  );
};

export default SidebarFooter;
