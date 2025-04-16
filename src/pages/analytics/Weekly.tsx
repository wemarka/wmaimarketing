
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

const AnalyticsWeekly = () => {
  return (
    <Layout>
      <Helmet>
        <title>التقارير الأسبوعية - سيركل</title>
      </Helmet>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">التقارير الأسبوعية</h1>
        <p className="text-muted-foreground">صفحة قيد الإنشاء</p>
      </div>
    </Layout>
  );
};

export default AnalyticsWeekly;
