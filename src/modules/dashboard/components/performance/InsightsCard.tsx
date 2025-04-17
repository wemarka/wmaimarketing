
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface InsightItemProps {
  color: string;
  title: string;
  description: string;
}

interface InsightsCardProps {
  title: string;
  description: string;
  insights: InsightItemProps[];
}

const InsightsCard: React.FC<InsightsCardProps> = ({ title, description, insights }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className={`h-2 w-2 rounded-full ${insight.color}`}></span>
                <h4 className="font-medium">{insight.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsCard;
