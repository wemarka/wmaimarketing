
import React from "react";
import { SidebarFooter as Footer } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut, HelpCircle, Settings, Info, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const SidebarFooter: React.FC = () => {
  const { signOut, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
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
  
  const handleSettings = () => {
    navigate('/profile');
  };

  // Animation variants
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <Footer className="p-4">
      <div className="flex flex-col gap-2">
        {/* User presence indicator */}
        {profile && (
          <div className="flex items-center gap-2 mb-2 p-2 rounded-md bg-muted/30">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-muted-foreground">متصل الآن</span>
          </div>
        )}
      
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover="hover" variants={buttonVariants}>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
              >
                <HelpCircle className="ml-2 h-4 w-4" />
                <span>المساعدة</span>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>خيارات المساعدة</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleHelp}>
              <Info className="ml-2 h-4 w-4" />
              <span>الوثائق</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open('https://beauty.ai/support', '_blank')}>
              <MessageSquare className="ml-2 h-4 w-4" />
              <span>الدعم الفني</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <motion.div whileHover="hover" variants={buttonVariants}>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={handleSettings}
          >
            <Settings className="ml-2 h-4 w-4" />
            <span>الإعدادات</span>
          </Button>
        </motion.div>
        
        <motion.div whileHover="hover" variants={buttonVariants}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSignOut}
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/50"
          >
            <LogOut className="ml-2 h-4 w-4" />
            <span>تسجيل الخروج</span>
          </Button>
        </motion.div>
      </div>
    </Footer>
  );
};

export default SidebarFooter;
