
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MainNavTabs from "./MainNavTabs";

interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface DynamicNavigationMenuProps {
  mainNavItems: NavItem[];
  currentSubTabs: TabItem[];
  activeTab: string;
  activeSubTab: string;
  onTabChange: (tabId: string) => void;
  onSubTabChange: (tabId: string) => void;
  isRTL: boolean;
}

const DynamicNavigationMenu: React.FC<DynamicNavigationMenuProps> = ({
  mainNavItems,
  currentSubTabs,
  activeTab,
  activeSubTab,
  onTabChange,
  onSubTabChange,
  isRTL,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMainNavClick = (item: NavItem) => {
    navigate(item.path);
    onTabChange(item.id);
  };

  const handleSubTabClick = (tabId: string) => {
    onSubTabChange(tabId);
  };

  // Animation variants
  const tabIndicatorVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.2, type: "spring" }
  };

  return (
    <div className="w-full">
      {isMobile ? (
        // Mobile Menu with Sheet component
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden bg-white/15 hover:bg-white/25 rounded-full h-10 w-10">
              <Menu className="h-5 w-5 text-white" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={isRTL ? "right" : "left"} className="bg-[#3a7a89] text-white p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-white/10">
                <h2 className="text-xl font-bold">القائمة</h2>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white/70">التنقل الرئيسي</h3>
                    <div className="space-y-1">
                      {mainNavItems.map((item) => (
                        <Button
                          key={item.id}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-2 hover:bg-white/10",
                            activeTab === item.id && "bg-white/20"
                          )}
                          onClick={() => handleMainNavClick(item)}
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {currentSubTabs.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-white/70">القسم الحالي</h3>
                      <div className="space-y-1">
                        {currentSubTabs.map((tab) => (
                          <Button
                            key={tab.id}
                            variant="ghost"
                            className={cn(
                              "w-full justify-start gap-2 hover:bg-white/10",
                              activeSubTab === tab.id && "bg-white/20"
                            )}
                            onClick={() => handleSubTabClick(tab.id)}
                          >
                            {tab.icon}
                            <span>{tab.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        // Desktop Menu
        <div className="flex flex-col w-full space-y-4">
          <MainNavTabs navItems={mainNavItems} />
          
          {currentSubTabs.length > 0 && (
            <div className="flex overflow-x-auto scrollbar-none pt-1">
              <nav className="flex gap-1 px-1 py-1 bg-white/10 dark:bg-slate-800/20 rounded-lg mx-auto md:mx-0">
                {currentSubTabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "relative px-4 py-1.5 flex items-center gap-2 text-sm text-white/90 rounded-md transition-all",
                      "hover:text-white",
                      activeSubTab === tab.id ? "text-white font-medium" : "font-normal"
                    )}
                    onClick={() => handleSubTabClick(tab.id)}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    {activeSubTab === tab.id && (
                      <motion.div
                        layoutId="subTabIndicator"
                        className="absolute inset-0 bg-white/15 rounded-md -z-10"
                        initial="initial"
                        animate="animate"
                        variants={tabIndicatorVariants}
                      />
                    )}
                  </Button>
                ))}
              </nav>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DynamicNavigationMenu;
