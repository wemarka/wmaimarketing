
import React from "react";
import { CardContent } from "@/components/ui/card";
import { Instagram, Facebook, MessageSquare, Layers, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScheduledPost } from "./types";
import { useTranslation } from "react-i18next";

interface ScheduledPostsProps {
  posts: ScheduledPost[];
}

const ScheduledPosts: React.FC<ScheduledPostsProps> = ({ posts }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  // Platform icons mapping
  const platformIcons = {
    instagram: <Instagram className="h-4 w-4" />,
    facebook: <Facebook className="h-4 w-4" />,
    tiktok: <MessageSquare className="h-4 w-4" />,
  };

  // Platform colors mapping
  const platformColors = {
    instagram: "bg-pink-100 text-pink-600",
    facebook: "bg-blue-100 text-blue-600",
    tiktok: "bg-slate-100 text-slate-600",
  };

  return (
    <CardContent className="p-6">
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
            <div className="bg-muted rounded-md h-16 w-16 flex items-center justify-center shrink-0">
              <Layers className="h-6 w-6 text-muted-foreground" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className={`rounded-full p-1 ${platformColors[post.platform as keyof typeof platformColors]}`}>
                  {platformIcons[post.platform as keyof typeof platformIcons]}
                </div>
                <p className="text-sm text-muted-foreground capitalize">{t(`scheduler.platforms.${post.platform}`, post.platform)}</p>
              </div>
              <h3 className="font-medium mt-1">{post.title}</h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span>
                  {post.date} • {post.time}
                </span>
                <span className="capitalize text-xs bg-muted px-2 py-0.5 rounded-full">
                  {t(`scheduler.postTypes.${post.type}`, post.type)}
                </span>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" aria-label={t("common.more", "More options")}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </CardContent>
  );
};

export default ScheduledPosts;
