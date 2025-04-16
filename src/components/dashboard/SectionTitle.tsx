
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
  variant?: "default" | "primary" | "secondary" | "muted";
  size?: "sm" | "md" | "lg";
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  icon,
  action,
  className,
  animated = true,
  variant = "default",
  size = "md"
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  // تأثيرات الحركة
  const containerAnimation = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0 }
  };
  
  // تحديد أحجام العناوين
  const titleSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl"
  };
  
  // تحديد أنماط العناوين
  const titleVariants = {
    default: "font-bold",
    primary: "font-bold text-primary bg-clip-text",
    secondary: "font-bold text-secondary",
    muted: "font-medium text-muted-foreground"
  };
  
  const content = (
    <div dir={isRTL ? "rtl" : "ltr"} className={cn(
      "flex justify-between items-start mb-6",
      className
    )}>
      <div className="flex items-start gap-3">
        {icon && (
          <div className={cn(
            "p-2 rounded-md flex items-center justify-center",
            variant === "primary" ? "bg-primary/10 text-primary" : 
            variant === "secondary" ? "bg-secondary/10 text-secondary" : 
            "bg-muted/30 text-muted-foreground"
          )}>
            {icon}
          </div>
        )}
        <div>
          <h2 className={cn(
            titleSizes[size],
            titleVariants[variant]
          )}>{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>
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
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    );
  }
  
  return content;
};

export default SectionTitle;
