
export const platformData = [
  { name: 'انستغرام', posts: 42, engagement: 3.8, followers: 12500, trend: 'up' as const },
  { name: 'فيسبوك', posts: 36, engagement: 2.1, followers: 8700, trend: 'stable' as const },
  { name: 'تويتر', posts: 64, engagement: 1.5, followers: 5200, trend: 'down' as const },
  { name: 'تيك توك', posts: 28, engagement: 4.2, followers: 15800, trend: 'up' as const },
];

export const engagementData = [
  { day: 'الأحد', instagram: 82, facebook: 43, twitter: 35, tiktok: 93 },
  { day: 'الإثنين', instagram: 75, facebook: 51, twitter: 42, tiktok: 85 },
  { day: 'الثلاثاء', instagram: 98, facebook: 38, twitter: 47, tiktok: 110 },
  { day: 'الأربعاء', instagram: 105, facebook: 56, twitter: 39, tiktok: 145 },
  { day: 'الخميس', instagram: 115, facebook: 65, twitter: 52, tiktok: 160 },
  { day: 'الجمعة', instagram: 90, facebook: 48, twitter: 43, tiktok: 135 },
  { day: 'السبت', instagram: 120, facebook: 59, twitter: 61, tiktok: 170 },
];

export const upcomingPostsData = [
  {
    title: "إطلاق مجموعة منتجات الصيف",
    platform: "instagram",
    date: "2025-04-22",
    time: "14:30"
  },
  {
    title: "نصائح العناية بالبشرة في رمضان",
    platform: "facebook",
    date: "2025-04-20",
    time: "10:00"
  },
  {
    title: "كيف تختارين العطر المناسب؟",
    platform: "tiktok",
    date: "2025-04-19",
    time: "18:45"
  },
  {
    title: "تخفيضات نهاية الأسبوع",
    platform: "twitter",
    date: "2025-04-18",
    time: "09:15"
  },
  {
    title: "وصفات طبيعية للعناية بالشعر",
    platform: "instagram",
    date: "2025-04-18",
    time: "12:00"
  }
];

export const tabItems = [
  { id: "overview", label: "النظرة العامة" },
  { id: "analytics", label: "التحليلات" },
  { id: "scheduler", label: "جدولة المنشورات" },
  { id: "settings", label: "إعدادات المنصات" }
];
