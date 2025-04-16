
import React from "react";
import { motion } from "framer-motion";

interface PageTitleDisplayProps {
  pageTitle: string;
  pathname: string;
}

const PageTitleDisplay: React.FC<PageTitleDisplayProps> = ({ pageTitle, pathname }) => {
  // Determine if it's a main dashboard view for styling purposes
  const isMainDashboard = pathname === "/dashboard";
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className={`text-lg font-semibold ${isMainDashboard ? "text-white" : "text-white/95"}`}>
        {pageTitle}
      </h1>
    </motion.div>
  );
};

export default PageTitleDisplay;
