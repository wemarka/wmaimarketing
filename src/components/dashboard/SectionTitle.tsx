
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  animated?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  icon,
  action,
  className,
  animated = true
}) => {
  const content = (
    <div className={cn(
      "flex justify-between items-start mb-6",
      className
    )}>
      <div className="flex items-start gap-3">
        {icon && (
          <div className="p-2 bg-primary/10 rounded-md flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
  
  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.div>
    );
  }
  
  return content;
};

export default SectionTitle;
