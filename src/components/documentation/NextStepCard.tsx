
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface NextStepCardProps {
  title: string;
  description: string;
}

const NextStepCard: React.FC<NextStepCardProps> = ({ title, description }) => {
  return (
    <Card className="hover:border-beauty-purple transition-colors cursor-pointer">
      <CardContent className="p-4">
        <h3 className="font-medium mb-2 flex items-center justify-between">
          {title}
          <ArrowRight className="h-4 w-4 text-beauty-purple" />
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default NextStepCard;
