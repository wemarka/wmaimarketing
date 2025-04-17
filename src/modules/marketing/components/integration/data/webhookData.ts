
export const mockWebhookEvents = [
  {
    id: '1',
    name: 'محتوى جديد',
    endpoint: 'https://api.example.com/webhooks/content',
    eventTypes: ['content_created', 'content_updated', 'content_published'],
    active: true,
    lastTriggered: '2023-09-15T10:30:15',
    createdAt: '2023-08-01T14:20:00',
    secretKey: 'wh_sec_70d2f5a3e1b6c9d8'
  },
  {
    id: '2',
    name: 'تسجيل المستخدمين',
    endpoint: 'https://api.example.com/webhooks/users',
    eventTypes: ['user_registered'],
    active: true,
    lastTriggered: '2023-09-16T08:45:22',
    createdAt: '2023-08-05T11:15:00',
    secretKey: 'wh_sec_85c7e6f1d2a3b4e5'
  },
  {
    id: '3',
    name: 'تفاعلات المنتجات',
    endpoint: 'https://api.example.com/webhooks/products',
    eventTypes: ['product_created', 'content_interaction'],
    active: false,
    lastTriggered: null,
    createdAt: '2023-08-10T15:30:00',
    secretKey: 'wh_sec_91f3e5d7c2b4a6e3'
  }
];

export const mockWebhookLogs = [
  {
    id: "log1",
    event: "content_created",
    status: "success",
    platform: "المنصة الرئيسية",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    details: "تم إنشاء مقالة جديدة بعنوان 'أحدث التقنيات في عالم التجميل'",
    destination: "https://api.example.com/webhooks/content"
  },
  {
    id: "log2",
    event: "user_registered",
    status: "success",
    platform: "منصة المستخدمين",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    destination: "https://api.example.com/webhooks/users"
  },
  {
    id: "log3",
    event: "content_updated",
    status: "error",
    platform: "المنصة الرئيسية",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    details: "فشل في الوصول إلى الخادم بعد 3 محاولات",
    destination: "https://api.example.com/webhooks/content"
  },
  {
    id: "log4",
    event: "product_created",
    status: "pending",
    platform: "منصة المنتجات",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    details: "جاري معالجة الطلب...",
    destination: "https://api.example.com/webhooks/products"
  }
];
