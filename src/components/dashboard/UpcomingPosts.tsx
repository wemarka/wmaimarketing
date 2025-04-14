
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Instagram, Facebook, CalendarCheck, Clock, Users, Eye, TikTok } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const platforms = {
  instagram: {
    icon: <Instagram className="h-4 w-4" />,
    color: "bg-pink-100 text-pink-600",
    label: "انستجرام"
  },
  facebook: {
    icon: <Facebook className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-600",
    label: "فيسبوك"
  },
  tiktok: {
    icon: <TikTok className="h-4 w-4" />,
    color: "bg-slate-100 text-slate-600",
    label: "تيك توك"
  }
};

// More realistic upcoming posts with Arabic content
const posts = [
  {
    id: 1,
    title: "مجموعة مكياج الصيف الجديدة",
    platform: "instagram",
    date: "غداً، 10:00 صباحاً",
    audienceSize: "15.2K",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "ألوان أحمر الشفاه الجديدة",
    platform: "facebook",
    date: "غداً، 2:30 مساءً",
    audienceSize: "8.7K",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "فيديو عن روتين العناية بالبشرة",
    platform: "tiktok",
    date: "15 أبريل، 9:00 صباحاً",
    audienceSize: "12.4K",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "إطلاق مجموعة العطور الجديدة",
    platform: "instagram",
    date: "16 أبريل، 11:30 صباحاً",
    audienceSize: "14.9K",
    image: "/placeholder.svg"
  },
];

const UpcomingPosts = () => {
  const navigate = useNavigate();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">المنشورات القادمة</CardTitle>
          <CardDescription>
            {posts.length} منشور مجدول للأيام القادمة
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/scheduler')}
          className="text-xs"
        >
          عرض الجدول
        </Button>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div
                className="flex items-center gap-3 text-sm p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="h-12 w-12 rounded-md bg-muted overflow-hidden shrink-0">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={cn(
                      "text-xs py-0 h-5",
                      platforms[post.platform as keyof typeof platforms].color
                    )}>
                      {platforms[post.platform as keyof typeof platforms].label}
                    </Badge>
                  </div>
                  <p className="font-medium">{post.title}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.audienceSize}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingPosts;
