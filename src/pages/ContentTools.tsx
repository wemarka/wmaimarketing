
import React from "react";
import Layout from "@/components/layout/Layout";
import ProductImageOrganizer from "@/components/content/ProductImageOrganizer";

const ContentTools: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <ProductImageOrganizer />
      </div>
    </Layout>
  );
};

export default ContentTools;
