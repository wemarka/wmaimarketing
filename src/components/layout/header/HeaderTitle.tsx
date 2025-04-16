
import React from "react";
import { motion } from "framer-motion";

interface HeaderTitleProps {
  getPageTitle: () => string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ getPageTitle }) => {
  return (
    <div className="flex items-center">
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-xl font-medium"
      >
        {getPageTitle()}
      </motion.h2>
    </div>
  );
};

export default HeaderTitle;
