// Tab items
export const tabItems = [
  { id: 'overview', label: 'نظرة عامة' },
  { id: 'analytics', label: 'التحليلات' },
  { id: 'webhooks', label: 'Webhooks' },
  { id: 'settings', label: 'الإعدادات' }
];

// Platform data
export const platformData = [
  {
    name: "Instagram",
    posts: 145,
    engagement: 4.2,
    followers: 15800,
    trend: "up" as const
  },
  {
    name: "Facebook",
    posts: 89,
    engagement: 2.8,
    followers: 8500,
    trend: "stable" as const
  },
  {
    name: "Twitter",
    posts: 217,
    engagement: 3.1,
    followers: 12300,
    trend: "down" as const
  },
  {
    name: "TikTok",
    posts: 65,
    engagement: 5.7,
    followers: 22400,
    trend: "up" as const
  }
];

// Engagement data
export const engagementData = [
  {
    day: "الأحد",
    instagram: 420,
    facebook: 280,
    twitter: 150,
    tiktok: 510
  },
  {
    day: "الاثنين",
    instagram: 380,
    facebook: 310,
    twitter: 180,
    tiktok: 480
  },
  {
    day: "الثلاثاء",
    instagram: 450,
    facebook: 300,
    twitter: 200,
    tiktok: 550
  },
  {
    day: "الأربعاء",
    instagram: 400,
    facebook: 290,
    twitter: 170,
    tiktok: 520
  },
  {
    day: "الخميس",
    instagram: 430,
    facebook: 320,
    twitter: 190,
    tiktok: 500
  },
  {
    day: "الجمعة",
    instagram: 480,
    facebook: 350,
    twitter: 220,
    tiktok: 580
  },
  {
    day: "السبت",
    instagram: 500,
    facebook: 370,
    twitter: 230,
    tiktok: 600
  }
];

// Upcoming posts data
export const upcomingPostsData = [
  {
    title: "إطلاق مجموعة مكياج جديدة",
    platform: "instagram",
    date: "2024-05-01",
    time: "10:00"
  },
  {
    title: "نصائح للعناية بالبشرة في الصيف",
    platform: "facebook",
    date: "2024-05-05",
    time: "14:00"
  },
  {
    title: "تغريدة حول منتج جديد",
    platform: "twitter",
    date: "2024-05-10",
    time: "16:00"
  },
  {
    title: "فيديو تعليمي للمكياج",
    platform: "tiktok",
    date: "2024-05-15",
    time: "18:00"
  }
];

// Webhook events data
export const mockWebhookEvents = [
  {
    event: "نشر محتوى",
    timestamp: "17/04/2025 15:23:45",
    status: "success" as const,
    destination: "https://example.com/webhook",
    payload: `{
      "event_type": "content_published",
      "content_id": "post_1234",
      "timestamp": "2025-04-17T15:23:45.000Z",
      "platform": "instagram",
      "status": "success",
      "metadata": {
        "engagement_rate": 3.2,
        "likes": 423,
        "comments": 52,
        "shares": 18
      }
    }`
  },
  {
    event: "تسجيل مستخدم",
    timestamp: "17/04/2025 14:17:22",
    status: "success" as const,
    destination: "https://example.com/webhook"
  },
  {
    event: "تحديث محتوى",
    timestamp: "17/04/2025 12:05:11",
    status: "error" as const,
    destination: "https://example.com/webhook"
  },
  {
    event: "نشر محتوى",
    timestamp: "16/04/2025 23:41:39",
    status: "warning" as const,
    destination: "https://example.com/webhook"
  },
  {
    event: "إنشاء حملة إعلانية",
    timestamp: "16/04/2025 16:22:05",
    status: "success" as const,
    destination: "https://example.com/webhook"
  }
];
