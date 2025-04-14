
import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Bar,
  Line,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut, RefreshCw, Download } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface OverviewChartProps {
  data: any[];
}

const OverviewChart: React.FC<OverviewChartProps> = ({ data }) => {
  const [chartType, setChartType] = useState<"composed" | "area" | "line">("composed");
  const [focusedMetric, setFocusedMetric] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewWindow, setViewWindow] = useState({ start: 0, end: data.length - 1 });
  
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  
  // فلاتر التحسين للأداء والعرض
  const filteredData = useMemo(() => {
    // إذا كانت البيانات كثيرة، يمكننا تقليل عدد النقاط للأجهزة المحمولة
    if (isMobile && data.length > 10) {
      const skipFactor = Math.ceil(data.length / 7); // عرض 7 نقاط فقط على الجوال
      return data.filter((_, index) => index % skipFactor === 0);
    }
    
    // عرض نافذة جزئية من البيانات حسب مستوى التكبير والموقع الحالي
    const windowSize = Math.ceil(data.length / zoomLevel);
    const start = Math.min(viewWindow.start, data.length - windowSize);
    const end = Math.min(start + windowSize, data.length);
    
    return data.slice(start, end);
  }, [data, isMobile, zoomLevel, viewWindow]);
  
  // رسم خرائط الألوان المتوافقة مع وضع الظلام
  const chartConfig = {
    impressions: { 
      label: "المشاهدات", 
      color: "#9b87f5",
      darkColor: "#ac9df9"
    },
    engagement: { 
      label: "التفاعل", 
      color: "#D946EF",
      darkColor: "#e76af3"
    },
    clicks: { 
      label: "النقرات", 
      color: "#D4AF37",
      darkColor: "#e6c251"
    },
    revenue: { 
      label: "الإيرادات", 
      color: "#0EA5E9",
      darkColor: "#38bdf8"
    }
  };
  
  // التنقل في النافذة
  const navigateWindow = (direction: 'left' | 'right') => {
    const windowSize = Math.ceil(data.length / zoomLevel);
    const step = Math.max(1, Math.floor(windowSize / 3)); // التقدم بمقدار ثلث النافذة
    
    if (direction === 'left') {
      setViewWindow(prev => ({
        start: Math.max(0, prev.start - step),
        end: Math.max(windowSize - 1, prev.end - step),
      }));
    } else {
      setViewWindow(prev => ({
        start: Math.min(data.length - windowSize, prev.start + step),
        end: Math.min(data.length - 1, prev.end + step),
      }));
    }
  };
  
  // وظيفة التكبير/التصغير
  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in' && zoomLevel < 4) {
      setZoomLevel(prev => prev + 0.5);
    } else if (direction === 'out' && zoomLevel > 1) {
      setZoomLevel(prev => Math.max(1, prev - 0.5));
    }
  };
  
  // إعادة تعيين إعدادات الرسم البياني
  const resetChart = () => {
    setChartType("composed");
    setFocusedMetric(null);
    setZoomLevel(1);
    setViewWindow({ start: 0, end: data.length - 1 });
  };
  
  // تصدير البيانات كملف CSV
  const exportData = () => {
    // تحويل البيانات إلى تنسيق CSV
    const headers = Object.keys(data[0] || {}).join(',');
    const rows = data.map(item => Object.values(item).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    
    // إنشاء رابط التحميل
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'chart_data.csv');
    document.body.appendChild(link);
    
    // النقر على الرابط وإزالته
    link.click();
    document.body.removeChild(link);
  };

  // إنتاج مكونات الرسم البياني حسب النوع المحدد
  const renderChartComponents = () => {
    switch (chartType) {
      case "area":
        return (
          <>
            {(!focusedMetric || focusedMetric === "impressions") && (
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="impressions" 
                fill={chartConfig.impressions.color} 
                stroke={chartConfig.impressions.color} 
                fillOpacity={0.6}
                activeDot={{ r: 6, strokeWidth: 1, stroke: "#fff" }}
              />
            )}
            {(!focusedMetric || focusedMetric === "engagement") && (
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="engagement" 
                fill={chartConfig.engagement.color} 
                stroke={chartConfig.engagement.color} 
                fillOpacity={0.6}
                activeDot={{ r: 6, strokeWidth: 1, stroke: "#fff" }}
              />
            )}
            {(!focusedMetric || focusedMetric === "clicks") && (
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="clicks" 
                fill={chartConfig.clicks.color} 
                stroke={chartConfig.clicks.color} 
                fillOpacity={0.6}
                activeDot={{ r: 6, strokeWidth: 1, stroke: "#fff" }}
              />
            )}
            {(!focusedMetric || focusedMetric === "revenue") && (
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                fill={chartConfig.revenue.color} 
                stroke={chartConfig.revenue.color} 
                fillOpacity={0.6}
                activeDot={{ r: 6, strokeWidth: 1, stroke: "#fff" }}
              />
            )}
          </>
        );
      case "line":
        return (
          <>
            {(!focusedMetric || focusedMetric === "impressions") && (
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="impressions" 
                stroke={chartConfig.impressions.color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {(!focusedMetric || focusedMetric === "engagement") && (
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="engagement" 
                stroke={chartConfig.engagement.color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {(!focusedMetric || focusedMetric === "clicks") && (
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="clicks" 
                stroke={chartConfig.clicks.color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {(!focusedMetric || focusedMetric === "revenue") && (
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke={chartConfig.revenue.color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </>
        );
      default: // composed
        return (
          <>
            {(!focusedMetric || focusedMetric === "impressions") && (
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="impressions" 
                fill={chartConfig.impressions.color} 
                stroke={chartConfig.impressions.color} 
                fillOpacity={0.3}
                activeDot={{ r: 6, strokeWidth: 1, stroke: "#fff" }}
              />
            )}
            {(!focusedMetric || focusedMetric === "engagement") && (
              <Bar 
                yAxisId="left"
                dataKey="engagement" 
                fill={chartConfig.engagement.color} 
                radius={[4, 4, 0, 0]} 
                barSize={isMobile ? 15 : 20}
              />
            )}
            {(!focusedMetric || focusedMetric === "clicks") && (
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="clicks" 
                stroke={chartConfig.clicks.color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {(!focusedMetric || focusedMetric === "revenue") && (
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke={chartConfig.revenue.color} 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </>
        );
    }
  };
  
  // إنتاج الزر المناسب لنوع الرسم البياني
  const renderChartTypeButtons = () => (
    <div className="flex flex-wrap gap-2 mt-2">
      <Button
        variant={chartType === "composed" ? "default" : "outline"}
        size="sm"
        onClick={() => setChartType("composed")}
        className={cn("text-xs", isMobile && "w-full")}
      >
        مركب
      </Button>
      <Button
        variant={chartType === "area" ? "default" : "outline"}
        size="sm"
        onClick={() => setChartType("area")}
        className={cn("text-xs", isMobile && "w-full")}
      >
        منطقة
      </Button>
      <Button
        variant={chartType === "line" ? "default" : "outline"}
        size="sm"
        onClick={() => setChartType("line")}
        className={cn("text-xs", isMobile && "w-full")}
      >
        خط
      </Button>
    </div>
  );
  
  // إنتاج أزرار التصفية حسب المقياس
  const renderMetricFilters = () => (
    <div className="flex flex-wrap gap-1 mt-2">
      <Button
        variant={focusedMetric === null ? "subtle" : "ghost"}
        size="sm"
        onClick={() => setFocusedMetric(null)}
        className="text-xs"
      >
        الكل
      </Button>
      <Button
        variant={focusedMetric === "impressions" ? "subtle" : "ghost"}
        size="sm"
        onClick={() => setFocusedMetric("impressions")}
        className="text-xs"
        style={{ color: focusedMetric === "impressions" ? chartConfig.impressions.color : undefined }}
      >
        المشاهدات
      </Button>
      <Button
        variant={focusedMetric === "engagement" ? "subtle" : "ghost"}
        size="sm"
        onClick={() => setFocusedMetric("engagement")}
        className="text-xs"
        style={{ color: focusedMetric === "engagement" ? chartConfig.engagement.color : undefined }}
      >
        التفاعل
      </Button>
      <Button
        variant={focusedMetric === "clicks" ? "subtle" : "ghost"}
        size="sm"
        onClick={() => setFocusedMetric("clicks")}
        className="text-xs"
        style={{ color: focusedMetric === "clicks" ? chartConfig.clicks.color : undefined }}
      >
        النقرات
      </Button>
      <Button
        variant={focusedMetric === "revenue" ? "subtle" : "ghost"}
        size="sm"
        onClick={() => setFocusedMetric("revenue")}
        className="text-xs"
        style={{ color: focusedMetric === "revenue" ? chartConfig.revenue.color : undefined }}
      >
        الإيرادات
      </Button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("md:col-span-3", isTablet ? "overflow-x-auto" : "")}>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <CardTitle>نمو الجمهور</CardTitle>
              <CardDescription className="mt-1">
                {isMobile ? "المشاهدات اليومية" : "المشاهدات اليومية خلال الفترة المحددة"}
              </CardDescription>
            </div>
            
            <div className="flex flex-wrap items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateWindow('left')}
                disabled={viewWindow.start === 0}
                className="h-8 w-8"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleZoom('out')}
                disabled={zoomLevel <= 1}
                className="h-8 w-8"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleZoom('in')}
                disabled={zoomLevel >= 4}
                className="h-8 w-8"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateWindow('right')}
                disabled={viewWindow.end >= data.length - 1}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 ml-2"
                  >
                    <span className="sr-only">خيارات إضافية</span>
                    <div className="w-4 h-4 flex flex-col justify-center items-center gap-0.5">
                      <div className="w-1 h-1 rounded-full bg-current"></div>
                      <div className="w-1 h-1 rounded-full bg-current"></div>
                      <div className="w-1 h-1 rounded-full bg-current"></div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={resetChart}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    <span>إعادة تعيين</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportData}>
                    <Download className="mr-2 h-4 w-4" />
                    <span>تصدير البيانات</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {!isMobile && renderMetricFilters()}
        </CardHeader>
        
        <CardContent className={cn("pl-2", isTablet ? "min-w-[500px]" : "")}>
          <ChartContainer 
            config={chartConfig}
            className="h-[300px]"
          >
            <ComposedChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted-foreground/20" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickLine={{ stroke: "var(--muted-foreground)" }}
                axisLine={{ stroke: "var(--muted-foreground)" }}
                dy={10}
              />
              <YAxis 
                yAxisId="left" 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickLine={{ stroke: "var(--muted-foreground)" }}
                axisLine={{ stroke: "var(--muted-foreground)" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickLine={{ stroke: "var(--muted-foreground)" }}
                axisLine={{ stroke: "var(--muted-foreground)" }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                wrapperClassName="!bg-popover !text-popover-foreground" 
              />
              <ChartLegend 
                content={<ChartLegendContent />}
                wrapperClassName="!text-muted-foreground" 
              />
              
              {renderChartComponents()}
            </ComposedChart>
          </ChartContainer>
        </CardContent>
        
        <CardFooter className="pt-0 px-6 flex-wrap gap-2">
          {renderChartTypeButtons()}
          {isMobile && renderMetricFilters()}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default React.memo(OverviewChart);
