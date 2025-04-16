
import React, { useEffect, useState } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "framer-motion";

interface AnimateInViewProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  animation?: "fade" | "slide-up" | "slide-right" | "scale" | "none";
}

export const AnimateInView: React.FC<AnimateInViewProps> = ({
  children,
  variants,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  animation = "fade"
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    threshold,
    triggerOnce: once 
  });

  // Animation variants
  const defaultVariants: Record<string, Variants> = {
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration,
          delay
        }
      }
    },
    "slide-up": {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration,
          delay,
          type: "spring",
          stiffness: 300,
          damping: 30
        }
      }
    },
    "slide-right": {
      hidden: { opacity: 0, x: -20 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration,
          delay,
          type: "spring",
          stiffness: 300,
          damping: 30
        }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration,
          delay,
          type: "spring",
          stiffness: 300,
          damping: 30
        }
      }
    },
    none: {
      hidden: {},
      visible: {}
    }
  };

  const selectedVariants = variants || defaultVariants[animation];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={selectedVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateInView;
