
export const mockWebhookEvents = [
  {
    id: "webhook-1",
    name: "نشر تلقائي",
    endpoint: "https://api.example.com/hooks/post",
    status: "active",
    lastTriggered: "2025-04-15T14:30:00",
    events: ["post.created", "post.updated"],
  },
  {
    id: "webhook-2",
    name: "تحليل المحتوى",
    endpoint: "https://analytics.example.com/incoming",
    status: "active",
    lastTriggered: "2025-04-16T09:15:00",
    events: ["content.analyzed"],
  },
  {
    id: "webhook-3",
    name: "إشعارات التفاعل",
    endpoint: "https://notifications.example.com/webhook",
    status: "inactive",
    lastTriggered: null,
    events: ["engagement.comment", "engagement.like", "engagement.share"],
  },
];
