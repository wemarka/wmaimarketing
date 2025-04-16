
import React from "react";
import { cn } from "@/lib/utils";
import { motion, MotionProps, HTMLMotionProps } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

// Types for the component, fixing the type conflict issue
interface AnimatedCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "gradient" | "outline";
  size?: "sm" | "md" | "lg";
  hoverable?: boolean;
  initialAnimation?: boolean;
  motionProps?: MotionProps;
  noFade?: boolean;
  children: React.ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  className?: string;
}

const AnimatedCard = ({
  title,
  description,
  icon,
  footer,
  variant = "default",
  size = "md",
  hoverable = true,
  initialAnimation = true,
  motionProps,
  noFade = false,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  children,
  ...props
}: AnimatedCardProps) => {
  // Card variants for different styling options
  const variantClasses = {
    default: "border-slate-200 dark:border-slate-700 bg-card",
    primary: "border-primary/30 dark:border-primary/20 bg-primary/5 dark:bg-primary/10",
    secondary: "border-secondary/30 dark:border-secondary/20 bg-secondary/5 dark:bg-secondary/10",
    gradient: "border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800",
    outline: "border-2 border-primary/30 dark:border-primary/20 bg-transparent",
  };

  // Size variants for padding and spacing
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  // Animation variants
  const cardVariants = {
    hidden: initialAnimation ? { opacity: 0, y: 20 } : {},
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        duration: 0.5
      } 
    },
    hover: hoverable ? { 
      y: -5, 
      boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)",
      borderColor: "rgba(var(--primary), 0.5)",
      transition: { duration: 0.3 }
    } : {}
  };

  // Icon animation variants
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 20,
        delay: 0.2
      } 
    },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: { duration: 0.2 } 
    }
  };

  // Use proper typing for motion.div
  return (
    <motion.div
      variants={cardVariants}
      initial={initialAnimation ? "hidden" : "visible"}
      animate="visible"
      whileHover={hoverable ? "hover" : undefined}
      viewport={{ once: true }}
      {...motionProps}
      className={cn("overflow-hidden rounded-xl", className)}
    >
      <Card
        className={cn("border h-full transition-colors", 
          variantClasses[variant],
          hoverable && "transition-all duration-300"
        )}
      >
        {(title || description || icon) && (
          <CardHeader className={cn("flex items-start gap-4", headerClassName)}>
            <div className="flex-1">
              {title && (typeof title === 'string' ? 
                <CardTitle>{title}</CardTitle> : title
              )}
              {description && (typeof description === 'string' ? 
                <CardDescription>{description}</CardDescription> : description
              )}
            </div>
            {icon && (
              <motion.div 
                variants={iconVariants}
                className="bg-primary/10 text-primary p-2 rounded-lg"
                whileHover="hover"
              >
                {icon}
              </motion.div>
            )}
          </CardHeader>
        )}
        
        <CardContent className={cn(sizeClasses[size], contentClassName)}>
          {!noFade ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {children}
            </motion.div>
          ) : children}
        </CardContent>
        
        {footer && (
          <CardFooter className={cn("border-t border-border/40 bg-muted/20", footerClassName)}>
            {footer}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export { AnimatedCard };
