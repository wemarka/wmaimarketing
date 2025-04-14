
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Instagram, Facebook, CalendarCheck, Clock, Users, Eye, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

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
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4 w-4" style={{ fill: 'currentColor' }}>
      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
    </svg>,
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
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"list" | "compact">("list");

  const handleEdit = (id: number) => {
    toast({
      title: "تحرير المنشور",
      description: `جاري فتح المنشور رقم ${id} للتحرير`
    });
    navigate(`/scheduler/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "تم الحذف",
      description: `تم حذف المنشور رقم ${id} بنجاح`
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">المنشورات القادمة</CardTitle>
          <CardDescription>
            {posts.length} منشور مجدول للأيام القادمة
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewMode(viewMode === "list" ? "compact" : "list")}
            className="text-xs"
          >
            {viewMode === "list" ? "عرض مختصر" : "عرض مفصل"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/scheduler')}
            className="text-xs"
          >
            عرض الجدول
          </Button>
        </div>
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
                className={cn(
                  "flex items-center gap-3 text-sm p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors",
                  viewMode === "compact" ? "p-2" : "p-3"
                )}
              >
                <div className={cn(
                  "rounded-md bg-muted overflow-hidden shrink-0",
                  viewMode === "compact" ? "h-10 w-10" : "h-12 w-12"
                )}>
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
                    {viewMode !== "compact" && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                    )}
                  </div>
                  <p className={cn(
                    "font-medium",
                    viewMode === "compact" ? "text-sm truncate max-w-[200px]" : ""
                  )}>{post.title}</p>
                  {viewMode !== "compact" && (
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.audienceSize}</span>
                      </div>
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(post.id)}>
                      <Edit className="w-4 h-4 mr-2" />
                      تحرير
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-destructive focus:text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingPosts;
