
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export interface ProjectHeaderProps {
  title: string;
  description: string;
  version: string;
  lastUpdated: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  description,
  version,
  lastUpdated,
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
            <Badge variant="outline" className="text-sm">
              الإصدار {version}
            </Badge>
          </div>
          <p className="text-muted-foreground">{description}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>آخر تحديث: {lastUpdated}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectHeader;
