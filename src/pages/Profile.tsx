
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { UserCog, Mail, User, Shield, Key } from "lucide-react";

// Define validation schema for profile form
const profileFormSchema = z.object({
  first_name: z.string().min(2, {
    message: "الاسم الأول يجب أن يحتوي على حرفين على الأقل",
  }),
  last_name: z.string().min(2, {
    message: "الاسم الأخير يجب أن يحتوي على حرفين على الأقل",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صالح",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Define validation schema for password form
const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "كلمة المرور الحالية يجب أن تحتوي على 6 أحرف على الأقل",
  }),
  newPassword: z.string().min(6, {
    message: "كلمة المرور الجديدة يجب أن تحتوي على 6 أحرف على الأقل",
  }),
  confirmPassword: z.string().min(6, {
    message: "تأكيد كلمة المرور الجديدة يجب أن تحتوي على 6 أحرف على الأقل",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "كلمة المرور الجديدة وتأكيدها يجب أن تكونا متطابقتين",
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [updating, setUpdating] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: user?.email || "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Fetch profile data
  useEffect(() => {
    const getProfile = async () => {
      if (!user) return;

      try {
        // Get profile data
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        if (profile) {
          setProfileData(profile);
          profileForm.reset({
            first_name: profile.first_name || "",
            last_name: profile.last_name || "",
            email: user.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء جلب بيانات الملف الشخصي",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user]);

  // Update profile handler
  const onUpdateProfile = async (data: ProfileFormValues) => {
    if (!user) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "تم التحديث",
        description: "تم تحديث الملف الشخصي بنجاح",
      });

      // Update local state
      if (profileData) {
        setProfileData({
          ...profileData,
          first_name: data.first_name,
          last_name: data.last_name,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الملف الشخصي",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  // Change password handler
  const onChangePassword = async (data: PasswordFormValues) => {
    setChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;

      toast({
        title: "تم تغيير كلمة المرور",
        description: "تم تغيير كلمة المرور بنجاح",
      });

      // Reset form
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تغيير كلمة المرور",
        variant: "destructive",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const getUserInitials = () => {
    if (!profileData) return "U";
    const firstName = profileData.first_name || "";
    const lastName = profileData.last_name || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || user?.email?.substring(0, 1).toUpperCase() || "U";
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-lg">جاري تحميل البيانات...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1>الملف الشخصي</h1>
          <p className="text-muted-foreground">
            إدارة حسابك ومعلوماتك الشخصية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
          {/* Profile sidebar */}
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileData?.avatar_url || ""} alt={`${profileData?.first_name || 'مستخدم'}`} />
                <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center">
                <h3 className="font-medium text-lg">{`${profileData?.first_name || ''} ${profileData?.last_name || ''}`}</h3>
                <p className="text-sm text-muted-foreground">{profileData?.role || 'مستخدم'}</p>
              </div>
            </div>
            <Separator />
            <nav className="flex flex-col space-y-1">
              <Button variant="ghost" className="justify-start">
                <User className="ml-2 h-4 w-4" />
                <span>معلومات الحساب</span>
              </Button>
              <Button variant="ghost" className="justify-start">
                <Shield className="ml-2 h-4 w-4" />
                <span>الأمان</span>
              </Button>
              <Button variant="ghost" className="justify-start">
                <UserCog className="ml-2 h-4 w-4" />
                <span>التفضيلات</span>
              </Button>
            </nav>
          </div>

          {/* Profile content */}
          <div className="space-y-6">
            <Tabs defaultValue="account" className="w-full">
              <TabsList>
                <TabsTrigger value="account">معلومات الحساب</TabsTrigger>
                <TabsTrigger value="security">الأمان</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>المعلومات الشخصية</CardTitle>
                    <CardDescription>
                      قم بتحديث معلومات الملف الشخصي الخاص بك
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...profileForm}>
                      <form
                        onSubmit={profileForm.handleSubmit(onUpdateProfile)}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={profileForm.control}
                            name="first_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>الاسم الأول</FormLabel>
                                <FormControl>
                                  <Input placeholder="الاسم الأول" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="last_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>الاسم الأخير</FormLabel>
                                <FormControl>
                                  <Input placeholder="الاسم الأخير" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>البريد الإلكتروني</FormLabel>
                              <FormControl>
                                <Input placeholder="example@domain.com" {...field} disabled />
                              </FormControl>
                              <FormDescription>
                                لا يمكن تغيير البريد الإلكتروني
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={updating}>
                          {updating ? "جاري الحفظ..." : "حفظ التغييرات"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>تغيير كلمة المرور</CardTitle>
                    <CardDescription>
                      قم بتغيير كلمة المرور الخاصة بك للحفاظ على أمان حسابك
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...passwordForm}>
                      <form
                        onSubmit={passwordForm.handleSubmit(onChangePassword)}
                        className="space-y-4"
                      >
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>كلمة المرور الحالية</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>كلمة المرور الجديدة</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>تأكيد كلمة المرور الجديدة</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button type="submit" disabled={changingPassword}>
                          {changingPassword ? "جاري التغيير..." : "تغيير كلمة المرور"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>جلسات تسجيل الدخول</CardTitle>
                    <CardDescription>
                      إدارة جلسات تسجيل الدخول النشطة على حسابك
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-muted bg-muted/40 p-4 text-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <Key className="h-4 w-4 ml-2" />
                          <span>الجلسة الحالية</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">نشطة</Badge>
                      </div>
                      <div className="text-muted-foreground">
                        <p>المتصفح: {navigator.userAgent.split(" ").slice(0, 3).join(" ")}</p>
                        <p>تاريخ آخر دخول: {new Date().toLocaleDateString("ar-SA")}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      تسجيل الخروج من جميع الجلسات الأخرى
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
