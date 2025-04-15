
import React from 'react';
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EmptyPostsPlaceholder = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12 border rounded-lg border-dashed">
      <div className="flex flex-col items-center">
        <CalendarCheck className="h-10 w-10 text-muted-foreground mb-3" />
        <p className="mb-2 font-medium">لا توجد منشورات مجدولة</p>
        <p className="text-sm text-muted-foreground mb-4">لم يتم جدولة أي منشورات للأيام القادمة</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/scheduler/new')}
        >
          إنشاء منشور جديد
        </Button>
      </div>
    </div>
  );
};

export default EmptyPostsPlaceholder;
