
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsFilterProps {
  statusFilter: string;
}

const TabsFilter: React.FC<TabsFilterProps> = ({ statusFilter }) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
      <TabsTrigger value="all">الكل</TabsTrigger>
      <TabsTrigger value="published">المنشورة</TabsTrigger>
      <TabsTrigger value="scheduled">المجدولة</TabsTrigger>
      <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
      <TabsTrigger value="rejected">المرفوضة</TabsTrigger>
    </TabsList>
  );
};

export default TabsFilter;
