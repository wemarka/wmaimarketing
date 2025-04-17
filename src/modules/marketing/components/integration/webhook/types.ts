
export interface WebhookItem {
  id: string;
  name: string;
  endpoint: string;
  eventTypes: string[];
  active: boolean;
  lastTriggered: string | null;
  createdAt: string;
  secretKey?: string;
}

export interface WebhookEventLogItemProps {
  id: string;
  event: string;
  status: 'success' | 'error' | 'pending';
  platform: string;
  timestamp: string;
  details: string;
  destination: string;
  payload?: string;
  response?: string;
}

// Additional types needed for WebhookTabs
export interface WebhookTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}
