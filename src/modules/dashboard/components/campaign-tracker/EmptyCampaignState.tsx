
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Target } from 'lucide-react';

interface EmptyCampaignStateProps {
  filter: 'all' | 'active' | 'completed' | 'planned';
}

const EmptyCampaignState: React.FC<EmptyCampaignStateProps> = ({ filter }) => {
  const getMessage = () => {
    switch (filter) {
      case 'active':
        return 'لا توجد حملات نشطة حاليًا. يمكنك إنشاء حملة جديدة أو تفعيل حملة مخططة.';
      case 'planned':
        return 'لا توجد حملات مخططة حاليًا. يمكنك إنشاء حملة جديدة للتخطيط المستقبلي.';
      case 'completed':
        return 'لا توجد حملات مكتملة حتى الآن. ستظهر الحملات هنا بمجرد اكتمالها.';
      default:
        return 'لا توجد حملات متاحة. أنشئ حملتك الأولى الآن وابدأ في تتبع أدائها.';
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="p-4 bg-muted/30 rounded-full border mb-4">
        <Target className="h-10 w-10 text-muted-foreground/70" />
      </div>
      <h3 className="text-xl font-medium mb-2">لا توجد حملات</h3>
      <p className="text-muted-foreground text-sm max-w-md mb-6">{getMessage()}</p>
      <Button className="gap-1">
        <PlusCircle className="h-4 w-4" />
        <span>إنشاء حملة جديدة</span>
      </Button>
    </div>
  );
};

export default EmptyCampaignState;
