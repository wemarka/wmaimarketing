import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarPlus, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";
import NewPostDialog from "@/components/scheduler/NewPostDialog";
import ScheduledPosts from "@/components/scheduler/ScheduledPosts";
import EmptyTabContent from "@/components/scheduler/EmptyTabContent";
import ConnectedAccounts from "@/components/scheduler/ConnectedAccounts";
import PostTimesCard from "@/components/scheduler/PostTimesCard";
import PerformanceCard from "@/components/scheduler/PerformanceCard";
import MarketingCalendar from "@/components/scheduler/MarketingCalendar";
import AccountsManager from "@/components/scheduler/AccountsManager";
import ApprovalWorkflow from "@/components/scheduler/ApprovalWorkflow";
import ContentOrganizer from "@/components/scheduler/ContentOrganizer";
import { CalendarPost, SocialAccount, ApprovalItem, ContentItem } from "@/components/scheduler/types";

// Type definitions for our data
interface ScheduledPost {
  id: number;
  title: string;
  type: string;
  platform: string;
  date: string;
  time: string;
}

// Sample data for scheduled posts
const scheduledPosts: ScheduledPost[] = [
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
const completedPosts: ScheduledPost[] = [
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

// Sample data for calendar
const calendarPosts: CalendarPost[] = [
  {
    id: 1,
    title: "Summer makeup collection launch",
    date: new Date(),
    platform: "instagram",
    status: "scheduled",
  },
  {
    id: 2,
    title: "New skin care routine video",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    platform: "facebook",
    status: "draft",
  },
  {
    id: 3,
    title: "Lipstick color trends 2025",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    platform: "instagram",
    status: "pending",
  },
  {
    id: 4,
    title: "Beauty tutorial: Summer glow",
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    platform: "tiktok",
    status: "scheduled",
  },
];

// Sample data for social accounts
const socialAccounts: SocialAccount[] = [
  {
    id: "1",
    platform: "instagram",
    accountName: "@beauty_brand",
    profileName: "Beauty Brand",
    status: "connected",
    insights: {
      followers: 15400,
      engagement: 4.2,
      postCount: 127,
    }
  },
  {
    id: "2",
    platform: "facebook",
    accountName: "Beauty Official",
    profileName: "Beauty Official",
    status: "connected",
    insights: {
      followers: 32100,
      engagement: 2.8,
      postCount: 210,
    }
  },
  {
    id: "3",
    platform: "tiktok",
    accountName: "@beauty_trends",
    profileName: "Beauty Trends",
    status: "error",
    insights: {
      followers: 8700,
      engagement: 6.5,
      postCount: 45,
    }
  },
];

// Sample data for approval workflow
const approvalItems: ApprovalItem[] = [
  {
    id: 1,
    title: "Summer Glow Makeup Tutorial",
    submittedBy: "Sarah",
    submittedAt: "Today, 10:30 AM",
    type: "Video Post",
    reviewers: [
      { name: "Ahmed", status: "approved" },
      { name: "Layla", status: "pending" },
      { name: "Mohammed", status: "pending" },
    ]
  },
  {
    id: 2,
    title: "New Foundation Launch Announcement",
    submittedBy: "Fatima",
    submittedAt: "Yesterday, 3:15 PM",
    type: "Product Announcement",
    reviewers: [
      { name: "Ahmed", status: "approved" },
      { name: "Layla", status: "approved" },
      { name: "Mohammed", status: "rejected" },
    ]
  },
];

// Sample data for content organizer
const contentItems: ContentItem[] = [
  {
    id: 1,
    title: "Summer Glow Makeup Tutorial",
    type: "Video",
    campaign: "Summer Collection",
    product: "Illuminating Bronzer",
    status: "مجدول",
    created: "May 15, 2025",
    scheduled: "May 25, 2025"
  },
  {
    id: 2,
    title: "New Foundation Shades",
    type: "Carousel",
    campaign: "Inclusive Beauty",
    product: "HD Foundation",
    status: "منشور",
    created: "May 10, 2025",
    scheduled: "May 12, 2025"
  },
  {
    id: 3,
    title: "Skincare Routine Steps",
    type: "Carousel",
    campaign: "Skin Health",
    product: "Hydrating Serum",
    status: "مسودة",
    created: "May 18, 2025",
    scheduled: null
  },
  {
    id: 4,
    title: "Lip Color Trends 2025",
    type: "Image",
    campaign: "Seasonal Trends",
    product: "Matte Lipstick",
    status: "قيد المراجعة",
    created: "May 16, 2025",
    scheduled: null
  },
];

const Scheduler = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [mainView, setMainView] = useState<"list" | "calendar" | "organize" | "workflow">("list");

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">الجدولة والنشر</h1>
            <p className="text-muted-foreground">
              إدارة ونشر المحتوى عبر منصات التواصل الاجتماعي
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              asChild
            >
              <Link to="/scheduler-settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <CalendarPlus className="h-4 w-4" />
              منشور جديد
            </Button>
          </div>
        </div>

        <Tabs value={mainView} onValueChange={(value) => setMainView(value as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="list">قائمة المنشورات</TabsTrigger>
            <TabsTrigger value="calendar">التقويم</TabsTrigger>
            <TabsTrigger value="organize">تنظيم المحتوى</TabsTrigger>
            <TabsTrigger value="workflow">سير العمل</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-lg font-medium">قائمة المنشورات</CardTitle>
                </CardHeader>
                <Tabs
                  defaultValue="upcoming"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <div className="px-6 pt-6">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="upcoming">قادم</TabsTrigger>
                      <TabsTrigger value="completed">مكتمل</TabsTrigger>
                      <TabsTrigger value="drafts">مسودات</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="upcoming">
                    {scheduledPosts.length > 0 ? (
                      <ScheduledPosts posts={scheduledPosts} />
                    ) : (
                      <EmptyTabContent message="لا توجد منشورات قادمة مجدولة. أنشئ منشوراً جديداً للبدء." />
                    )}
                  </TabsContent>

                  <TabsContent value="completed">
                    {completedPosts.length > 0 ? (
                      <ScheduledPosts posts={completedPosts} />
                    ) : (
                      <EmptyTabContent message="لا توجد منشورات مكتملة بعد." />
                    )}
                  </TabsContent>

                  <TabsContent value="drafts">
                    <EmptyTabContent message="لا توجد مسودات منشورات." />
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            <div className="space-y-6">
              <ConnectedAccounts />
              <PostTimesCard />
              <PerformanceCard />
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-[600px]">
              <MarketingCalendar posts={calendarPosts} />
            </div>
            
            <div className="space-y-6">
              <AccountsManager accounts={socialAccounts} />
            </div>
          </TabsContent>
          
          <TabsContent value="organize" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-[600px]">
              <ContentOrganizer items={contentItems} />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">قوائم التحقق</CardTitle>
                </CardHeader>
                <div className="p-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-green-600" viewBox="0 0 24 24">
                          <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </div>
                      <span>تنظيم المنتجات حسب المجموعات</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-green-600" viewBox="0 0 24 24">
                          <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </div>
                      <span>إنشاء حملة لمنتجات العناية بالبشرة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs">•</span>
                      </div>
                      <span>مراجعة المنشورات المجدولة للأسبوع القادم</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs">•</span>
                      </div>
                      <span>تحديث تصنيفات المنتجات الجديدة</span>
                    </li>
                  </ul>
                </div>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">المحتوى المقترح</CardTitle>
                </CardHeader>
                <div className="p-4 space-y-3">
                  <div className="border rounded-md p-2">
                    <p className="font-medium text-sm">صور المنتجات الجديدة</p>
                    <p className="text-xs text-muted-foreground">15 صورة متاحة للنشر</p>
                  </div>
                  <div className="border rounded-md p-2">
                    <p className="font-medium text-sm">فيديوهات تعليمية</p>
                    <p className="text-xs text-muted-foreground">3 فيديوهات جاهزة للجدولة</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    استكشاف المزيد من المحتوى
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="workflow" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-[600px]">
              <ApprovalWorkflow approvals={approvalItems} />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">الموافقون النشطون</CardTitle>
                </CardHeader>
                <div className="p-4">
                  <ul className="space-y-3">
                    {[
                      { name: "أحمد محمد", role: "مدير التسويق", status: "متاح" },
                      { name: "سارة أحمد", role: "مصمم المحتوى", status: "غير متاح" },
                      { name: "محمد علي", role: "مدير المنتج", status: "متاح" }
                    ].map((approver, idx) => (
                      <li key={idx} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{approver.name}</p>
                          <p className="text-xs text-muted-foreground">{approver.role}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={approver.status === "متاح" ? 
                            "bg-green-100 text-green-700" : 
                            "bg-red-100 text-red-700"
                          }
                        >
                          {approver.status}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">إحصائيات سير العمل</CardTitle>
                </CardHeader>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-3 text-center">
                      <p className="text-3xl font-bold text-amber-500">3</p>
                      <p className="text-sm text-muted-foreground">قيد الانتظار</p>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <p className="text-3xl font-bold text-green-500">12</p>
                      <p className="text-sm text-muted-foreground">تمت الموافقة</p>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <p className="text-3xl font-bold text-red-500">2</p>
                      <p className="text-sm text-muted-foreground">مرفوضة</p>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <p className="text-3xl font-bold">85%</p>
                      <p className="text-sm text-muted-foreground">معدل الموافقة</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <NewPostDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </Layout>
  );
};

export default Scheduler;
