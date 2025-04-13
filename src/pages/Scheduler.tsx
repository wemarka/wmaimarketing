
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Plus } from "lucide-react";
import ConnectedAccounts from "@/components/scheduler/ConnectedAccounts";
import ScheduledPosts from "@/components/scheduler/ScheduledPosts";
import EmptyTabContent from "@/components/scheduler/EmptyTabContent";
import PostTimesCard from "@/components/scheduler/PostTimesCard";
import PerformanceCard from "@/components/scheduler/PerformanceCard";
import NewPostDialog from "@/components/scheduler/NewPostDialog";

const Scheduler = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [newPostDialogOpen, setNewPostDialogOpen] = useState(false);

  // Sample scheduled posts data
  const scheduledPosts = [
    {
      id: 1,
      title: "Summer lipstick collection",
      type: "image",
      platform: "instagram",
      date: "Apr 14, 2025",
      time: "10:30 AM",
    },
    {
      id: 2,
      title: "Foundation shade finder guide",
      type: "video",
      platform: "facebook",
      date: "Apr 15, 2025",
      time: "2:00 PM",
    },
    {
      id: 3,
      title: "Quick makeup tutorial",
      type: "video",
      platform: "tiktok",
      date: "Apr 16, 2025",
      time: "6:45 PM",
    },
    {
      id: 4,
      title: "New mascara launch",
      type: "image",
      platform: "instagram",
      date: "Apr 17, 2025",
      time: "12:15 PM",
    },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="mb-1">Publishing & Scheduler</h1>
            <p className="text-muted-foreground max-w-2xl">
              Schedule and manage your beauty product content across multiple social media platforms.
            </p>
          </div>
          
          <Button onClick={() => setNewPostDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <div className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                />
              </div>
            </Card>
            
            <ConnectedAccounts />
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <Tabs defaultValue="scheduled">
                <div className="flex items-center justify-between p-6 pb-2">
                  <TabsList>
                    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="scheduled" className="p-0 mt-0">
                  <ScheduledPosts posts={scheduledPosts} />
                </TabsContent>
                
                <TabsContent value="published" className="p-0 mt-0">
                  <EmptyTabContent message="No published posts in the selected time range" />
                </TabsContent>
                
                <TabsContent value="drafts" className="p-0 mt-0">
                  <EmptyTabContent message="No draft posts found" />
                </TabsContent>
              </Tabs>
            </Card>
            
            <div className="grid grid-cols-2 gap-6 mt-6">
              <PostTimesCard />
              <PerformanceCard />
            </div>
          </div>
        </div>

        {/* New Post Dialog */}
        <NewPostDialog 
          open={newPostDialogOpen}
          onOpenChange={setNewPostDialogOpen}
        />
      </div>
    </Layout>
  );
};

export default Scheduler;
