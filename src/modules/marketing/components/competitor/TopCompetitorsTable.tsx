
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Star, StarHalf, BarChart2 } from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  logo?: string;
  website: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  category?: string;
  strength?: string;
  engagement?: number;
}

interface TopCompetitorsTableProps {
  competitors: Competitor[];
}

const TopCompetitorsTable = ({ competitors }: TopCompetitorsTableProps) => {
  const getStrengthBadge = (strength: string) => {
    switch (strength) {
      case 'high':
        return <Badge variant="default">قوي</Badge>;
      case 'medium':
        return <Badge variant="outline">متوسط</Badge>;
      case 'low':
        return <Badge variant="secondary">ضعيف</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };
  
  const getEngagementStars = (engagement: number) => {
    const fullStars = Math.floor(engagement);
    const hasHalfStar = engagement % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
        ))}
        {hasHalfStar && <StarHalf className="h-4 w-4 fill-amber-500 text-amber-500" />}
      </div>
    );
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>المنافس</TableHead>
            <TableHead>الفئة</TableHead>
            <TableHead>نقاط القوة</TableHead>
            <TableHead>التفاعل</TableHead>
            <TableHead>نسبة النمو</TableHead>
            <TableHead>إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitors.map((competitor) => (
            <TableRow key={competitor.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {competitor.logo && (
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img src={competitor.logo} alt={competitor.name} className="h-full w-full object-cover" />
                    </div>
                  )}
                  {competitor.name}
                </div>
              </TableCell>
              <TableCell>{competitor.category || 'غير مصنف'}</TableCell>
              <TableCell>{competitor.strength ? getStrengthBadge(competitor.strength) : '—'}</TableCell>
              <TableCell>
                {competitor.engagement ? getEngagementStars(competitor.engagement) : '—'}
              </TableCell>
              <TableCell className={
                competitor.trend === 'up'
                  ? 'text-green-600'
                  : competitor.trend === 'down'
                  ? 'text-red-600'
                  : ''
              }>
                {competitor.change > 0 ? '+' : ''}{competitor.change}%
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    عرض
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart2 className="h-4 w-4 mr-1" />
                    تحليل
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopCompetitorsTable;
