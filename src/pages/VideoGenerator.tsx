
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import PageTransition from '@/components/layout/PageTransition';
import VideoIdeaGenerator from '@/components/ai/VideoIdeaGenerator';

const VideoGenerator = () => {
  return (
    <Layout>
      <Helmet>
        <title>مولد الفيديو | المنصة التسويقية للجمال</title>
      </Helmet>
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">مولد الفيديو الذكي</h1>
            <p className="text-muted-foreground mt-2">
              قم بإنشاء فيديوهات احترافية وأفكار إبداعية لمنتجاتك باستخدام الذكاء الاصطناعي
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <VideoIdeaGenerator />
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default VideoGenerator;
