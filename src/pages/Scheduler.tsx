
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import NewPostDialog from "@/components/scheduler/NewPostDialog";
import ScheduledPosts from "@/components/scheduler/ScheduledPosts";
import EmptyTabContent from "@/components/scheduler/EmptyTabContent";
import ConnectedAccounts from "@/components/scheduler/ConnectedAccounts";
import PostTimesCard from "@/components/scheduler/PostTimesCard";
import PerformanceCard from "@/components/scheduler/PerformanceCard";

// Sample data for scheduled posts
const scheduledPosts = [
  {
    id: 1,
    title: "Summer makeup collection launch",
    type: "image",
    platform: "instagram",
    date: "Today",
    time: "3:30 PM",
  },
  {
    id: 2,
    title: "New skin care routine video",
    type: "video",
    platform: "facebook",
    date: "Tomorrow",
    time: "10:00 AM",
  },
  {
    id: 3,
    title: "Lipstick color trends 2025",
    type: "carousel",
    platform: "instagram",
    date: "May 20",
    time: "2:15 PM",
  },
  {
    id: 4,
    title: "Beauty tutorial: Summer glow",
    type: "video",
    platform: "tiktok",
    date: "May 22",
    time: "6:00 PM",
  },
];

// Sample data for completed posts
const completedPosts = [
  {
    id: 101,
    title: "Spring collection preview",
    type: "image",
    platform: "instagram",
    date: "May 10",
    time: "1:00 PM",
  },
  {
    id: 102,
    title: "Foundation review",
    type: "video",
    platform: "facebook",
    date: "May 8",
    time: "11:30 AM",
  },
];

const Scheduler = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Publishing & Scheduler</h1>
            <p className="text-muted-foreground">
              Schedule and publish your content across social platforms
            </p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <CalendarPlus className="h-4 w-4" />
            New Post
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg font-medium">Content Calendar</CardTitle>
              </CardHeader>
              <Tabs
                defaultValue="upcoming"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="px-6 pt-6">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="upcoming">
                  {scheduledPosts.length > 0 ? (
                    <ScheduledPosts posts={scheduledPosts} />
                  ) : (
                    <EmptyTabContent message="No upcoming posts scheduled. Create a new post to get started." />
                  )}
                </TabsContent>

                <TabsContent value="completed">
                  {completedPosts.length > 0 ? (
                    <ScheduledPosts posts={completedPosts} />
                  ) : (
                    <EmptyTabContent message="No completed posts yet." />
                  )}
                </TabsContent>

                <TabsContent value="drafts">
                  <EmptyTabContent message="No draft posts found." />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <ConnectedAccounts />
            <PostTimesCard />
            <PerformanceCard />
          </div>
        </div>

        <NewPostDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </Layout>
  );
};

export default Scheduler;
