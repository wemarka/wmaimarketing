
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Image, Video, MessageSquare } from 'lucide-react';
import ContentPostsList from './content-analysis/ContentPostsList';
import KeywordAnalysisChart from './content-analysis/KeywordAnalysisChart';
import ContentEngagementChart from './content-analysis/ContentEngagementChart';

const ContentAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contentType, setContentType] = useState('all');
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>تحليل محتوى المنافسين</CardTitle>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="ابحث في محتوى المنافسين..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={contentType} onValueChange={setContentType} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>الكل</span>
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>المنشورات</span>
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-1">
                <Image className="h-4 w-4" />
                <span>الصور</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span>الفيديوهات</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <TabsContent value="all">
                  <ContentPostsList contentType="all" searchQuery={searchQuery} />
                </TabsContent>
                
                <TabsContent value="posts">
                  <ContentPostsList contentType="posts" searchQuery={searchQuery} />
                </TabsContent>
                
                <TabsContent value="images">
                  <ContentPostsList contentType="images" searchQuery={searchQuery} />
                </TabsContent>
                
                <TabsContent value="videos">
                  <ContentPostsList contentType="videos" searchQuery={searchQuery} />
                </TabsContent>
              </div>
              
              <div>
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-sm">الكلمات المفتاحية الأكثر استخدامًا</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <KeywordAnalysisChart />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">تفاعل المحتوى</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ContentEngagementChart />
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentAnalysis;
