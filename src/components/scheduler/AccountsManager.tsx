
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Instagram,
  Facebook,
  MessageSquare,
  Twitter,
  Plus,
  Link2,
  ExternalLink,
  AlertCircle,
  Check,
  Settings,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SocialAccount {
  id: string;
  platform: "instagram" | "facebook" | "tiktok" | "twitter";
  accountName: string;
  profileName: string;
  status: "connected" | "error" | "pending";
  insights?: {
    followers: number;
    engagement: number;
    postCount: number;
  };
}

interface AccountsManagerProps {
  accounts?: SocialAccount[];
}

const AccountsManager: React.FC<AccountsManagerProps> = ({
  accounts = []
}) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialAccount["platform"]>("instagram");
  
  // Platform icons mapping
  const platformIcons = {
    instagram: <Instagram className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
    tiktok: <MessageSquare className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
  };

  // Platform colors mapping
  const platformColors = {
    instagram: "bg-pink-100 text-pink-600",
    facebook: "bg-blue-100 text-blue-600",
    tiktok: "bg-slate-100 text-slate-600",
    twitter: "bg-sky-100 text-sky-600",
  };
  
  const platformNames = {
    instagram: "انستجرام",
    facebook: "فيسبوك",
    tiktok: "تيك توك",
    twitter: "تويتر",
  };

  const handleConnectAccount = () => {
    toast({
      title: "تم بدء عملية الربط",
      description: `جاري ربط حساب ${platformNames[selectedPlatform]}...`,
    });
    setAddDialogOpen(false);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>حسابات التواصل الاجتماعي</CardTitle>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                <span>ربط حساب</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ربط حساب جديد</DialogTitle>
                <DialogDescription>
                  اختر المنصة التي تريد ربط حسابك بها للبدء في جدولة ونشر المحتوى.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-3 py-4">
                {(Object.keys(platformIcons) as Array<keyof typeof platformIcons>).map((platform) => (
                  <Card 
                    key={platform}
                    className={`border cursor-pointer transition-all ${
                      selectedPlatform === platform ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedPlatform(platform)}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${platformColors[platform]}`}>
                        {platformIcons[platform]}
                      </div>
                      <div>
                        <h3 className="font-medium">{platformNames[platform]}</h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="accountName">اسم الحساب</Label>
                  <Input id="accountName" placeholder="@beauty_brand" />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleConnectAccount}>
                  <Link2 className="h-4 w-4 mr-1" />
                  ربط الحساب
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="accounts">
          <TabsList className="mb-4 grid grid-cols-2">
            <TabsTrigger value="accounts">الحسابات المرتبطة</TabsTrigger>
            <TabsTrigger value="permissions">الأذونات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts">
            {accounts.length === 0 ? (
              <div className="text-center p-6 border-2 border-dashed rounded-md">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
                  <Link2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-2">لم يتم ربط أي حسابات بعد</p>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setAddDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  ربط حساب
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {accounts.map((account) => (
                  <div key={account.id} className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          platformColors[account.platform]
                        }`}>
                          {platformIcons[account.platform]}
                        </div>
                        <div>
                          <p className="font-medium">{account.profileName}</p>
                          <p className="text-sm text-muted-foreground">{account.accountName}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {account.status === "connected" && (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            متصل
                          </Badge>
                        )}
                        {account.status === "error" && (
                          <Badge variant="outline" className="bg-red-100 text-red-800">
                            خطأ
                          </Badge>
                        )}
                        {account.status === "pending" && (
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">
                            معلّق
                          </Badge>
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>إعدادات الحساب</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <ExternalLink className="h-4 w-4 mr-1" />
                              فتح الملف الشخصي
                            </DropdownMenuItem>
                            {account.status === "error" && (
                              <DropdownMenuItem>
                                <Link2 className="h-4 w-4 mr-1" />
                                إعادة الربط
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-1" />
                              إعدادات النشر
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              <Trash2 className="h-4 w-4 mr-1" />
                              إلغاء ربط الحساب
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    {account.insights && (
                      <div className="mt-3 pt-3 border-t grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-sm font-medium">{account.insights.followers.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">متابعين</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{account.insights.engagement}%</p>
                          <p className="text-xs text-muted-foreground">تفاعل</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{account.insights.postCount}</p>
                          <p className="text-xs text-muted-foreground">منشور</p>
                        </div>
                      </div>
                    )}
                    
                    {account.status === "error" && (
                      <div className="mt-2 pt-2 border-t flex items-center text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">يرجى إعادة ربط الحساب، انتهت صلاحية الوصول</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="permissions">
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">أذونات النشر</h3>
                <p className="text-sm text-muted-foreground mb-4">قم بتحديد الأذونات المطلوبة للنشر على كل منصة.</p>
                
                <div className="space-y-3">
                  {(Object.keys(platformIcons) as Array<keyof typeof platformIcons>).map((platform) => (
                    <div key={platform} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${platformColors[platform]}`}>
                          {platformIcons[platform]}
                        </div>
                        <span className="mr-2">{platformNames[platform]}</span>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        <Check className="h-3.5 w-3.5 mr-1" />
                        ممنوح
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">تنبيهات الموافقة</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm">إرسال تنبيه عند طلب الموافقة على منشور</span>
                  <Button variant="outline" size="sm">تكوين</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AccountsManager;
