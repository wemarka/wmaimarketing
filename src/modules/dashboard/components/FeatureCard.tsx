
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  iconColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon,
  href,
  iconColor = "bg-primary/10 text-primary" 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full border-none shadow-md overflow-hidden">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              iconColor
            )}>
              {icon}
            </div>
            
            <motion.div 
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: "#f5f5f5" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </motion.div>
          </div>
          
          <div className="mt-2">
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          
          <a 
            href={href} 
            className="mt-auto pt-3 text-sm text-primary hover:underline flex items-center"
            aria-label={`تصفح ${title}`}
          >
            تصفح
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
