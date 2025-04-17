
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, MessageSquare, ThumbsUp, Share2, Image, Video } from 'lucide-react';

interface ContentPost {
  id: string;
  competitor: {
    id: string;
    name: string;
    logo?: string;
  };
  type: 'post' | 'image' | 'video';
  title: string;
  content: string;
  thumbnail?: string;
  likes: number;
  comments: number;
  shares: number;
  date: string;
  platform: string;
}

// بيانات وهمية للعرض
const samplePosts: ContentPost[] = [
  {
    id: '1',
    competitor: { id: 'comp1', name: 'شركة الجمال الأولى', logo: '/logo1.png' },
    type: 'post',
    title: 'إطلاق منتجنا الجديد للعناية بالبشرة',
    content: 'نحن متحمسون للإعلان عن إطلاق مجموعتنا الجديدة للعناية بالبشرة المصنوعة من مكونات طبيعية بنسبة 100%...',
    likes: 250,
    comments: 45,
    shares: 30,
    date: '2025-04-10',
    platform: 'Facebook'
  },
  {
    id: '2',
    competitor: { id: 'comp2', name: 'مستحضرات التجميل الطبيعية', logo: '/logo2.png' },
    type: 'image',
    title: 'حصرياً: أحدث تشكيلة ألوان',
    content: 'تشكيلة ألوان الصيف الجديدة متوفرة الآن. تأتي بـ 12 لون جذاب يناسب جميع البشرات...',
    thumbnail: '/product-image.jpg',
    likes: 520,
    comments: 78,
    shares: 112,
    date: '2025-04-08',
    platform: 'Instagram'
  },
  {
    id: '3',
    competitor: { id: 'comp3', name: 'بيوتي ماركت', logo: '/logo3.png' },
    type: 'video',
    title: 'كيف تختارين أحمر الشفاه المناسب',
    content: 'في هذا الفيديو، خبيرة التجميل سارة تشرح كيفية اختيار أحمر الشفاه المناسب للون بشرتك...',
    thumbnail: '/video-thumbnail.jpg',
    likes: 1200,
    comments: 210,
    shares: 340,
    date: '2025-04-05',
    platform: 'YouTube'
  },
];

interface ContentPostsListProps {
  contentType: 'all' | 'posts' | 'images' | 'videos';
  searchQuery: string;
}

const ContentPostsList = ({ contentType, searchQuery }: ContentPostsListProps) => {
  const filteredPosts = samplePosts.filter(post => {
    // Filter by content type
    if (contentType !== 'all') {
      if (contentType === 'posts' && post.type !== 'post') return false;
      if (contentType === 'images' && post.type !== 'image') return false;
      if (contentType === 'videos' && post.type !== 'video') return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.competitor.name.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'image':
        return <Image className="h-4 w-4 text-purple-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-4">
      {filteredPosts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          لم يتم العثور على محتوى يطابق معايير البحث
        </div>
      ) : (
        filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.competitor.logo} />
                      <AvatarFallback>{post.competitor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{post.competitor.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>{post.platform}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString('ar-SA')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-muted rounded-full px-2 py-1">
                    {getTypeIcon(post.type)}
                    <span className="text-xs">{post.type === 'post' ? 'منشور' : post.type === 'image' ? 'صورة' : 'فيديو'}</span>
                  </div>
                </div>
                
                <h3 className="font-medium mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{post.content}</p>
                
                {post.thumbnail && (
                  <div className="relative rounded-md overflow-hidden mb-3 h-48 bg-muted">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                    {post.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[16px] border-l-primary ml-1"></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    <span>{post.shares}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ContentPostsList;
