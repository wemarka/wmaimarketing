
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

  return (
    <Header className="p-4">
      <Link to="/" className="flex items-center gap-2 px-2 relative">
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
        
        {/* Animated welcome tooltip */}
        {showWelcome && profile && (
          <motion.div 
            className="absolute top-full left-0 mt-2 p-2 bg-card border border-border rounded-lg shadow-lg z-50 text-xs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-right">
              أهلاً بك{profile?.first_name && <span> {profile.first_name}</span>}!
            </p>
          </motion.div>
        )}
      </Link>
    </Header>
  );
};

export default SidebarHeader;
