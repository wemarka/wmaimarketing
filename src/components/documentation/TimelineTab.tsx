
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import TimelineItem from "./TimelineItem";

const TimelineTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>الجدول الزمني المقترح للتنفيذ</CardTitle>
        <CardDescription>
          التقدير الزمني لإنجاز كل مرحلة من مراحل المشروع
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TimelineItem phase="المرحلة الأولى: تأسيس المشروع والهيكلة الأساسية" duration="مكتملة" status="complete" />
          <TimelineItem phase="المرحلة الثانية: إدارة المستخدمين والصلاحيات الداخلية" duration="1-2 أسابيع" status="in-progress" />
          <TimelineItem phase="المرحلة الثالثة: أدوات إنتاج المحتوى الأساسية" duration="2-3 أسابيع" status="planned" />
          <TimelineItem phase="المرحلة الرابعة: أدوات إنتاج المحتوى المتقدمة" duration="2-3 أسابيع" status="planned" />
          <TimelineItem phase="المرحلة الخامسة: نظام الجدولة والنشر" duration="2 أسابيع" status="planned" />
          <TimelineItem phase="المرحلة السادسة: التحليلات والتقارير الداخلية" duration="1-2 أسابيع" status="planned" />
          <TimelineItem phase="المرحلة السابعة: التكامل والتوسع" duration="2-3 أسابيع" status="planned" />
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineTab;
