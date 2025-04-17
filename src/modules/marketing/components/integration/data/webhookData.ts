
import { WebhookItem, WebhookEventLogItemProps } from '../webhook/types';

export const mockWebhookEvents: WebhookItem[] = [
  {
    id: "webhook-1",
    name: "إشعار المنشورات الجديدة",
    endpoint: "https://example.com/webhook/posts",
    eventTypes: ["post.created", "post.scheduled"],
    active: true,
    lastTriggered: new Date(Date.now() - 3600000).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: "webhook-2",
    name: "إشعار التعليقات والردود",
    endpoint: "https://example.com/webhook/comments",
    eventTypes: ["comment.created", "comment.replied"],
    active: true,
    lastTriggered: new Date(Date.now() - 7200000).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "webhook-3",
    name: "تحليلات وإحصاءات",
    endpoint: "https://example.com/webhook/analytics",
    eventTypes: ["analytics.daily", "analytics.weekly"],
    active: false,
    lastTriggered: null,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

export const mockWebhookLogs: WebhookEventLogItemProps[] = [
  {
    id: "log-1",
    event: "post.created",
    status: "success",
    platform: "Instagram",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    details: "تم إنشاء منشور جديد بنجاح",
    destination: "https://example.com/webhook/posts"
  },
  {
    id: "log-2",
    event: "post.scheduled",
    status: "success",
    platform: "Twitter",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    details: "تم جدولة منشور للنشر",
    destination: "https://example.com/webhook/posts"
  },
  {
    id: "log-3",
    event: "comment.created",
    status: "error",
    platform: "Facebook",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    details: "فشل إرسال إشعار التعليق الجديد",
    destination: "https://example.com/webhook/comments"
  }
];
