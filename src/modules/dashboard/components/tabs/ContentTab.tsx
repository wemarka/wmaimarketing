
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PendingPostsWidget from "@/modules/dashboard/components/pending-posts";
import TaskReminders from "@/modules/dashboard/components/TaskReminders";

const ContentTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-6">
        <PendingPostsWidget />
        <TaskReminders />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>تحليل المحتوى</CardTitle>
        </CardHeader>
        <CardContent>
          <p>محتوى تحليل المحتوى سيظهر هنا</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentTab;
