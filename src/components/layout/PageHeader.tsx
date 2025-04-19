
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
  variant?: 'default' | 'gradient';
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

const PageHeader = ({
  title,
  description,
  variant = 'default',
  icon,
  actions,
  className,
}: PageHeaderProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar' || document.dir === 'rtl';
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  return (
    <motion.div
      className={cn(
        'mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className={cn(
          'flex flex-col gap-1',
          isRTL && 'text-right'
        )}
        variants={itemVariants}
      >
        <div className="flex items-center gap-2">
          {icon && (
            <motion.span 
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-md border bg-background',
                isRTL ? 'order-last' : 'order-first'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {icon}
            </motion.span>
          )}
          <motion.h1 
            className={cn(
              'text-xl font-semibold tracking-tight',
              variant === 'gradient' && 'bg-gradient-to-r from-[#3a7a89] to-[#3a7a89]/70 bg-clip-text text-transparent'
            )}
            variants={itemVariants}
          >
            {title}
          </motion.h1>
        </div>
        {description && (
          <motion.p 
            className="text-sm text-muted-foreground"
            variants={itemVariants}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
      
      {actions && (
        <motion.div 
          className={cn(
            'flex flex-wrap items-center gap-2',
            isRTL && 'justify-end'
          )}
          variants={itemVariants}
        >
          {actions}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PageHeader;
