
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: "default" | "gradient" | "subtle" | "minimal";
}

const PageHeader = ({
  title,
  description,
  className,
  icon,
  actions,
  variant = "default"
}: PageHeaderProps) => {
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Define styles based on variant
  const variantStyles = {
    default: "bg-card border rounded-lg p-6 mb-6",
    gradient: "bg-gradient-to-r from-slate-50/80 to-slate-100/30 dark:from-slate-900/80 dark:to-slate-800/30 border rounded-lg p-6 mb-6",
    subtle: "border-b pb-6 mb-6",
    minimal: "mb-6"
  };

  return (
    <motion.div
      className={cn(variantStyles[variant], className)}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </div>
        
        {actions && (
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {actions}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PageHeader;
