
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

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
  lastUpdated 
}) => {
  return (
    <Card className="shadow-lg rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <CardContent className="p-6">
        <div className="flex justify-between flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{description}</p>
          </div>
          <div className="text-right">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-md px-3 py-1 inline-block mb-2">
              <span className="text-sm font-medium">v{version}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              آخر تحديث: {lastUpdated}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectHeader;
