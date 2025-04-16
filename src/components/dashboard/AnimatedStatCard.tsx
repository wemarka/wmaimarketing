
import React from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";

interface AnimatedStatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  variant = "default",
  className,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // CSS classes for different variants
  const variantClasses = {
    default: "bg-card border-slate-200 dark:border-slate-700",
    primary: "bg-primary/10 border-primary/30 dark:border-primary/20",
    secondary: "bg-secondary/10 border-secondary/30 dark:border-secondary/20",
    success: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-900/30",
    warning: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/30",
    danger: "bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-900/30",
    info: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/30"
  };

  // CSS classes for icon backgrounds
  const iconClasses = {
    default: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
    primary: "bg-primary/20 text-primary dark:bg-primary/30",
    secondary: "bg-secondary/20 text-secondary dark:bg-secondary/30",
    success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
    danger: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
    info: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
  };

  // CSS classes for trend indicators
  const trendClasses = {
    up: "text-emerald-600 dark:text-emerald-400",
    down: "text-rose-600 dark:text-rose-400",
    neutral: "text-gray-500 dark:text-gray-400"
  };

  // Animation variants
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.1,
      }
    }
  };

  const iconVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
        delay: 0.2
      }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3 + (custom * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  // Value counter animation
  const numberValue = typeof value === 'number' ? value : parseFloat(value) || 0;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className={className}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className={cn("border overflow-hidden", variantClasses[variant])}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <motion.p 
                className="text-sm font-medium text-muted-foreground"
                variants={textVariants}
                custom={0}
                initial="hidden"
                animate={controls}
              >
                {title}
              </motion.p>
              
              <motion.div
                className="text-2xl font-bold"
                variants={textVariants}
                custom={1}
                initial="hidden"
                animate={controls}
              >
                {typeof value === 'number' ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { duration: 0.5, delay: 0.4 }
                    }}
                  >
                    {value.toLocaleString()}
                  </motion.span>
                ) : (
                  value
                )}
              </motion.div>
              
              {(trend || trendValue) && (
                <motion.div 
                  className="flex items-center gap-1"
                  variants={textVariants}
                  custom={2}
                  initial="hidden"
                  animate={controls}
                >
                  {trend && (
                    <span className={cn("flex items-center text-xs", trendClasses[trend])}>
                      {trend === "up" && "↑"}
                      {trend === "down" && "↓"}
                      {trend === "neutral" && "→"}
                      {trendValue}
                    </span>
                  )}
                  {description && (
                    <span className="text-xs text-muted-foreground">{description}</span>
                  )}
                </motion.div>
              )}
            </div>
            
            {icon && (
              <motion.div
                className={cn("p-2 rounded-lg", iconClasses[variant])}
                variants={iconVariants}
                initial="hidden"
                animate={controls}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {icon}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnimatedStatCard;
