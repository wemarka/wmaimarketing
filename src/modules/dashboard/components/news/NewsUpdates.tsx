
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Bookmark, ChevronRight, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

// Sample news data - in a real app, this would come from an API
const newsItems = [
  {
    id: "1",
    title: "تحديث منصة التسويق",
    description: "تم إضافة ميزات جديدة لتحليل أداء الحملات بشكل مفصل",
    date: "اليوم",
    type: "update",
  },
  {
    id: "2",
    title: "ترقية نظام الجدولة",
    description: "أصبح بإمكانك الآن جدولة منشورات متكررة بسهولة",
    date: "أمس",
    type: "feature",
  },
  {
    id: "3",
    title: "تدريب مجاني",
    description: "انضم إلى ورشة عمل افتراضية حول استراتيجيات التسويق الرقمي",
    date: "23/04",
    type: "event",
  },
];

const typeMap = {
  update: { icon: <Bell className="h-4 w-4" />, color: "bg-blue-100 text-blue-600" },
  feature: { icon: <Megaphone className="h-4 w-4" />, color: "bg-green-100 text-green-600" },
  event: { icon: <ChevronRight className="h-4 w-4" />, color: "bg-amber-100 text-amber-600" },
};

const NewsUpdates = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">آخر المستجدات والإعلانات</CardTitle>
        <Button variant="ghost" size="sm" className="text-beauty-purple">
          عرض الكل
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex gap-3 group">
                <div className={`mt-0.5 rounded-full p-1.5 ${typeMap[item.type as keyof typeof typeMap].color}`}>
                  {typeMap[item.type as keyof typeof typeMap].icon}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <Badge variant="outline" className="mr-2 text-xs">{item.date}</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsUpdates;
