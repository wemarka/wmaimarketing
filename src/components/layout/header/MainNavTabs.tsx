
import React from "react";
import { useLocation } from "react-router-dom";
import { Tabs } from "@/components/ui/tabs";
import NavTabItem from "./nav/NavTabItem";
import TabsContainer from "./nav/TabsContainer";

interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface MainNavTabsProps {
  navItems: NavItem[];
}

const MainNavTabs: React.FC<MainNavTabsProps> = ({
  navItems
}) => {
  const location = useLocation();

  // Determine active tab based on current route
  const activeTab = location.pathname.includes("/dashboard") 
    ? "dashboard" 
    : location.pathname.includes("/insights") 
      ? "insights" 
      : location.pathname.includes("/channels") 
        ? "channels" 
        : "dashboard";

  return (
    <Tabs value={activeTab} className="w-full max-w-md mx-auto md:mx-0" dir="rtl">
      <TabsContainer>
        {navItems.map((item) => (
          <NavTabItem
            key={item.id}
            id={item.id}
            title={item.title}
            path={item.path}
            icon={item.icon}
            isActive={activeTab === item.id}
          />
        ))}
      </TabsContainer>
    </Tabs>
  );
};

export default MainNavTabs;
