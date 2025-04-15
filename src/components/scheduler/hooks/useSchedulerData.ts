import { useState } from "react";
import { ScheduledPost, CalendarPost, SocialAccount, ApprovalItem, ContentItem } from "../types";
import { TaskReminder } from "@/components/dashboard/notifications/types";

export const useSchedulerData = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [mainView, setMainView] = useState<"list" | "calendar" | "organize" | "workflow" | "tasks">("list");
  
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

  // Sample data for workflow approvers
  const workflowApprovers = [
    { name: "أحمد محمد", role: "مدير التسويق", status: "متاح" },
    { name: "سارة أحمد", role: "مصمم المحتوى", status: "غير متاح" },
    { name: "محمد علي", role: "مدير المنتج", status: "متاح" }
  ];

  // Sample data for tasks
  const taskReminders: TaskReminder[] = [
    {
      id: "task-1",
      title: "مراجعة محتوى منشور مجموعة الصيف",
      description: "التأكد من محتوى منشور مجموعة التجميل الصيفية",
      dueDate: new Date().toISOString(), // Today
      priority: "high",
      completed: false,
      relatedPostId: "1"
    },
    {
      id: "task-2",
      title: "إنشاء هاشتاغات لمنشور الشعر الجديد",
      description: "اختيار أفضل الهاشتاغات لمنتج العناية بالشعر الجديد",
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // Yesterday
      priority: "medium",
      completed: false,
      relatedPostId: "2"
    },
    {
      id: "task-3",
      title: "تحضير صور منشور مجموعة الخريف",
      description: "تجميع صور المنتجات وتجهيزها للمنشور",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), // 2 days from now
      priority: "low",
      completed: false,
    },
    {
      id: "task-4",
      title: "تحليل أداء منشورات الأسبوع الماضي",
      description: "تحليل البيانات وإعداد تقرير مختصر",
      dueDate: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(), // 3 days ago
      priority: "high",
      completed: true
    },
  ];

  return {
    isDialogOpen,
    setIsDialogOpen,
    activeTab,
    setActiveTab,
    mainView,
    setMainView,
    scheduledPosts,
    completedPosts,
    calendarPosts,
    socialAccounts,
    approvalItems,
    contentItems,
    workflowApprovers,
    taskReminders
  };
};
