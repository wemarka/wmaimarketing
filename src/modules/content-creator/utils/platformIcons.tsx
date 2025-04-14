
import React from "react";
import { Instagram, Facebook, MessageSquare } from "lucide-react";

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
    icon: <MessageSquare className="h-4 w-4" />,
    label: "TikTok", 
  },
};
