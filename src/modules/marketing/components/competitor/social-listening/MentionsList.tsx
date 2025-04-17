
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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Search, ExternalLink, MessageSquare } from "lucide-react";

const mentionsData = [
  {
    id: '1',
    author: 'سارة أحمد',
    handle: '@sarah_beauty',
    platform: 'انستجرام',
    content: 'جربت منتج العناية بالبشرة الجديد من شركة المنافس وكانت النتائج مذهلة! أنصح به بشدة #عناية_بالبشرة',
    date: '2023-12-15',
    engagement: 156,
    sentiment: 'إيجابي',
    avatar: 'https://i.pravatar.cc/150?img=29'
  },
  {
    id: '2',
    author: 'أحمد الشمري',
    handle: '@ahmed_reviews',
    platform: 'تويتر',
    content: 'الشركة المنافسة أطلقت حملة إعلانية جديدة لمستحضرات التجميل، تصميم الإعلان جذاب لكن الأسعار مرتفعة',
    date: '2023-12-10',
    engagement: 87,
    sentiment: 'محايد',
    avatar: 'https://i.pravatar.cc/150?img=52'
  },
  {
    id: '3',
    author: 'نورة العتيبي',
    handle: '@noora_beauty',
    platform: 'تيك توك',
    content: 'مقارنة بين منتجات العناية بالبشرة من شركتنا والشركة المنافسة، فرق كبير في الجودة! منتجاتنا أفضل بكثير',
    date: '2023-12-05',
    engagement: 432,
    sentiment: 'إيجابي',
    avatar: 'https://i.pravatar.cc/150?img=44'
  },
  {
    id: '4',
    author: 'فيصل الدوسري',
    handle: '@faisal_tech',
    platform: 'يوتيوب',
    content: 'مراجعة شاملة لمنتج الشركة المنافسة الجديد. للأسف لم يلبي التوقعات وتسبب في حساسية للبشرة',
    date: '2023-12-01',
    engagement: 215,
    sentiment: 'سلبي',
    avatar: 'https://i.pravatar.cc/150?img=65'
  },
  {
    id: '5',
    author: 'ليلى المطيري',
    handle: '@laila_style',
    platform: 'انستجرام',
    content: 'شاهدت إعلان الشركة المنافسة الجديد، الألوان جذابة والرسالة واضحة. تسويق ممتاز!',
    date: '2023-11-28',
    engagement: 189,
    sentiment: 'إيجابي',
    avatar: 'https://i.pravatar.cc/150?img=47'
  }
];

const MentionsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredMentions = mentionsData
    .filter(mention => 
      mention.content.includes(searchTerm) || 
      mention.author.includes(searchTerm) ||
      mention.handle.includes(searchTerm)
    )
    .filter(mention => filter === "all" ? true : mention.sentiment === filter);
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في المحادثات..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
        </div>
        
        {filteredMentions.map((mention) => (
          <div key={mention.id} className="mb-4 border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src={mention.avatar} alt={mention.author} />
                  <AvatarFallback>{mention.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{mention.author}</p>
                    <p className="text-xs text-muted-foreground">{mention.handle}</p>
                    <Badge variant="outline" className="text-xs">{mention.platform}</Badge>
                  </div>
                  <p className="text-sm py-2">{mention.content}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>{new Date(mention.date).toLocaleDateString('ar-SA')}</span>
                    <span>{mention.engagement} تفاعل</span>
                    <Badge 
                      variant="outline" 
                      className={
                        mention.sentiment === 'إيجابي' ? 'bg-green-100 text-green-800' :
                        mention.sentiment === 'محايد' ? 'bg-amber-100 text-amber-800' : 
                        'bg-red-100 text-red-800'
                      }
                    >
                      {mention.sentiment}
                    </Badge>
                  </div>
                </div>
              </div>
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
                    <ExternalLink className="h-4 w-4 mr-2" />
                    عرض المنشور الأصلي
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    الرد
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
        
        {filteredMentions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد محادثات مطابقة</p>
          </div>
        )}
        
        {filteredMentions.length > 0 && (
          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm">
              عرض المزيد
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MentionsList;
