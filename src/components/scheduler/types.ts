
export interface CalendarPost {
  id: number;
  title: string;
  date: Date;
  platform: "instagram" | "facebook" | "tiktok";
  status: "draft" | "pending" | "scheduled" | "published";
}

export interface SocialAccount {
  id: string;
  platform: "instagram" | "facebook" | "tiktok" | "twitter";
  accountName: string;
  profileName: string;
  status: "pending" | "connected" | "error";
  insights: {
    followers: number;
    engagement: number;
    postCount: number;
  }
}

export interface ApprovalItem {
  id: number;
  title: string;
  submittedBy: string;
  submittedAt: string;
  type: string;
  reviewers: {
    name: string;
    status: "pending" | "approved" | "rejected";
  }[];
}

export interface ContentItem {
  id: number;
  title: string;
  type: string;
  campaign: string;
  product: string;
  status: string;
  created: string;
  scheduled: string | null;
}
