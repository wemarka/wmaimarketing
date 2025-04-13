
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Video, Music, RotateCw, PlaySquare, Download, ImageIcon, Paintbrush } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ImageToVideoConverter from "@/components/content/ImageToVideoConverter";

const VideoGenerator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"from-scratch" | "from-image">("from-scratch");
  const [loading, setLoading] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [duration, setDuration] = useState([15]);
  const [style, setStyle] = useState("glamour");

  const handleGenerate = () => {
    setLoading(true);
    
    // Simulate video generation
    setTimeout(() => {
      setLoading(false);
      setVideoGenerated(true);
      
      toast({
        title: "Video Generated",
        description: "Your marketing video is ready to preview and download!",
      });
    }, 4000);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">منشئ الفيديوهات بالذكاء الاصطناعي</h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          أنشئ فيديوهات تسويقية مذهلة باستخدام الذكاء الاصطناعي. يمكنك إنشاء فيديو من الصفر أو تحويل صورة إلى فيديو مع خيارات تخصيص متقدمة.
        </p>
        
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "from-scratch" | "from-image")}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-2 max-w-md mb-6">
            <TabsTrigger value="from-scratch" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>إنشاء فيديو جديد</span>
            </TabsTrigger>
            <TabsTrigger value="from-image" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>تحويل صورة إلى فيديو</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="from-scratch">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-medium mb-6">إعدادات الفيديو</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="block text-sm font-medium">المدة</label>
                          <span className="text-sm text-muted-foreground">{duration[0]} ثانية</span>
                        </div>
                        <Slider
                          value={duration}
                          min={10}
                          max={30}
                          step={5}
                          onValueChange={setDuration}
                          className="my-2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">الأسلوب</label>
                        <Select value={style} onValueChange={setStyle}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الأسلوب" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="glamour">فخامة ورقي</SelectItem>
                            <SelectItem value="natural">طبيعي وأصيل</SelectItem>
                            <SelectItem value="vibrant">نابض بالحياة وملون</SelectItem>
                            <SelectItem value="minimal">بسيط</SelectItem>
                            <SelectItem value="tutorial">أسلوب تعليمي</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">نوع الموسيقى</label>
                        <Select defaultValue="upbeat">
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الموسيقى" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="upbeat">نشيطة وحيوية</SelectItem>
                            <SelectItem value="soft">ناعمة وهادئة</SelectItem>
                            <SelectItem value="luxury">فاخرة وأنيقة</SelectItem>
                            <SelectItem value="trending">رائجة</SelectItem>
                            <SelectItem value="none">بدون موسيقى</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">نص العنوان</label>
                        <Input placeholder="جديد: أحمر شفاه روبي صنرايز" dir="rtl" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">نص إضافي</label>
                        <Textarea placeholder="متوفر الآن | خصم 15٪ بكود RUBY15" dir="rtl" />
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={handleGenerate}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <RotateCw className="h-4 w-4 ml-2 animate-spin" />
                            جاري إنشاء الفيديو...
                          </>
                        ) : (
                          <>
                            <Video className="h-4 w-4 ml-2" />
                            إنشاء الفيديو
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-medium mb-6">معاينة</h2>
                    
                    {loading ? (
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="h-10 w-10 mb-4 animate-spin mx-auto text-beauty-purple" />
                          <p className="text-muted-foreground">جاري إنشاء الفيديو الخاص بك...</p>
                          <p className="text-xs text-muted-foreground mt-1">قد تستغرق العملية بضع لحظات</p>
                        </div>
                      </div>
                    ) : videoGenerated ? (
                      <div className="space-y-4">
                        <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-beauty-lightpurple/80 text-white p-2 rounded-lg">
                              <PlaySquare className="h-12 w-12" />
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                            <h3 className="text-xl font-bold mb-1">جديد: أحمر شفاه روبي صنرايز</h3>
                            <p className="text-sm">متوفر الآن | خصم 15٪ بكود RUBY15</p>
                          </div>
                          
                          <img 
                            src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop" 
                            alt="معاينة الفيديو" 
                            className="w-full h-full object-cover opacity-60"
                          />
                        </div>
                        
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">فيديو روبي صنرايز</h3>
                            <p className="text-sm text-muted-foreground">{duration[0]} ثانية • أسلوب {style === "glamour" ? "فاخر" : style === "natural" ? "طبيعي" : style === "vibrant" ? "نابض بالحياة" : style === "minimal" ? "بسيط" : "تعليمي"}</p>
                          </div>
                          <Button>
                            <Download className="h-4 w-4 ml-2" />
                            تحميل
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
                        <Video className="h-16 w-16 mb-4 text-muted-foreground/50" />
                        <p className="text-muted-foreground">ضبط الإعدادات وإنشاء فيديو</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {videoGenerated && (
                  <Card className="mt-4">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-medium mb-4">اختيار الموسيقى</h2>
                      
                      <div className="space-y-3">
                        {["موسيقى نشيطة", "عزف بيانو أنيق", "إيقاعات عصرية"].map((track, index) => (
                          <div key={index} className="flex items-center justify-between border rounded-md p-3">
                            <div className="flex items-center gap-3">
                              <div className="bg-muted rounded-full p-2">
                                <Music className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{track}</p>
                                <p className="text-xs text-muted-foreground">مناسبة تماماً لأسلوب {style === "glamour" ? "فاخر" : style === "natural" ? "طبيعي" : style === "vibrant" ? "نابض بالحياة" : style === "minimal" ? "بسيط" : "تعليمي"}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              استماع
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="from-image">
            <ImageToVideoConverter />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VideoGenerator;
