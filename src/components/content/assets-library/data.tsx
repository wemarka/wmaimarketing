
import React from "react";
import { Asset, AssetFolder } from "./types";

export const typeIcons = {
  image: "🖼️",
  video: "🎬",
  document: "📄",
  font: "🔤",
};

export const sampleAssets: Asset[] = [
  {
    id: "1",
    name: "logo_main.png",
    type: "image",
    thumbnail: "https://source.unsplash.com/random/100x100?logo",
    category: "logos",
    tags: ["لوجو", "شعار", "رئيسي"],
    size: "120 كب",
    created: "2024-03-10",
  },
  {
    id: "2",
    name: "banner_summer.png",
    type: "image",
    thumbnail: "https://source.unsplash.com/random/100x100?banner",
    category: "banners",
    tags: ["بانر", "صيف", "إعلان"],
    size: "450 كب",
    created: "2024-03-05",
  },
  {
    id: "3",
    name: "product_serum.png",
    type: "image",
    thumbnail: "https://source.unsplash.com/random/100x100?serum",
    category: "products",
    tags: ["منتج", "سيروم", "عناية"],
    size: "280 كب",
    created: "2024-03-01",
  },
  {
    id: "4",
    name: "makeup_tutorial.mp4",
    type: "video",
    thumbnail: "https://source.unsplash.com/random/100x100?makeup",
    category: "videos",
    tags: ["فيديو", "مكياج", "تعليمي"],
    size: "4.2 مب",
    created: "2024-02-25",
  },
  {
    id: "5",
    name: "brand_guidelines.pdf",
    type: "document",
    thumbnail: "https://source.unsplash.com/random/100x100?document",
    category: "documents",
    tags: ["مستند", "براند", "إرشادات"],
    size: "1.8 مب",
    created: "2024-02-20",
  },
  {
    id: "6",
    name: "cairo_font.ttf",
    type: "font",
    thumbnail: "https://source.unsplash.com/random/100x100?font",
    category: "fonts",
    tags: ["خط", "عربي", "القاهرة"],
    size: "520 كب",
    created: "2024-02-15",
  },
  {
    id: "7",
    name: "instagram_post.png",
    type: "image",
    thumbnail: "https://source.unsplash.com/random/100x100?instagram",
    category: "social",
    tags: ["منشور", "انستجرام", "وسائل التواصل"],
    size: "350 كب",
    created: "2024-02-10",
  },
  {
    id: "8",
    name: "product_cream.png",
    type: "image",
    thumbnail: "https://source.unsplash.com/random/100x100?cream",
    category: "products",
    tags: ["منتج", "كريم", "ترطيب"],
    size: "240 كب",
    created: "2024-02-05",
  }
];

export const assetFolders: AssetFolder[] = [
  { id: "1", name: "الشعارات", icon: <div className="text-amber-500">🏷️</div>, count: 12 },
  { id: "2", name: "البانرات", icon: <div className="text-blue-500">🖼️</div>, count: 8 },
  { id: "3", name: "صور المنتجات", icon: <div className="text-pink-500">📦</div>, count: 45 },
  { id: "4", name: "الفيديوهات", icon: <div className="text-purple-500">🎬</div>, count: 6 },
  { id: "5", name: "المستندات", icon: <div className="text-green-500">📑</div>, count: 15 },
  { id: "6", name: "الخطوط", icon: <div className="text-orange-500">🔤</div>, count: 10 },
  { id: "7", name: "وسائل التواصل", icon: <div className="text-sky-500">📱</div>, count: 30 },
];
