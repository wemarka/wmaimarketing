
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  className?: string;
  iconColor?: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
  href,
  className,
  iconColor = "bg-beauty-pink text-primary"
}: FeatureCardProps) => {
  return (
    <div className={cn("beauty-card p-6 flex flex-col", className)}>
      <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", iconColor)}>
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 flex-1">{description}</p>
      <Link to={href} className="mt-auto">
        <Button variant="ghost" className="flex items-center gap-1 p-0 hover:gap-2 transition-all">
          Get started <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </Link>
    </div>
  );
};

export default FeatureCard;
