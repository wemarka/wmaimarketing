
import React from "react";
import { Instagram, Facebook, Music2 } from "lucide-react";

export const platforms = {
  instagram: {
    icon: <Instagram className="h-4 w-4" />,
    label: "Instagram",
  },
  facebook: {
    icon: <Facebook className="h-4 w-4" />,
    label: "Facebook", 
  },
  tiktok: {
    icon: <Music2 className="h-4 w-4" />,
    label: "TikTok", 
  },
};

export const platformColors = {
  instagram: "bg-pink-100 text-pink-600",
  facebook: "bg-blue-100 text-blue-600",
  tiktok: "bg-slate-100 text-slate-600",
};
