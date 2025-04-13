
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CalendarPost {
  id: number;
  title: string;
  date: Date;
  platform: "instagram" | "facebook" | "tiktok";
  status: "draft" | "pending" | "scheduled" | "published";
}

interface MarketingCalendarProps {
  posts?: CalendarPost[];
}

const MarketingCalendar = ({ posts = [] }: MarketingCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Function to get posts for a specific day
  const getPostsForDay = (day: Date | undefined) => {
    if (!day) return [];
    return posts.filter(post => {
      const postDate = new Date(post.date);
      return (
        postDate.getFullYear() === day.getFullYear() &&
        postDate.getMonth() === day.getMonth() &&
        postDate.getDate() === day.getDate()
      );
    });
  };

  // Get today's posts
  const selectedDayPosts = getPostsForDay(date);

  // Function to render calendar day content
  const renderDay = (day: Date, cell: React.ReactNode) => {
    const dayPosts = getPostsForDay(day);
    
    if (dayPosts.length === 0) return cell;
    
    const statusColors = {
      draft: "bg-slate-200",
      pending: "bg-amber-200",
      scheduled: "bg-blue-200",
      published: "bg-green-200",
    };
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative w-full h-full">
              {cell}
              <div className="absolute right-1 top-1 flex gap-0.5">
                {dayPosts.length <= 3 ? (
                  dayPosts.map((post) => (
                    <div 
                      key={post.id}
                      className={cn("w-1.5 h-1.5 rounded-full", statusColors[post.status])}
                    />
                  ))
                ) : (
                  <>
                    <div className={cn("w-1.5 h-1.5 rounded-full", "bg-blue-200")} />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 flex items-center justify-center text-[6px]">
                      {dayPosts.length}
                    </div>
                  </>
                )}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">{dayPosts.length} منشور</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Get status badge style
  const getStatusBadge = (status: CalendarPost["status"]) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">مسودة</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">قيد المراجعة</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">مجدول</Badge>;
      case "published":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">تم النشر</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  // Get platform badge
  const getPlatformBadge = (platform: CalendarPost["platform"]) => {
    switch (platform) {
      case "instagram":
        return <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">انستجرام</Badge>;
      case "facebook":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">فيسبوك</Badge>;
      case "tiktok":
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200">تيك توك</Badge>;
      default:
        return <Badge>غير معروف</Badge>;
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>التقويم التسويقي</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
        <div className={cn(
          "flex flex-col",
          isDesktop ? "w-1/2" : "w-full h-[320px]"
        )}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border h-full"
            classNames={{
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
            }}
            components={{
              Day: ({ day, ...props }) => (
                <button {...props}>
                  {renderDay(day, props.children)}
                </button>
              ),
            }}
          />
        </div>
        
        <div className={cn(
          "space-y-4 overflow-y-auto",
          isDesktop ? "w-1/2" : "w-full"
        )}>
          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              {date && (
                <span>منشورات {date.toLocaleDateString('ar-SA', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
              )}
              {selectedDayPosts.length > 0 && (
                <Badge variant="outline">{selectedDayPosts.length}</Badge>
              )}
            </h3>
            
            {selectedDayPosts.length === 0 ? (
              <div className="text-sm text-muted-foreground p-4 text-center border rounded-md">
                لا توجد منشورات مجدولة لهذا اليوم
              </div>
            ) : (
              <div className="space-y-2">
                {selectedDayPosts.map((post) => (
                  <div key={post.id} className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{post.title}</h4>
                      {getStatusBadge(post.status)}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {getPlatformBadge(post.platform)}
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketingCalendar;
