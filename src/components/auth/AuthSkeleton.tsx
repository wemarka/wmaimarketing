
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export const AuthSkeleton = () => {
  return (
    <motion.div 
      className="space-y-6 p-6 md:p-10 bg-card rounded-lg shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      
      <div className="pt-2">
        <Skeleton className="h-10 w-full" />
      </div>
      
      <div className="flex justify-center pt-2">
        <Skeleton className="h-4 w-1/2" />
      </div>
    </motion.div>
  );
};
