
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { 
  LayoutDashboard,
  Palette,
  LineChart,
  Settings,
  RotateCcw
} from "lucide-react";
import { 
  UserPreferences,
  useUserPreferences,
  ColorScheme,
  ChartType,
  DashboardLayout
} from "@/modules/analytics/components/dashboard/hooks/useUserPreferences";

interface UserPreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserPreferencesDialog: React.FC<UserPreferencesDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { preferences, updatePreference, resetPreferences } = useUserPreferences();
  
  const colorSchemes: { value: ColorScheme; label: string; className: string }[] = [
    { value: "default", label: "افتراضي", className: "bg-primary" },
    { value: "blue", label: "أزرق", className: "bg-blue-500" },
    { value: "green", label: "أخضر", className: "bg-green-500" },
    { value: "purple", label: "بنفسجي", className: "bg-purple-500" },
    { value: "amber", label: "كهرماني", className: "bg-amber-500" },
  ];
  
  const chartTypes: { value: ChartType; label: string; icon: React.ReactNode }[] = [
    { value: "line", label: "خط", icon: <LineChart className="h-4 w-4" /> },
    { value: "bar", label: "أعمدة", icon: <LineChart className="h-4 w-4 rotate-90" /> },
    { value: "area", label: "مساحة", icon: <LineChart className="h-4 w-4" /> },
    { value: "pie", label: "دائري", icon: <LineChart className="h-4 w-4" /> },
  ];
  
  const dashboardLayouts: { value: DashboardLayout; label: string; icon: React.ReactNode }[] = [
    { value: "default", label: "افتراضي", icon: <LayoutDashboard className="h-4 w-4" /> },
    { value: "compact", label: "مضغوط", icon: <LayoutDashboard className="h-4 w-4" /> },
    { value: "expanded", label: "موسع", icon: <LayoutDashboard className="h-4 w-4" /> },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>تخصيص واجهة المستخدم</DialogTitle>
          <DialogDescription>
            قم بتخصيص تجربتك من خلال ضبط إعدادات العرض والرسومات
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="layout" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span>التنسيق</span>
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>الألوان</span>
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>الرسومات</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">تنسيق لوحة القيادة</h3>
                <RadioGroup 
                  value={preferences.dashboardLayout} 
                  onValueChange={(value) => updatePreference('dashboardLayout', value as DashboardLayout)}
                  className="flex flex-wrap gap-4"
                >
                  {dashboardLayouts.map((layout) => (
                    <div key={layout.value} className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value={layout.value} id={`layout-${layout.value}`} />
                      <Label htmlFor={`layout-${layout.value}`} className="cursor-pointer flex items-center gap-2">
                        {layout.icon}
                        {layout.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="colors" className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">نظام الألوان</h3>
              <div className="grid grid-cols-5 gap-2">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.value}
                    onClick={() => updatePreference('colorScheme', scheme.value)}
                    className={`
                      p-4 rounded-md flex flex-col items-center justify-center gap-2 border-2
                      ${preferences.colorScheme === scheme.value ? 'border-primary' : 'border-transparent'}
                    `}
                  >
                    <div className={`w-8 h-8 rounded-full ${scheme.className}`} />
                    <span className="text-xs">{scheme.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="charts" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">نوع الرسم البياني</h3>
                <RadioGroup 
                  value={preferences.chartType} 
                  onValueChange={(value) => updatePreference('chartType', value as ChartType)}
                  className="flex flex-wrap gap-4"
                >
                  {chartTypes.map((chartType) => (
                    <div key={chartType.value} className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value={chartType.value} id={`chart-${chartType.value}`} />
                      <Label htmlFor={`chart-${chartType.value}`} className="cursor-pointer flex items-center gap-2">
                        {chartType.icon}
                        {chartType.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-grid-lines">إظهار خطوط الشبكة</Label>
                  <Switch
                    id="show-grid-lines"
                    checked={preferences.showGridLines}
                    onCheckedChange={(checked) => updatePreference('showGridLines', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-animations">تفعيل الرسومات المتحركة</Label>
                  <Switch
                    id="enable-animations"
                    checked={preferences.enableAnimations}
                    onCheckedChange={(checked) => updatePreference('enableAnimations', checked)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={resetPreferences}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            إعادة ضبط
          </Button>
          <Button onClick={() => onOpenChange(false)}>تم</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserPreferencesDialog;
