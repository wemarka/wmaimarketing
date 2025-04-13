
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";

const Auth = () => {
  const { t, i18n } = useTranslation();
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const currentLanguage = i18n.language;
  
  const authSchema = z.object({
    email: z.string().email({
      message: currentLanguage === "ar" ? "يرجى إدخال بريد إلكتروني صالح" : "Please enter a valid email address"
    }),
    password: z.string().min(6, {
      message: currentLanguage === "ar" 
        ? "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"
        : "Password must be at least 6 characters"
    }),
    firstName: authMode === "register" ? z.string().optional() : z.string().optional(),
    lastName: authMode === "register" ? z.string().optional() : z.string().optional(),
  });

  type AuthFormValues = z.infer<typeof authSchema>;

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Reset form when switching between modes
  useEffect(() => {
    form.reset({
      email: form.getValues("email"),
      password: "",
      firstName: "",
      lastName: "",
    });
  }, [authMode, form]);

  const onSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);
    try {
      if (authMode === "login") {
        await signIn(values.email, values.password);
      } else {
        await signUp(values.email, values.password, values.firstName, values.lastName);
        setAuthMode("login");
        form.reset();
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-t-beauty-purple border-beauty-lightpurple border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">
            {currentLanguage === "ar" ? "جاري تحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  const formTitle = authMode === "login" 
    ? currentLanguage === "ar" ? "تسجيل الدخول" : "Sign In" 
    : currentLanguage === "ar" ? "إنشاء حساب" : "Create Account";

  const formDescription = authMode === "login" 
    ? currentLanguage === "ar" ? "قم بتسجيل الدخول للوصول إلى لوحة التحكم" : "Sign in to access your dashboard"
    : currentLanguage === "ar" ? "قم بإنشاء حساب جديد للوصول إلى الميزات الكاملة" : "Create a new account to access all features";

  const switchMessage = authMode === "login"
    ? currentLanguage === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"
    : currentLanguage === "ar" ? "لديك حساب بالفعل؟" : "Already have an account?";

  const switchAction = authMode === "login"
    ? currentLanguage === "ar" ? "قم بالتسجيل" : "Sign Up"
    : currentLanguage === "ar" ? "قم بتسجيل الدخول" : "Sign In";

  const submitButtonText = isLoading 
    ? currentLanguage === "ar" ? "جاري التحميل..." : "Loading..." 
    : formTitle;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-beauty-pink to-beauty-lightpurple mb-4"></div>
          <CardTitle className="text-2xl">
            {currentLanguage === "ar" ? "مرحباً بك في Beauty AI" : "Welcome to Beauty AI"}
          </CardTitle>
          <CardDescription>
            {formDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as "login" | "register")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">
                {currentLanguage === "ar" ? "تسجيل الدخول" : "Login"}
              </TabsTrigger>
              <TabsTrigger value="register">
                {currentLanguage === "ar" ? "إنشاء حساب" : "Register"}
              </TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentLanguage === "ar" ? "البريد الإلكتروني" : "Email"}</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentLanguage === "ar" ? "كلمة المرور" : "Password"}</FormLabel>
                      <FormControl>
                        <Input placeholder="******" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {authMode === "register" && (
                  <>
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {currentLanguage === "ar" ? "الاسم الأول" : "First Name"}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder={currentLanguage === "ar" ? "الاسم الأول" : "First name"} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {currentLanguage === "ar" ? "الاسم الأخير" : "Last Name"}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder={currentLanguage === "ar" ? "الاسم الأخير" : "Last name"} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  size="lg"
                >
                  {submitButtonText}
                </Button>
              </form>
            </Form>
          </Tabs>
        </CardContent>
        
        <CardFooter className="text-center text-sm text-muted-foreground">
          <div className="w-full">
            <p>
              {switchMessage}{" "}
              <Button variant="link" className="p-0" onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
                {switchAction}
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
