
import React from 'react';
import { motion } from 'framer-motion';
import { WebhookTabs } from './webhook';

const WebhookIntegration: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">تكامل الويب هوك</h1>
        <p className="text-muted-foreground">
          إدارة ومراقبة اتصالات الويب هوك لتطبيقك مع خدمات وبرامج خارجية
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg border shadow-sm">
        <div className="p-6">
          <WebhookTabs />
        </div>
      </div>
    </motion.div>
  );
};

export default WebhookIntegration;
