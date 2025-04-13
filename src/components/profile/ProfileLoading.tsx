
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const ProfileLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="space-y-2 mb-8 text-center md:text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Skeleton className="h-10 w-48 mx-auto md:mx-0" />
        <Skeleton className="h-4 w-64 mx-auto md:mx-0" />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 lg:gap-8">
        <motion.div 
          className="space-y-6 bg-card p-6 rounded-lg shadow-sm border"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Skeleton className="h-32 w-32 rounded-full mx-auto" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40 mx-auto" />
            <Skeleton className="h-4 w-20 mx-auto" />
          </div>
          <Skeleton className="h-px w-full" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Skeleton className="h-10 w-full" />
          
          <div className="space-y-4">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileLoading;
