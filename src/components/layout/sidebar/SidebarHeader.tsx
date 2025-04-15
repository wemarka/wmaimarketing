
import React from "react";
import { SidebarHeader as Header } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarHeader: React.FC = () => {
  return (
    <Header className="p-4">
      <Link to="/" className="flex items-center gap-2 px-2 relative">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-beauty-pink to-beauty-purple rounded-lg shadow-md" 
            whileHover={{
              scale: 1.05
            }} 
            whileTap={{
              scale: 0.95
            }} 
          />
          <motion.div 
            initial={{
              rotate: 0
            }} 
            animate={{
              rotate: 360
            }} 
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity
            }}
          >
            <Sparkles className="h-5 w-5 text-white relative z-10" />
          </motion.div>
        </div>
        <div>
          <motion.h1 
            className="text-xl font-bold bg-gradient-to-r from-beauty-pink to-beauty-purple bg-clip-text text-transparent" 
            whileHover={{
              scale: 1.03
            }}
          >
            بيوتي
          </motion.h1>
          <motion.p 
            className="text-xs text-muted-foreground" 
            initial={{
              opacity: 0
            }} 
            animate={{
              opacity: 1
            }} 
            transition={{
              delay: 0.3
            }}
          >
            منصة التسويق الذكية
          </motion.p>
        </div>
      </Link>
    </Header>
  );
};

export default SidebarHeader;
