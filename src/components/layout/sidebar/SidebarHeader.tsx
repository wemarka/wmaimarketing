
import React, { useEffect, useState } from "react";
import { SidebarHeader as Header } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const SidebarHeader: React.FC = () => {
  const { profile } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  
  useEffect(() => {
    // Show welcome message briefly when component mounts
    setShowWelcome(true);
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  
  return <Header className="p-4">
      <Link to="/" className="flex items-center gap-2 px-2 relative">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <motion.div className="absolute inset-0 bg-gradient-to-tr from-beauty-pink to-beauty-purple rounded-lg shadow-md" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} />
          <motion.div initial={{
          rotate: 0
        }} animate={{
          rotate: 360
        }} transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity
        }}>
            <Sparkles className="h-5 w-5 text-white relative z-10" />
          </motion.div>
        </div>
        <div>
          <motion.h1 className="text-xl font-bold bg-gradient-to-r from-beauty-pink to-beauty-purple bg-clip-text text-transparent" whileHover={{
          scale: 1.03
        }}>
            بيوتي
          </motion.h1>
          <motion.p className="text-xs text-muted-foreground" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
            منصة التسويق الذكية
          </motion.p>
        </div>
        
        {/* Animated welcome tooltip */}
        {showWelcome && profile && (
          <motion.div 
            className="absolute top-full left-0 mt-2 px-3 py-2 bg-white dark:bg-slate-800 rounded-md shadow-lg text-sm"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            مرحباً {profile.first_name || "بك"}!
          </motion.div>
        )}
      </Link>
    </Header>;
};

export default SidebarHeader;
