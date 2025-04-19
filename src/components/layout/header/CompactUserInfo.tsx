
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const CompactUserInfo = () => {
  const { profile } = useAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  const getUserInitials = () => {
    if (!profile?.first_name && !profile?.last_name) return 'U';
    
    const firstName = profile?.first_name || '';
    const lastName = profile?.last_name || '';
    
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="h-9 w-9 bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt={`${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'User'} />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-teal-400 to-teal-600 text-white">
                {getUserInitials()}
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={isRTL ? "start" : "end"} 
          className={cn(
            "w-56 border-white/10 bg-[#3a7a89]/95 text-white backdrop-blur-lg",
            isRTL && "text-right"
          )}
        >
          <DropdownMenuLabel>
            {`${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || t('sidebar.trialUser', 'Trial User')}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
            {t('profile.tabs.account', 'Profile')}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
            {t('sidebar.navigation.settings', 'Settings')}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem className="cursor-pointer text-red-300 hover:bg-red-500/20 hover:text-red-200">
            {t('sidebar.signOut', 'Sign Out')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};

export default CompactUserInfo;
