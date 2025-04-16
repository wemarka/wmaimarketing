
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

const AnalyticsSales = () => {
  return (
    <Layout>
      <Helmet>
        <title>تحليل المبيعات - سيركل</title>
      </Helmet>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">تحليل المبيعات</h1>
        <p className="text-muted-foreground">صفحة قيد الإنشاء</p>
      </div>
    </Layout>
  );
};

export default AnalyticsSales;
