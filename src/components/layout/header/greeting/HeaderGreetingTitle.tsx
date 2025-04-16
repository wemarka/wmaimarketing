
import React from "react";
import { motion } from "framer-motion";

interface HeaderGreetingTitleProps {
  greeting: string;
  userName: string;
}

const HeaderGreetingTitle: React.FC<HeaderGreetingTitleProps> = ({
  greeting,
  userName
}) => {
  return (
    <motion.h1 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-base font-semibold text-white/90 flex items-center gap-1.5"
    >
      <motion.span 
        className="text-lg"
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 1, delay: 1, repeat: 0 }}
      >
        👋
      </motion.span>
      {greeting}{userName && `, ${userName}`}
    </motion.h1>
  );
};

export default HeaderGreetingTitle;
