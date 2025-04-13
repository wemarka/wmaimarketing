
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PostPerformance as PostPerformanceType } from "../scheduler/types";

// Sample data for posts
const postData: PostPerformanceType[] = [
  {
    id: 1,
    title: "اكتشفي سر البشرة المشرقة مع سيروم فيتامين سي الجديد",
    platform: "instagram",
    date: "2025-04-10",
    impressions: 12500,
    engagement: 850,
    clicks: 320,
    conversions: 45
  },
  {
    id: 2,
    title: "استخدامات متعددة لكريم الترطيب الجديد",
    platform: "facebook",
    date: "2025-04-08",
    impressions: 8600,
    engagement: 620,
    clicks: 210,
    conversions: 32
  },
  {
    id: 3,
    title: "روتين العناية بالبشرة في 30 ثانية",
    platform: "tiktok",
    date: "2025-04-12",
    impressions: 18200,
    engagement: 1450,
    clicks: 290,
    conversions: 38
  },
  {
    id: 4,
    title: "5 خطوات للعناية بالشعر في الصيف",
    platform: "instagram",
    date: "2025-04-07",
    impressions: 10800,
    engagement: 740,
    clicks: 260,
    conversions: 35
  },
  {
    id: 5,
    title: "مسابقة: اربحي مجموعة العناية المتكاملة",
    platform: "facebook",
    date: "2025-04-05",
    impressions: 15700,
    engagement: 1820,
    clicks: 450,
    conversions: 65
  }
];

const PostPerformance: React.FC = () => {
  const [platform, setPlatform] = useState<string>("all");
  
  // Filter posts by platform
  const filteredPosts = platform === "all" 
    ? postData 
    : postData.filter(post => post.platform === platform);

  // Format numbers with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ar-SA').format(num);
  };
  
  // Calculate engagement rate
  const calculateEngagementRate = (engagement: number, impressions: number): string => {
    const rate = (engagement / impressions) * 100;
    return `${rate.toFixed(1)}%`;
  };
  
  // Get platform badge
  const getPlatformBadge = (platform: "instagram" | "facebook" | "tiktok" | "twitter") => {
    switch (platform) {
      case "instagram":
        return <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">انستجرام</Badge>;
      case "facebook":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">فيسبوك</Badge>;
      case "tiktok":
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200">تيك توك</Badge>;
      case "twitter":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">تويتر</Badge>;
      default:
        return <Badge>غير معروف</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle>أداء المنشورات</CardTitle>
          <CardDescription>تحليل أداء المنشورات حسب المنصة</CardDescription>
        </div>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر المنصة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع المنصات</SelectItem>
            <SelectItem value="instagram">انستجرام</SelectItem>
            <SelectItem value="facebook">فيسبوك</SelectItem>
            <SelectItem value="tiktok">تيك توك</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المنشور</TableHead>
              <TableHead>المنصة</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead className="text-right">المشاهدات</TableHead>
              <TableHead className="text-right">التفاعل</TableHead>
              <TableHead className="text-right">النقرات</TableHead>
              <TableHead className="text-right">التحويلات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-[250px]">
                  <div className="truncate">{post.title}</div>
                </TableCell>
                <TableCell>{getPlatformBadge(post.platform)}</TableCell>
                <TableCell>{new Date(post.date).toLocaleDateString('ar-SA')}</TableCell>
                <TableCell className="text-right">{formatNumber(post.impressions)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    {formatNumber(post.engagement)}
                    <div className="text-xs text-muted-foreground">
                      {calculateEngagementRate(post.engagement, post.impressions)}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{formatNumber(post.clicks)}</TableCell>
                <TableCell className="text-right">{formatNumber(post.conversions)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PostPerformance;
