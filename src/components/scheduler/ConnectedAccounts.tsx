
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Check, X, ExternalLink } from "lucide-react";
import { platforms, platformColors } from "@/modules/content-creator/utils/platformIcons";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// تعريف أنواع البيانات
interface SocialAccount {
  id: string;
  name: string;
  platform: string;
  status: 'connected' | 'pending' | 'disconnected';
  followers?: number;
}

const ConnectedAccounts = () => {
  // حالات للتحكم في واجهة المستخدم
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [accountName, setAccountName] = useState("");

  // بيانات الحسابات المتصلة (يمكن استبدالها بطلب API حقيقي)
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    { id: "1", name: "Beauty Brand", platform: "instagram", status: "connected", followers: 12500 },
    { id: "2", name: "Beauty Official", platform: "facebook", status: "connected", followers: 8700 },
    { id: "3", name: "Beauty Trends", platform: "tiktok", status: "connected", followers: 15200 },
    { id: "4", name: "Beauty Tips", platform: "pinterest", status: "connected", followers: 5400 },
  ]);

  // وظيفة لفتح مربع حوار إضافة حساب جديد
  const openNewAccountDialog = () => {
    setSelectedPlatform(null);
    setAccountName("");
    setIsDialogOpen(true);
  };

  // وظيفة لاختيار منصة
  const selectPlatform = (platform: string) => {
    setSelectedPlatform(platform);
  };

  // وظيفة لإضافة حساب جديد
  const addNewAccount = () => {
    if (!selectedPlatform || !accountName.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى اختيار منصة وإدخال اسم الحساب",
        variant: "destructive",
      });
      return;
    }

    // إنشاء حساب جديد وإضافته للمصفوفة
    const newAccount: SocialAccount = {
      id: Date.now().toString(),
      name: accountName,
      platform: selectedPlatform,
      status: "connected",
      followers: Math.floor(Math.random() * 5000) + 1000, // عدد متابعين عشوائي للعرض
    };

    setAccounts([...accounts, newAccount]);
    setIsDialogOpen(false);
    
    toast({
      title: "تم الإضافة بنجاح",
      description: `تم ربط الحساب "${accountName}" على منصة ${platforms[selectedPlatform as keyof typeof platforms].label}`,
    });
  };

  // وظيفة لإلغاء ربط حساب
  const disconnectAccount = (id: string) => {
    setAccounts(accounts.map(account => 
      account.id === id 
        ? { ...account, status: "disconnected" as const } 
        : account
    ));

    toast({
      title: "تم إلغاء الربط",
      description: "تم إلغاء ربط الحساب بنجاح",
    });
  };

  // تنظيم المنصات في مجموعات للعرض
  const platformGroups = {
    popular: ["instagram", "facebook", "tiktok", "twitter"],
    other: ["linkedin", "youtube", "pinterest"]
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">الحسابات المتصلة</h3>
          <Badge variant="outline" className="ml-2">{accounts.filter(a => a.status === "connected").length}</Badge>
        </div>
        
        <div className="space-y-3">
          {accounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between border rounded-md p-3 transition-all hover:shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2 ${platformColors[account.platform as keyof typeof platformColors]}`}>
                  {platforms[account.platform as keyof typeof platforms].icon}
                </div>
                <div>
                  <p className="font-medium">{account.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground capitalize">{platforms[account.platform as keyof typeof platforms].label}</p>
                    {account.followers && (
                      <p className="text-xs text-muted-foreground">
                        {account.followers.toLocaleString()} متابع
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {account.status === "connected" ? (
                  <>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                      <Check className="h-3 w-3" /> متصل
                    </span>
                    <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => disconnectAccount(account.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : account.status === "disconnected" ? (
                  <Button variant="outline" size="sm">
                    إعادة الاتصال
                  </Button>
                ) : (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    معلق
                  </span>
                )}
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full" onClick={openNewAccountDialog}>
            <Plus className="h-4 w-4 mr-2" />
            ربط حساب جديد
          </Button>
        </div>

        {/* مربع حوار إضافة حساب جديد */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>ربط حساب اجتماعي جديد</DialogTitle>
              <DialogDescription>
                اختر المنصة وأدخل اسم الحساب للربط مع منصتك
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>اختر المنصة</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <h4 className="text-sm font-medium text-muted-foreground col-span-full">المنصات الشائعة</h4>
                  {platformGroups.popular.map((platform) => (
                    <Button
                      key={platform}
                      type="button"
                      variant={selectedPlatform === platform ? "default" : "outline"}
                      className="h-20 flex flex-col items-center justify-center gap-2"
                      onClick={() => selectPlatform(platform)}
                    >
                      <div className={`rounded-full p-2 ${selectedPlatform === platform ? "bg-white" : platformColors[platform as keyof typeof platformColors]}`}>
                        {React.cloneElement(platforms[platform as keyof typeof platforms].icon as React.ReactElement, {
                          className: `h-5 w-5 ${selectedPlatform === platform ? "text-primary-foreground" : ""}`
                        })}
                      </div>
                      <span className="text-xs">{platforms[platform as keyof typeof platforms].label}</span>
                    </Button>
                  ))}
                  
                  <h4 className="text-sm font-medium text-muted-foreground col-span-full mt-3">منصات أخرى</h4>
                  {platformGroups.other.map((platform) => (
                    <Button
                      key={platform}
                      type="button"
                      variant={selectedPlatform === platform ? "default" : "outline"}
                      className="h-20 flex flex-col items-center justify-center gap-2"
                      onClick={() => selectPlatform(platform)}
                    >
                      <div className={`rounded-full p-2 ${selectedPlatform === platform ? "bg-white" : platformColors[platform as keyof typeof platformColors]}`}>
                        {React.cloneElement(platforms[platform as keyof typeof platforms].icon as React.ReactElement, {
                          className: `h-5 w-5 ${selectedPlatform === platform ? "text-primary-foreground" : ""}`
                        })}
                      </div>
                      <span className="text-xs">{platforms[platform as keyof typeof platforms].label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountName">اسم الحساب</Label>
                <Input
                  id="accountName"
                  placeholder="أدخل اسم الحساب"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>إلغاء</Button>
              <Button onClick={addNewAccount} disabled={!selectedPlatform || !accountName.trim()}>
                ربط الحساب
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ConnectedAccounts;
