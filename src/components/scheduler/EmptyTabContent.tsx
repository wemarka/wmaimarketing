
import React from "react";
import { CardContent } from "@/components/ui/card";

interface EmptyTabContentProps {
  message: string;
}

const EmptyTabContent: React.FC<EmptyTabContentProps> = ({ message }) => {
  return (
    <CardContent className="p-6">
      <div className="h-40 flex items-center justify-center text-muted-foreground">
        <p>{message}</p>
      </div>
    </CardContent>
  );
};

export default EmptyTabContent;
