
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
    hover: { scale: 1.03, transition: { duration: 0.2 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Footer className="p-4">
      <motion.div 
        className="flex flex-col gap-2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* User presence indicator */}
        {profile && (
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 mb-2 p-2 rounded-lg bg-muted/30 border border-border/50 shadow-sm"
          >
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-muted-foreground">متصل الآن</span>
          </motion.div>
        )}
      
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div variants={itemVariants}>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start bg-beauty-purple/5 border-beauty-purple/20 hover:bg-beauty-purple/10 transition-all duration-300"
              >
                <HelpCircle className="ml-2 h-4 w-4 text-beauty-purple" />
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
        
        <motion.div variants={itemVariants}>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start border-beauty-purple/20 hover:bg-beauty-purple/10 transition-all duration-300"
            onClick={handleSettings}
          >
            <Settings className="ml-2 h-4 w-4 text-beauty-purple" />
            <span>الإعدادات</span>
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSignOut}
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/50 transition-all duration-300"
          >
            <LogOut className="ml-2 h-4 w-4" />
            <span>تسجيل الخروج</span>
          </Button>
        </motion.div>
      </motion.div>
    </Footer>
  );
};

export default SidebarFooter;
