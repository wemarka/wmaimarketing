
export const mockWebhookEvents = [
  {
    id: "webhook-001",
    name: "تحديث المنشور",
    endpoint: "https://api.example.com/webhooks/post-update",
    event: "post.updated",
    enabled: true,
    lastTriggered: "2023-08-15T14:30:00Z",
    status: "active",
    successRate: 98.2
  },
  {
    id: "webhook-002",
    name: "إنشاء المحتوى",
    endpoint: "https://api.example.com/webhooks/content-create",
    event: "content.created",
    enabled: true,
    lastTriggered: "2023-08-14T09:15:00Z",
    status: "active",
    successRate: 100
  },
  {
    id: "webhook-003",
    name: "تنبيه التحليلات",
    endpoint: "https://api.example.com/webhooks/analytics-alert",
    event: "analytics.threshold_exceeded",
    enabled: false,
    lastTriggered: "2023-08-10T16:45:00Z",
    status: "inactive",
    successRate: 92.7
  },
  {
    id: "webhook-004",
    name: "تحديث الملف الشخصي",
    endpoint: "https://api.example.com/webhooks/profile-update",
    event: "user.profile_updated",
    enabled: true,
    lastTriggered: "2023-08-13T11:20:00Z",
    status: "active",
    successRate: 99.5
  }
];
