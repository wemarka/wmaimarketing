
import React from 'react';
import { Badge } from "@/components/ui/badge";

export interface UpcomingPostItemProps {
  title: string;
  platform: string;
  date: string;
  time: string;
}

const UpcomingPostItem = ({ title, platform, date, time }: UpcomingPostItemProps) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'instagram': return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500 flex items-center justify-center text-white font-bold">In</div>;
      case 'facebook': return <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">Fb</div>;
      case 'twitter': return <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">Tw</div>;
      case 'tiktok': return <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold">Tk</div>;
      default: return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA');
  };
  
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border">
      {getPlatformIcon()}
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-muted-foreground">{formatDate(date)} - {time}</span>
          <Badge variant="outline" className="text-beauty-purple border-beauty-purple/30">مجدول</Badge>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPostItem;
