
import { User, Bell, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils"; 
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const CompactUserInfo = () => {
  const { t, i18n } = useTranslation();
  const { profile } = useAuth();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  const userInitials = profile && profile.first_name 
    ? profile.first_name.charAt(0).toUpperCase() 
    : "U";

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className={cn(
      "flex items-center gap-2",
      isRTL && "flex-row-reverse"
    )}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <Languages className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isRTL ? "start" : "end"}>
          <DropdownMenuLabel>{t('common.language', 'اللغة')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={toggleLanguage}>
            {i18n.language === "ar" ? "English" : "العربية"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="icon" className="text-white">
        <div className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500">
            1
          </Badge>
        </div>
      </Button>
      
      <motion.div 
        className={cn(
          "flex items-center gap-2 py-1 px-2 hover:bg-white/10 rounded-full transition-colors",
          isRTL && "flex-row-reverse"
        )}
        whileHover={{ scale: 1.03 }}
      >
        <Avatar className="h-8 w-8 border-2 border-white/20">
          <AvatarFallback className="bg-primary/30 text-white">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-sm font-medium text-white">
          {profile ? (
            <>
              <div className="flex items-center gap-1">
                <span>
                  {t('common.temperature', '27°')}
                </span>
                <span className="opacity-50">|</span>
                <span>
                  {t('common.date', '18 أبريل')}
                </span>
              </div>
            </>
          ) : (
            t('common.user', 'المستخدم')
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CompactUserInfo;
