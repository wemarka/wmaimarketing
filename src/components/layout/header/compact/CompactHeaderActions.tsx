import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Bell, Search, Calendar, Mail, Plus } from "lucide-react";
import NotificationsPopover from "../NotificationsPopover";
import MobileSearchButton from "../search/MobileSearchButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CompactHeaderActionsProps {
  notificationCount?: number;
  onNotificationClick?: () => void;
}

const CompactHeaderActions: React.FC<CompactHeaderActionsProps> = ({
  notificationCount = 0,
  onNotificationClick = () => {}
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  const isMobile = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Mock data for the unified dropdown
  const taskCount = 3;
  const messageCount = 2;
  const reminderCount = 1;
  
  // Total count for the badge
  const totalCount = notificationCount + taskCount + messageCount + reminderCount;

  return (
    <div className="flex items-center gap-3">
      {/* Collapsible Search Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-white/80 hover:text-white hover:bg-white/10"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        <Search className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      
      {/* Unified Dropdown for Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-white/80 hover:text-white hover:bg-white/10 relative"
          >
            <Bell className="h-[1.2rem] w-[1.2rem]" />
            {totalCount > 0 && (
              <Badge
                variant="destructive"
                className={cn(
                  "absolute -top-1 -right-1 h-4 min-w-4 text-[10px] p-0 flex items-center justify-center",
                  isRTL && "-left-1 -right-auto"
                )}
              >
                {totalCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          <DropdownMenuGroup>
            <DropdownMenuItem 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => navigate("/notifications")}
            >
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>الإشعارات</span>
              </div>
              {notificationCount > 0 && (
                <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">
                  {notificationCount}
                </Badge>
              )}
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => navigate("/tasks")}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>المهام</span>
              </div>
              {taskCount > 0 && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {taskCount}
                </Badge>
              )}
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => navigate("/messages")}
            >
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>الرسائل</span>
              </div>
              {messageCount > 0 && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                  {messageCount}
                </Badge>
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            className="flex justify-center items-center cursor-pointer text-primary"
            onClick={() => navigate("/notifications/settings")}
          >
            <div className="flex items-center gap-2">
              <Plus className="h-3.5 w-3.5" />
              <span>إضافة إشعار جديد</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Legacy NotificationsPopover - keeping for backward compatibility */}
      {isMobile && (
        <NotificationsPopover
          notificationCount={notificationCount}
          onNotificationClick={onNotificationClick}
        />
      )}
    </div>
  );
};

export default CompactHeaderActions;
