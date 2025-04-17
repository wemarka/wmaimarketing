
import { WebhookEventLogItemProps } from '../WebhookEventLogItem';

export const mockWebhookEvents: WebhookEventLogItemProps[] = [
  {
    id: '1',
    event: 'نشر محتوى',
    status: 'success',
    platform: 'instagram',
    timestamp: '2025-04-17T15:23:45',
    details: 'تم نشر المحتوى بنجاح على منصة Instagram',
    destination: 'https://example.com/webhook'
  },
  {
    id: '2', 
    event: 'تسجيل مستخدم',
    status: 'success',
    platform: 'facebook',
    timestamp: '2025-04-17T14:17:22',
    destination: 'https://example.com/webhook'
  },
  {
    id: '3',
    event: 'تحديث محتوى',
    status: 'error',
    platform: 'twitter',
    timestamp: '2025-04-17T12:05:11',
    details: 'فشل تحديث المحتوى بسبب خطأ في الاتصال',
    destination: 'https://example.com/webhook'
  },
  {
    id: '4',
    event: 'نشر محتوى',
    status: 'pending',
    platform: 'linkedin',
    timestamp: '2025-04-16T23:41:39',
    destination: 'https://example.com/webhook'
  },
  {
    id: '5',
    event: 'إنشاء حملة إعلانية',
    status: 'success',
    platform: 'instagram',
    timestamp: '2025-04-16T16:22:05',
    destination: 'https://example.com/webhook'
  },
  {
    id: '6',
    event: 'نشر فيديو',
    status: 'success',
    platform: 'tiktok',
    timestamp: '2025-04-17T18:10:25',
    details: 'تم نشر الفيديو بنجاح على منصة TikTok',
    destination: 'https://example.com/webhook'
  }
];
