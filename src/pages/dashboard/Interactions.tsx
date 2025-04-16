
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MessageCircle, Heart, Repeat, Share2, ThumbsUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

// Types for our interactions data
interface InteractionItem {
  id: string;
  type: 'comment' | 'like' | 'share' | 'retweet';
  user: {
    name: string;
    avatar: string;
  };
  content?: string;
  platform: string;
  postTitle: string;
  date: string;
  icon: React.ReactNode;
  color: string;
}

const DashboardInteractions = () => {
  // Mock data for demonstration
  const interactionsData: InteractionItem[] = [
    {
      id: '1',
      type: 'comment',
      user: {
        name: 'أحمد محمد',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      content: 'محتوى رائع! استفدت كثيراً من هذه المعلومات، شكراً لكم.',
      platform: 'فيسبوك',
      postTitle: 'نصائح لتحسين نتائج البحث',
      date: 'منذ ساعتين',
      icon: <MessageCircle className="h-4 w-4" />,
      color: 'text-blue-500'
    },
    {
      id: '2',
      type: 'like',
      user: {
        name: 'سارة عبدالله',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      platform: 'إنستغرام',
      postTitle: 'أهم اتجاهات التسويق لعام 2025',
      date: 'منذ 4 ساعات',
      icon: <Heart className="h-4 w-4" />,
      color: 'text-pink-500'
    },
    {
      id: '3',
      type: 'share',
      user: {
        name: 'محمد العلي',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
      content: 'محتوى مفيد جداً يستحق المشاركة!',
      platform: 'تويتر',
      postTitle: 'دليل لتحسين تجربة المستخدم',
      date: 'منذ 6 ساعات',
      icon: <Share2 className="h-4 w-4" />,
      color: 'text-green-500'
    },
    {
      id: '4',
      type: 'retweet',
      user: {
        name: 'خالد الزهراني',
        avatar: 'https://i.pravatar.cc/150?img=12',
      },
      platform: 'تويتر',
      postTitle: 'استراتيجيات بناء العلامة التجارية',
      date: 'منذ يوم واحد',
      icon: <Repeat className="h-4 w-4" />,
      color: 'text-purple-500'
    },
    {
      id: '5',
      type: 'comment',
      user: {
        name: 'نورة السلمي',
        avatar: 'https://i.pravatar.cc/150?img=20',
      },
      content: 'هل يمكن تطبيق هذه الاستراتيجيات على الشركات الصغيرة؟',
      platform: 'لينكد إن',
      postTitle: 'استراتيجيات التسويق الرقمي',
      date: 'منذ يومين',
      icon: <MessageCircle className="h-4 w-4" />,
      color: 'text-blue-500'
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>تفاعلات الجمهور - سيركل</title>
      </Helmet>
      
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">تفاعلات الجمهور</h1>
          <p className="text-muted-foreground">متابعة تعليقات ومشاركات الجمهور مع محتوى حساباتك</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Interactions summary */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">ملخص التفاعلات</CardTitle>
                <CardDescription>آخر 30 يوم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 p-1.5 rounded-md">
                        <MessageCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-medium">التعليقات</span>
                    </div>
                    <span className="text-lg font-bold">128</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-pink-100 p-1.5 rounded-md">
                        <Heart className="h-5 w-5 text-pink-600" />
                      </div>
                      <span className="font-medium">الإعجابات</span>
                    </div>
                    <span className="text-lg font-bold">3,542</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 p-1.5 rounded-md">
                        <Share2 className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-medium">المشاركات</span>
                    </div>
                    <span className="text-lg font-bold">286</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 p-1.5 rounded-md">
                        <ThumbsUp className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="font-medium">التوصيات</span>
                    </div>
                    <span className="text-lg font-bold">48</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">المنصات المتفاعلة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">إنستغرام</span>
                    <span className="text-sm">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">فيسبوك</span>
                    <span className="text-sm">28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">تويتر</span>
                    <span className="text-sm">18%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">لينكد إن</span>
                    <span className="text-sm">12%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent interactions */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">أحدث التفاعلات</CardTitle>
                  <CardDescription>آخر التعليقات والمشاركات على منصاتك</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  عرض الكل
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interactionsData.map((item) => (
                    <motion.div 
                      key={item.id}
                      className="p-4 border rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img src={item.user.avatar} alt={item.user.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{item.user.name}</h4>
                              <div className={`flex items-center gap-1 text-xs ${item.color}`}>
                                {item.icon}
                                <span>{item.type === 'comment' ? 'علّق' : item.type === 'like' ? 'أعجب' : item.type === 'share' ? 'شارك' : 'أعاد نشر'}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              على <span className="font-medium">{item.postTitle}</span> • {item.platform}
                            </p>
                            {item.content && (
                              <p className="mt-2 text-sm">{item.content}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-2">{item.date}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">القائمة</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                            <DropdownMenuItem>عرض التفاصيل</DropdownMenuItem>
                            <DropdownMenuItem>الرد</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>عرض المنشور</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardInteractions;
