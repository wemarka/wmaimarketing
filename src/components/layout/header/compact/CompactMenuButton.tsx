
import React from "react";
import { useSidebarNavigation } from "@/components/layout/sidebar/useSidebarNavigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CompactMenuButtonProps {
  show?: boolean;
}

const CompactMenuButton: React.FC<CompactMenuButtonProps> = ({ show = true }) => {
  const { toggleExpanded, expanded } = useSidebarNavigation();
  
  if (!show) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleExpanded}
      className={cn(
        "p-1.5 h-9 w-9 rounded-md text-white/80 hover:text-white hover:bg-white/10",
        expanded ? "bg-white/10" : ""
      )}
      aria-label={expanded ? "إغلاق القائمة" : "فتح القائمة"}
    >
      <motion.span
        animate={{ rotate: expanded ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Menu className="h-5 w-5" />
      </motion.span>
    </Button>
  );
};

export default CompactMenuButton;
