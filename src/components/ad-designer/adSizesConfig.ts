
import React from 'react';
import { Square, AlignVerticalJustifyCenter, LayoutPanelTop, TrendingUp, LayoutTemplate, Settings } from "lucide-react";

export interface SizeOption {
  id: string;
  name: string;
  aspectRatio: string;
  size: string;
  icon: React.ReactNode;
}

export interface AdSizesConfig {
  [key: string]: SizeOption[];
}

export const adSizesConfig: AdSizesConfig = {
  instagram: [
    { id: "square", name: "مربع (1:1)", aspectRatio: "aspect-square", size: "1080×1080", icon: <Square className="h-4 w-4" /> },
    { id: "portrait", name: "عمودي (4:5)", aspectRatio: "aspect-4/5", size: "1080×1350", icon: <AlignVerticalJustifyCenter className="h-4 w-4" /> },
    { id: "story", name: "قصة (9:16)", aspectRatio: "aspect-9/16", size: "1080×1920", icon: <LayoutPanelTop className="h-4 w-4" /> },
    { id: "reels", name: "ريلز (9:16)", aspectRatio: "aspect-9/16", size: "1080×1920", icon: <TrendingUp className="h-4 w-4" /> },
  ],
  facebook: [
    { id: "square", name: "مربع (1:1)", aspectRatio: "aspect-square", size: "1080×1080", icon: <Square className="h-4 w-4" /> },
    { id: "landscape", name: "أفقي (16:9)", aspectRatio: "aspect-video", size: "1280×720", icon: <LayoutTemplate className="h-4 w-4" /> },
    { id: "wide", name: "عريض (2:1)", aspectRatio: "aspect-2/1", size: "1200×600", icon: <LayoutTemplate className="h-4 w-4" /> },
  ],
  pinterest: [
    { id: "standard", name: "قياسي (2:3)", aspectRatio: "aspect-2/3", size: "1000×1500", icon: <AlignVerticalJustifyCenter className="h-4 w-4" /> },
    { id: "square", name: "مربع (1:1)", aspectRatio: "aspect-square", size: "1000×1000", icon: <Square className="h-4 w-4" /> },
    { id: "video", name: "فيديو (1:1)", aspectRatio: "aspect-square", size: "1000×1000", icon: <TrendingUp className="h-4 w-4" /> },
  ],
  custom: [
    { id: "custom", name: "مخصص", aspectRatio: "custom", size: "مخصص", icon: <Settings className="h-4 w-4" /> },
  ]
};
