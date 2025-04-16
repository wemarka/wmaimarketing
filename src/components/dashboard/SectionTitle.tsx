
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  animated?: boolean;
  variant?: "default" | "primary" | "secondary" | "muted" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  alignment?: "between" | "start" | "center";
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  icon,
  action,
  className,
  animated = true,
  variant = "default",
  size = "md",
  alignment = "between"
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  // Motion animation effects
  const containerAnimation = {
    hidden: { opacity: 0, y: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };
  
  const childAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };
  
  const iconAnimation = {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: { 
      opacity: 1, 
      rotate: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 25 }
    },
    hover: { 
      rotate: 15, 
      scale: 1.1,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };
  
  // Title sizes
  const titleSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl"
  };
  
  // Title variants
  const titleVariants = {
    default: "font-bold",
    primary: "font-bold text-primary",
    secondary: "font-bold text-secondary",
    muted: "font-medium text-muted-foreground",
    gradient: "font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
  };
  
  // Alignment classes
  const alignmentClasses = {
    between: "justify-between",
    start: "justify-start gap-4",
    center: "justify-center text-center"
  };
  
  // RTL-aware icon container
  const IconContainer = () => (
    icon && (
      <motion.div 
        variants={iconAnimation}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className={cn(
          "p-2 rounded-md flex items-center justify-center",
          variant === "primary" ? "bg-primary/10 text-primary" : 
          variant === "secondary" ? "bg-secondary/10 text-secondary" : 
          variant === "gradient" ? "bg-gradient-to-r from-primary/20 to-blue-500/20 text-primary" :
          "bg-muted/30 text-muted-foreground"
        )}
      >
        {icon}
      </motion.div>
    )
  );
  
  const content = (
    <div dir={isRTL ? "rtl" : "ltr"} className={cn(
      "flex items-start mb-6",
      alignmentClasses[alignment],
      className
    )}>
      <div className={cn(
        "flex items-start gap-3",
        alignment === "center" && "flex-col items-center"
      )}>
        <IconContainer />
        <div className={cn(alignment === "center" && "text-center")}>
          <motion.h2 
            className={cn(
              titleSizes[size],
              titleVariants[variant]
            )}
            variants={animated ? childAnimation : undefined}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p 
              className="text-muted-foreground mt-1 text-sm" 
              variants={animated ? childAnimation : undefined}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
      
      {action && alignment !== "center" && (
        <motion.div variants={animated ? childAnimation : undefined}>
          {action}
        </motion.div>
      )}
      
      {action && alignment === "center" && (
        <motion.div 
          className="mt-3" 
          variants={animated ? childAnimation : undefined}
        >
          {action}
        </motion.div>
      )}
    </div>
  );
  
  if (animated) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
      >
        {content}
      </motion.div>
    );
  }
  
  return content;
};

export default SectionTitle;
