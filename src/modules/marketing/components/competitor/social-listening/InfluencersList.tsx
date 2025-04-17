
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Star, ExternalLink } from "lucide-react";

const influencersData = [
  {
    id: '1',
    name: 'سارة أحمد',
    handle: '@sarah_beauty',
    platform: 'انستجرام',
    followers: 125000,
    engagement: 4.8,
    mentions: 12,
    sentiment: 'إيجابي',
    type: 'محترف',
    avatar: 'https://i.pravatar.cc/150?img=29'
  },
  {
    id: '2',
    name: 'أحمد الشمري',
    handle: '@ahmed_reviews',
    platform: 'يوتيوب',
    followers: 250000,
    engagement: 3.2,
    mentions: 8,
    sentiment: 'محايد',
    type: 'محترف',
    avatar: 'https://i.pravatar.cc/150?img=52'
  },
  {
    id: '3',
    name: 'نورة العتيبي',
    handle: '@noora_beauty',
    platform: 'تيك توك',
    followers: 450000,
    engagement: 5.6,
    mentions: 15,
    sentiment: 'إيجابي',
    type: 'محترف',
    avatar: 'https://i.pravatar.cc/150?img=44'
  },
  {
    id: '4',
    name: 'فيصل الدوسري',
    handle: '@faisal_tech',
    platform: 'تويتر',
    followers: 85000,
    engagement: 2.9,
    mentions: 5,
    sentiment: 'إيجابي',
    type: 'عضوي',
    avatar: 'https://i.pravatar.cc/150?img=65'
  },
  {
    id: '5',
    name: 'ليلى المطيري',
    handle: '@laila_style',
    platform: 'انستجرام',
    followers: 320000,
    engagement: 4.1,
    mentions: 9,
    sentiment: 'محايد',
    type: 'محترف',
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: '6',
    name: 'خالد القحطاني',
    handle: '@khaled_vlogs',
    platform: 'يوتيوب',
    followers: 180000,
    engagement: 3.8,
    mentions: 7,
    sentiment: 'سلبي',
    type: 'عضوي',
    avatar: 'https://i.pravatar.cc/150?img=59'
  }
];

const InfluencersList = () => {
  const [filter, setFilter] = useState("all");
  
  const filteredInfluencers = filter === "all" 
    ? influencersData 
    : influencersData.filter(influencer => influencer.sentiment === filter);
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setFilter("all")}
            >
              الكل
            </Button>
            <Button 
              variant={filter === "إيجابي" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setFilter("إيجابي")}
              className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800"
            >
              إيجابي
            </Button>
            <Button 
              variant={filter === "محايد" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setFilter("محايد")}
              className="bg-amber-100 text-amber-800 hover:bg-amber-200 hover:text-amber-800"
            >
              محايد
            </Button>
            <Button 
              variant={filter === "سلبي" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setFilter("سلبي")}
              className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-800"
            >
              سلبي
            </Button>
          </div>
          <Button variant="outline" size="sm">
            عرض المزيد
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المؤثر</TableHead>
                <TableHead>المنصة</TableHead>
                <TableHead className="text-center">المتابعين</TableHead>
                <TableHead className="text-center">نسبة التفاعل</TableHead>
                <TableHead className="text-center">عدد الذكر</TableHead>
                <TableHead className="text-center">المشاعر</TableHead>
                <TableHead className="text-center">النوع</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInfluencers.map((influencer) => (
                <TableRow key={influencer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={influencer.avatar} alt={influencer.name} />
                        <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{influencer.name}</p>
                        <p className="text-xs text-muted-foreground">{influencer.handle}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{influencer.platform}</TableCell>
                  <TableCell className="text-center">
                    {(influencer.followers / 1000).toFixed(0)}K
                  </TableCell>
                  <TableCell className="text-center">
                    {influencer.engagement}%
                  </TableCell>
                  <TableCell className="text-center">
                    {influencer.mentions}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline" 
                      className={
                        influencer.sentiment === 'إيجابي' ? 'bg-green-100 text-green-800' :
                        influencer.sentiment === 'محايد' ? 'bg-amber-100 text-amber-800' : 
                        'bg-red-100 text-red-800'
                      }
                    >
                      {influencer.sentiment}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{influencer.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Star className="h-4 w-4 mr-2" />
                          إضافة للمفضلة
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          عرض الملف الشخصي
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfluencersList;
