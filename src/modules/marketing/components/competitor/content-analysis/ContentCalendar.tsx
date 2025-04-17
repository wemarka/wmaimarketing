
import React, { useState } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  format,
  addMonths,
  subMonths
} from 'date-fns';
import { ar } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  MessageSquare,
  MessageCircle,
  Image,
  Video
} from "lucide-react";

const postEventsData = [
  { date: '2023-12-01', platform: 'instagram', type: 'image', count: 2 },
  { date: '2023-12-01', platform: 'facebook', type: 'text', count: 1 },
  { date: '2023-12-03', platform: 'twitter', type: 'text', count: 3 },
  { date: '2023-12-05', platform: 'instagram', type: 'video', count: 1 },
  { date: '2023-12-07', platform: 'tiktok', type: 'video', count: 2 },
  { date: '2023-12-08', platform: 'facebook', type: 'image', count: 1 },
  { date: '2023-12-10', platform: 'instagram', type: 'image', count: 1 },
  { date: '2023-12-10', platform: 'twitter', type: 'text', count: 2 },
  { date: '2023-12-12', platform: 'facebook', type: 'text', count: 1 },
  { date: '2023-12-15', platform: 'instagram', type: 'carousel', count: 1 },
  { date: '2023-12-16', platform: 'tiktok', type: 'video', count: 1 },
  { date: '2023-12-18', platform: 'twitter', type: 'text', count: 2 },
  { date: '2023-12-20', platform: 'instagram', type: 'image', count: 2 },
  { date: '2023-12-22', platform: 'facebook', type: 'video', count: 1 },
  { date: '2023-12-25', platform: 'instagram', type: 'image', count: 1 },
  { date: '2023-12-28', platform: 'tiktok', type: 'video', count: 1 },
  { date: '2023-12-30', platform: 'instagram', type: 'carousel', count: 1 },
  { date: '2023-12-31', platform: 'twitter', type: 'text', count: 3 },
];

const ContentCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="h-3 w-3" />;
      case 'facebook': return <Facebook className="h-3 w-3" />;
      case 'twitter': return <Twitter className="h-3 w-3" />;
      case 'tiktok': return <MessageCircle className="h-3 w-3" />;
      default: return <MessageSquare className="h-3 w-3" />;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-3 w-3" />;
      case 'video': return <Video className="h-3 w-3" />;
      default: return null;
    }
  };
  
  const formatDay = (day: Date) => {
    return format(day, 'd', { locale: ar });
  };
  
  const getPostsForDay = (day: Date) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    return postEventsData.filter(event => event.date === formattedDate);
  };
  
  const isOutsideCurrentMonth = (day: Date) => {
    return day < monthStart || day > monthEnd;
  };

  const isToday = (day: Date) => {
    return format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy', { locale: ar })}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((day, i) => (
          <div key={i} className="text-center p-2 text-sm font-medium">
            {day}
          </div>
        ))}
        
        {days.map((day, i) => {
          const posts = getPostsForDay(day);
          const totalPosts = posts.reduce((acc, post) => acc + post.count, 0);
          
          return (
            <Card 
              key={i} 
              className={`min-h-20 p-2 ${
                isOutsideCurrentMonth(day) 
                ? 'bg-muted/50 text-muted-foreground' 
                : 'bg-card'
              } ${isToday(day) ? 'ring-2 ring-primary' : ''}`}
            >
              <div className="text-right text-sm font-medium mb-1">
                {formatDay(day)}
              </div>
              {posts.length > 0 ? (
                <div className="space-y-1">
                  {posts.map((post, j) => (
                    <div key={j} className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        {getPlatformIcon(post.platform)}
                        {getTypeIcon(post.type)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {post.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-5" />
              )}
              {totalPosts > 0 && (
                <div className="mt-1 text-xs text-center">
                  {totalPosts} منشور
                </div>
              )}
            </Card>
          );
        })}
      </div>
      
      <div className="flex gap-3 justify-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
          <span className="text-xs">انستجرام</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-xs">فيسبوك</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
          <span className="text-xs">تويتر</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
          <span className="text-xs">تيك توك</span>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;
