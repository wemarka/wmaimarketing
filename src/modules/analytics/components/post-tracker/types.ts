
export type PostStatus = "published" | "scheduled" | "pending" | "rejected";

export interface PostData {
  id: string;
  title: string;
  status: PostStatus;
  date: string;
  priority?: "high" | "medium" | "low";
  platform?: string;
}

export interface StatusInfo {
  icon: JSX.Element;
  label: string;
  description: string;
  bgClass: string;
  borderClass: string;
  count: number;
}
