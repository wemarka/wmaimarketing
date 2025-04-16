
import React from "react";
import { motion } from "framer-motion";
import { PostData } from "./types";
import PostItem from "./PostItem";
import { CheckCircle, Clock, LoaderCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AnimatedTabContentProps {
  status: string;
  posts: PostData[];
}

const AnimatedTabContent: React.FC<AnimatedTabContentProps> = ({ status, posts }) => {
  const filteredPosts = posts.filter(post => post.status === status);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  // RTL-aware animations
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.1
      } 
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, x: isRTL ? -15 : 15 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4
      } 
    }
  };
  
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "published": return "المنشورات المنشورة";
      case "scheduled": return "المنشورات المجدولة";
      case "pending": return "المنشورات قيد الانتظار";
      case "rejected": return "المنشورات المرفوضة";
      default: return "المنشورات";
    }
  };
  
  const getStatusIconLarge = (status: string) => {
    switch (status) {
      case "published": return <CheckCircle className="h-10 w-10 mx-auto mb-4 text-green-500 opacity-50" />;
      case "scheduled": return <Clock className="h-10 w-10 mx-auto mb-4 text-yellow-500 opacity-50" />;
      case "pending": return <LoaderCircle className="h-10 w-10 mx-auto mb-4 text-blue-500 opacity-50" />;
      case "rejected": return <XCircle className="h-10 w-10 mx-auto mb-4 text-red-500 opacity-50" />;
      default: return null;
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {filteredPosts.length > 0 ? (
        <motion.div 
          className="space-y-4"
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          {filteredPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              variants={itemAnimation}
              custom={index}
            >
              <PostItem key={post.id} post={post} index={index} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="p-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {getStatusIconLarge(status)}
          <h3 className="font-medium text-xl">{getStatusLabel(status)}</h3>
          <p className="text-muted-foreground mt-2">لا توجد منشورات تطابق معايير البحث</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedTabContent;
