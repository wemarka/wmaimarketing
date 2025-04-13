
import React from "react";
import Layout from "@/components/layout/Layout";
import IntegrationSettings from "@/components/integration/IntegrationSettings";

const Integration = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <IntegrationSettings />
      </div>
    </Layout>
  );
};

export default Integration;
