
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Instagram, Facebook, MessageSquare, Plus, Layers, MoreHorizontal } from "lucide-react";

const Scheduler = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

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

  const platformIcons = {
    instagram: <Instagram className="h-4 w-4" />,
    facebook: <Facebook className="h-4 w-4" />,
    tiktok: <MessageSquare className="h-4 w-4" />,
  };

  const platformColors = {
    instagram: "bg-pink-100 text-pink-600",
    facebook: "bg-blue-100 text-blue-600",
    tiktok: "bg-slate-100 text-slate-600",
  };

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
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                />
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
                
                <div className="space-y-3">
                  {[
                    { name: "Beauty Brand", platform: "instagram", status: "connected" },
                    { name: "Beauty Official", platform: "facebook", status: "connected" },
                    { name: "Beauty Trends", platform: "tiktok", status: "connected" },
                  ].map((account, index) => (
                    <div key={index} className="flex items-center justify-between border rounded-md p-3">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-full p-2 ${platformColors[account.platform as keyof typeof platformColors]}`}>
                          {platformIcons[account.platform as keyof typeof platformIcons]}
                        </div>
                        <div>
                          <p className="font-medium">{account.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{account.platform}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {account.status === "connected" ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Connected
                          </span>
                        ) : (
                          <Button variant="outline" size="sm">
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Connect New Account
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {scheduledPosts.map((post) => (
                        <div key={post.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                          <div className="bg-muted rounded-md h-16 w-16 flex items-center justify-center shrink-0">
                            <Layers className="h-6 w-6 text-muted-foreground" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className={`rounded-full p-1 ${platformColors[post.platform as keyof typeof platformColors]}`}>
                                {platformIcons[post.platform as keyof typeof platformIcons]}
                              </div>
                              <p className="text-sm text-muted-foreground capitalize">{post.platform}</p>
                            </div>
                            <h3 className="font-medium mt-1">{post.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                              <span>
                                {post.date} • {post.time}
                              </span>
                              <span className="capitalize text-xs bg-muted px-2 py-0.5 rounded-full">
                                {post.type}
                              </span>
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="published" className="p-0 mt-0">
                  <CardContent className="p-6">
                    <div className="h-40 flex items-center justify-center text-muted-foreground">
                      <p>No published posts in the selected time range</p>
                    </div>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="drafts" className="p-0 mt-0">
                  <CardContent className="p-6">
                    <div className="h-40 flex items-center justify-center text-muted-foreground">
                      <p>No draft posts found</p>
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
            
            <div className="grid grid-cols-2 gap-6 mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Best Times to Post</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-pink-600" />
                        <span className="font-medium">Instagram</span>
                      </div>
                      <div className="text-sm">
                        Tue, Thu 2-4PM
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Facebook</span>
                      </div>
                      <div className="text-sm">
                        Wed, Fri 12-2PM
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tiktok className="h-5 w-5 text-slate-600" />
                        <span className="font-medium">TikTok</span>
                      </div>
                      <div className="text-sm">
                        Daily 6-9PM
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Performance Overview</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Engagement Rate</span>
                        <span className="text-sm font-medium">4.2%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-beauty-purple rounded-full" style={{ width: "42%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Click-through Rate</span>
                        <span className="text-sm font-medium">2.8%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-beauty-gold rounded-full" style={{ width: "28%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Conversion Rate</span>
                        <span className="text-sm font-medium">1.5%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-beauty-pink rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Scheduler;
