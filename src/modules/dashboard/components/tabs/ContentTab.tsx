
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PendingPostsWidget from "@/modules/dashboard/components/pending-posts";
import TaskReminders from "@/modules/dashboard/components/TaskReminders";
import { motion } from "framer-motion";
import { FileText, Image, Video } from "lucide-react";

const ContentTab = () => {
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerAnimation}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        className="grid md:grid-cols-2 gap-6" 
        variants={itemAnimation}
      >
        <PendingPostsWidget />
        <TaskReminders />
      </motion.div>
      
      <motion.div variants={itemAnimation}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>تحليل المحتوى</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800/50"
              >
                <div className="flex items-center mb-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mr-3 font-medium">المقالات</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">12 مقال جاهز للنشر</p>
                <div className="mt-2 h-2 bg-blue-200 dark:bg-blue-700/30 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full w-[65%]"></div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 p-6 rounded-xl border border-green-200 dark:border-green-800/50"
              >
                <div className="flex items-center mb-3">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <Image className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="mr-3 font-medium">الصور</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">27 صورة منشورة</p>
                <div className="mt-2 h-2 bg-green-200 dark:bg-green-700/30 rounded-full">
                  <div className="h-full bg-green-500 rounded-full w-[85%]"></div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800/50"
              >
                <div className="flex items-center mb-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <Video className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="mr-3 font-medium">الفيديوهات</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">5 فيديوهات قيد المعالجة</p>
                <div className="mt-2 h-2 bg-purple-200 dark:bg-purple-700/30 rounded-full">
                  <div className="h-full bg-purple-500 rounded-full w-[40%]"></div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ContentTab;
