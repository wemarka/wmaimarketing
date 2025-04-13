
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
    { 
      id: "square", 
      name: "مربع (1:1)", 
      aspectRatio: "aspect-square", 
      size: "1080×1080", 
      icon: <Square size={16} strokeWidth={1.5} /> 
    },
    { 
      id: "portrait", 
      name: "عمودي (4:5)", 
      aspectRatio: "aspect-4/5", 
      size: "1080×1350", 
      icon: <AlignVerticalJustifyCenter size={16} strokeWidth={1.5} /> 
    },
    { 
      id: "story", 
      name: "قصة (9:16)", 
      aspectRatio: "aspect-9/16", 
      size: "1080×1920", 
      icon: <LayoutPanelTop size={16} strokeWidth={1.5} /> 
    },
    { 
      id: "reels", 
      name: "ريلز (9:16)", 
      aspectRatio: "aspect-9/16", 
      size: "1080×1920", 
      icon: <TrendingUp size={16} strokeWidth={1.5} /> 
    },
  ],
  facebook: [
    { 
      id: "square", 
      name: "مربع (1:1)", 
      aspectRatio: "aspect-square", 
      size: "1080×1080", 
      icon: <Square size={16} strokeWidth={1.5} /> 
    },
    { 
      id: "landscape", 
      name: "أفقي (16:9)", 
      aspectRatio: "aspect-video", 
      size: "1280×720", 
      icon: <LayoutTemplate size={16} strokeWidth={1.5} /> 
    },
    { 
      id: "wide", 
      name: "عريض (2:1)", 
      aspectRatio: "aspect-2/1", 
      size: "1200×600", 
      icon: <LayoutTemplate size={16} strokeWidth={1.5} /> 
    },
  ],
  pinterest: [
    { 
      id: "standard", 
      name: "قياسي (2:3)", 
      aspectRatio: "aspect-2/3", 
      size: "1000×1500", 
      icon: <AlignVerticalJustifyCenter size={16} strokeWidth={1.5} /> 
    },
    { 
      id: "square", 
      name: "مربع (1:1)", 
      aspectRatio: "aspect-square", 
      size: "1000×1000", 
      icon: <Square size={16} strokeWidth={1.5} /> 
    },
    { 
      id: "video", 
      name: "فيديو (1:1)", 
      aspectRatio: "aspect-square", 
      size: "1000×1000", 
      icon: <TrendingUp size={16} strokeWidth={1.5} /> 
    },
  ],
  custom: [
    { 
      id: "custom", 
      name: "مخصص", 
      aspectRatio: "custom", 
      size: "مخصص", 
      icon: <Settings size={16} strokeWidth={1.5} /> 
    },
  ]
};

