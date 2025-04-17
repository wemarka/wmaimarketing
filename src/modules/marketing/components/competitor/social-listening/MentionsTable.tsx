
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
import { ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Mention {
  id: string;
  author: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  content: string;
  platform: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  reach: number;
  engagement: number;
}

const mentions: Mention[] = [
  {
    id: 'm1',
    author: {
      name: 'سارة أحمد',
      avatar: '/avatar1.png',
      verified: true,
    },
    content: 'أنا أحب منتجات العناية بالبشرة من شركة الجمال الأولى. إنها رائعة حقاً!',
    platform: 'Instagram',
    date: '2025-04-15',
    sentiment: 'positive',
    reach: 15000,
    engagement: 430,
  },
  {
    id: 'm2',
    author: {
      name: 'فهد السالم',
      avatar: '/avatar2.png',
    },
    content: 'جربت منتجات شركة الجمال الأولى ومستحضرات التجميل الطبيعية، كلاهما جيد.',
    platform: 'Twitter',
    date: '2025-04-14',
    sentiment: 'neutral',
    reach: 5200,
    engagement: 120,
  },
  {
    id: 'm3',
    author: {
      name: 'نورة محمد',
      avatar: '/avatar3.png',
      verified: true,
    },
    content: 'للأسف، منتجات شركة الجمال الأولى لم تناسب بشرتي وسببت لي حساسية.',
    platform: 'Facebook',
    date: '2025-04-12',
    sentiment: 'negative',
    reach: 8500,
    engagement: 280,
  },
  {
    id: 'm4',
    author: {
      name: 'عمر خالد',
      avatar: '/avatar4.png',
    },
    content: 'أنا سعيد جداً بنتائج المنتجات الطبيعية من شركة الجمال الأولى!',
    platform: 'Instagram',
    date: '2025-04-10',
    sentiment: 'positive',
    reach: 12000,
    engagement: 350,
  },
];

interface MentionsTableProps {
  sentiment: 'all' | 'positive' | 'neutral' | 'negative';
}

const MentionsTable = ({ sentiment }: MentionsTableProps) => {
  const filteredMentions = sentiment === 'all'
    ? mentions
    : mentions.filter(mention => mention.sentiment === sentiment);
  
  const getSentimentBadge = (sentimentValue: string) => {
    switch (sentimentValue) {
      case 'positive':
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">إيجابي</Badge>;
      case 'neutral':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50">محايد</Badge>;
      case 'negative':
        return <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">سلبي</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>المستخدم</TableHead>
            <TableHead>المحتوى</TableHead>
            <TableHead>المنصة</TableHead>
            <TableHead>المشاعر</TableHead>
            <TableHead>الوصول</TableHead>
            <TableHead>التفاعل</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMentions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                لا توجد بيانات لعرضها
              </TableCell>
            </TableRow>
          ) : (
            filteredMentions.map((mention) => (
              <TableRow key={mention.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mention.author.avatar} />
                      <AvatarFallback>{mention.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{mention.author.name}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="truncate">{mention.content}</div>
                </TableCell>
                <TableCell>{mention.platform}</TableCell>
                <TableCell>{getSentimentBadge(mention.sentiment)}</TableCell>
                <TableCell>{mention.reach.toLocaleString()}</TableCell>
                <TableCell>{mention.engagement.toLocaleString()}</TableCell>
                <TableCell>{new Date(mention.date).toLocaleDateString('ar-SA')}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MentionsTable;
