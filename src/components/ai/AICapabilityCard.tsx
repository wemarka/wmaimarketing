
import React, { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

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
    <Card 
      className={`h-full transition-all hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Icon className={`h-10 w-10 ${color}`} />
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
  );
};

export default AICapabilityCard;
