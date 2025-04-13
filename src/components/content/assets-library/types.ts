
export interface Asset {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "font";
  thumbnail: string;
  category: string;
  tags: string[];
  size: string;
  created: string;
}

export interface AssetFolder {
  id: string;
  name: string;
  icon: JSX.Element;
  count: number;
}

export type ViewMode = "grid" | "list";
export type SortOption = "name" | "date" | "size" | "type";
export type SortDirection = "asc" | "desc";
