
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const ProfileLoading = () => {
  // تكوين متحركات الظهور
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-6 md:py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 lg:gap-8">
        {/* قالب تحميل الشريط الجانبي */}
        <motion.div 
          className="space-y-6 bg-card p-6 rounded-lg shadow-sm border border-border/40"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          
          <Skeleton className="h-px w-full" />
          
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </motion.div>

        {/* قالب تحميل المحتوى الرئيسي */}
        <motion.div 
          className="space-y-6"
          variants={itemVariants}
        >
          <div className="space-y-1">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <div className="space-y-8 mt-6">
              {Array(3).fill(null).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
              <Skeleton className="h-12 w-1/2 mt-2" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileLoading;
