
import React from "react";
import { SidebarHeader as Header } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarHeader: React.FC = () => {
  return (
    <Header className="p-4">
      <Link to="/" className="flex items-center gap-2 px-2">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-beauty-pink/80 to-beauty-purple/80 rounded-lg shadow-md"></div>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 20, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            <Sparkles className="h-4 w-4 text-white relative z-10" />
          </motion.div>
        </div>
        <div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-beauty-pink to-beauty-purple bg-clip-text text-transparent">
            بيوتي
          </h1>
          <p className="text-xs text-muted-foreground">منصة التسويق الذكية</p>
        </div>
      </Link>
    </Header>
  );
};

export default SidebarHeader;
