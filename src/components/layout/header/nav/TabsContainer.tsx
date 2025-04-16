
import React from "react";
import { TabsList } from "@/components/ui/tabs";

interface TabsContainerProps {
  children: React.ReactNode;
}

const TabsContainer: React.FC<TabsContainerProps> = ({ children }) => {
  return (
    <TabsList className="bg-white/10 dark:bg-[#2c6c7a]/20 rounded-xl p-1 h-11 w-full justify-start border-none overflow-x-auto scrollbar-none">
      {children}
    </TabsList>
  );
};

export default TabsContainer;
