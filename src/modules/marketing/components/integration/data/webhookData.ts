
export const mockWebhookEvents = [
  {
    id: '1',
    name: 'محتوى جديد',
    endpoint: 'https://api.example.com/webhooks/content',
    eventTypes: ['content_created', 'content_updated', 'content_published'],
    active: true,
    lastTriggered: '2023-09-15T10:30:15',
    createdAt: '2023-08-01T14:20:00'
  },
  {
    id: '2',
    name: 'تسجيل المستخدمين',
    endpoint: 'https://api.example.com/webhooks/users',
    eventTypes: ['user_registered'],
    active: true,
    lastTriggered: '2023-09-16T08:45:22',
    createdAt: '2023-08-05T11:15:00'
  },
  {
    id: '3',
    name: 'تفاعلات المنتجات',
    endpoint: 'https://api.example.com/webhooks/products',
    eventTypes: ['product_created', 'content_interaction'],
    active: false,
    lastTriggered: null,
    createdAt: '2023-08-10T15:30:00'
  }
];
