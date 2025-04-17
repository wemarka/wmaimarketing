
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import PageTransition from '@/components/layout/PageTransition';
import WebhookIntegrationComponent from '@/modules/marketing/components/integration/WebhookIntegration';

const WebhookIntegrationPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>إدارة ويب هوك | المنصة التسويقية للجمال</title>
      </Helmet>
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <WebhookIntegrationComponent />
        </div>
      </PageTransition>
    </Layout>
  );
};

export default WebhookIntegrationPage;
