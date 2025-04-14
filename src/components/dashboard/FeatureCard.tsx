
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  iconColor?: string;
  className?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

const FeatureCard = ({
  icon,
  title,
  description,
  href,
  iconColor = "bg-muted text-foreground",
  className,
  isNew = false,
  isPopular = false,
}: FeatureCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        className={cn("overflow-hidden h-full hover:shadow-md transition-all border", 
          className)}
      >
        <CardContent className="p-6">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between">
              <div className={cn("p-3 rounded-lg", iconColor)}>
                {icon}
              </div>
              <div className="flex gap-2">
                {isNew && (
                  <Badge className="bg-beauty-purple text-white">
                    {t("dashboard.features.new")}
                  </Badge>
                )}
                {isPopular && (
                  <Badge className="bg-beauty-gold text-white">
                    {t("dashboard.features.popular")}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex-grow">
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{description}</p>
            </div>
            
            <Button 
              variant="ghost" 
              className="justify-start p-0 mt-4 hover:bg-transparent" 
              onClick={() => navigate(href)}
            >
              <span>{t("dashboard.features.openTool")}</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
