
import React, { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface AICapabilityCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badgeText?: string;
  color?: string;
  children?: ReactNode;
  onClick?: () => void;
}

const AICapabilityCard: React.FC<AICapabilityCardProps> = ({
  title,
  description,
  icon: Icon,
  badgeText,
  color = "text-beauty-purple",
  children,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card 
        className={`h-full transition-all ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className={`h-10 w-10 ${color}`} />
            </motion.div>
            {badgeText && (
              <Badge variant="outline" className="ml-2">
                {badgeText}
              </Badge>
            )}
          </div>
          <CardTitle className="mt-4 text-xl">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AICapabilityCard;
