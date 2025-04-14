
import React from "react";
import { Instagram, Facebook, Music2, Linkedin, Youtube, PinIcon, Twitter } from "lucide-react";

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
  linkedin: {
    icon: <Linkedin className="h-4 w-4" />,
    label: "LinkedIn",
  },
  youtube: {
    icon: <Youtube className="h-4 w-4" />,
    label: "YouTube",
  },
  pinterest: {
    icon: <PinIcon className="h-4 w-4" />,
    label: "Pinterest",
  },
  twitter: {
    icon: <Twitter className="h-4 w-4" />,
    label: "Twitter",
  }
};

export const platformColors = {
  instagram: "bg-pink-100 text-pink-600",
  facebook: "bg-blue-100 text-blue-600",
  tiktok: "bg-slate-100 text-slate-600",
  linkedin: "bg-blue-100 text-blue-700",
  youtube: "bg-red-100 text-red-600",
  pinterest: "bg-red-100 text-red-700",
  twitter: "bg-sky-100 text-sky-500"
};
