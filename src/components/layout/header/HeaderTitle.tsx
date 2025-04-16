
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface HeaderTitleProps {
  getPageTitle: () => string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ getPageTitle }) => {
  return (
    <div className="flex items-center space-x-4 space-x-reverse">
      <Link to="#" className="flex items-center hover:bg-white/10 p-2 rounded-full transition-colors">
        <ArrowLeft className="h-5 w-5 ml-2" />
        <span className="text-sm">رجوع</span>
      </Link>
      
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-xl font-medium mr-4"
      >
        {getPageTitle()}
      </motion.h2>
    </div>
  );
};

export default HeaderTitle;
