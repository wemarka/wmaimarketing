
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
  mode?: "wait" | "sync" | "popLayout";
  initial?: boolean;
  type?: "fade" | "slide" | "scale" | "none";
  duration?: number;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  mode = "wait",
  initial = true,
  type = "fade",
  duration = 0.3,
  className = "",
}) => {
  const location = useLocation();
  
  // Different animation variants
  const variants = {
    fade: {
      initial: initial ? { opacity: 0 } : { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    scale: {
      initial: initial ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 }
    },
    slide: {
      initial: initial ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    },
    none: {
      initial: {},
      animate: {},
      exit: {}
    }
  };
  
  // Apply transitions
  const transitions = {
    fade: { duration },
    scale: { type: "spring", stiffness: 400, damping: 30 },
    slide: { type: "spring", stiffness: 300, damping: 30 },
    none: { duration: 0 }
  };

  return (
    <AnimatePresence mode={mode} initial={initial}>
      <motion.div
        key={location.pathname}
        initial={variants[type].initial}
        animate={variants[type].animate}
        exit={variants[type].exit}
        transition={transitions[type]}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
