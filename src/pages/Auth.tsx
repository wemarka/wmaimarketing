
import React, { useState } from "react";
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

const authSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صالح" }),
  password: z.string().min(6, { message: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل" }),
});

type AuthFormValues = z.infer<typeof authSchema>;

const Auth = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);
    try {
      if (authMode === "login") {
        await signIn(values.email, values.password);
        navigate("/");
      } else {
        await signUp(values.email, values.password);
        setAuthMode("login");
        form.reset();
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-beauty-pink to-beauty-lightpurple mb-4"></div>
          <CardTitle className="text-2xl">مرحباً بك في Beauty AI</CardTitle>
          <CardDescription>
            {authMode === "login" ? "قم بتسجيل الدخول للوصول إلى لوحة التحكم" : "قم بإنشاء حساب جديد"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as "login" | "register")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
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
                      <FormLabel>كلمة المرور</FormLabel>
                      <FormControl>
                        <Input placeholder="******" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "جاري التحميل..." : authMode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
                </Button>
              </form>
            </Form>
          </Tabs>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          <div className="w-full">
            {authMode === "login" ? (
              <p>
                ليس لديك حساب؟{" "}
                <Button variant="link" className="p-0" onClick={() => setAuthMode("register")}>
                  قم بالتسجيل
                </Button>
              </p>
            ) : (
              <p>
                لديك حساب بالفعل؟{" "}
                <Button variant="link" className="p-0" onClick={() => setAuthMode("login")}>
                  قم بتسجيل الدخول
                </Button>
              </p>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
