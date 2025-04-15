
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast({
      title: "تم تغيير السمة",
      description: `تم التبديل إلى الوضع ${theme === "dark" ? "الفاتح" : "الداكن"}`,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full h-9 w-9"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-slate-600" />
      )}
    </Button>
  );
};

export default ThemeToggle;
