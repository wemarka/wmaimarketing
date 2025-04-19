
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
  
  return (
    <motion.div
      className={cn(
        'mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0',
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={cn(
        'flex flex-col gap-1',
        isRTL && 'text-right'
      )}>
        <div className="flex items-center gap-2">
          {icon && (
            <span className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md border bg-background',
              isRTL ? 'order-last' : 'order-first'
            )}>
              {icon}
            </span>
          )}
          <h1 className={cn(
            'text-xl font-semibold tracking-tight',
            variant === 'gradient' && 'bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'
          )}>
            {title}
          </h1>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      
      {actions && (
        <div className={cn(
          'flex flex-wrap items-center gap-2',
          isRTL && 'justify-end'
        )}>
          {actions}
        </div>
      )}
    </motion.div>
  );
};

export default PageHeader;
