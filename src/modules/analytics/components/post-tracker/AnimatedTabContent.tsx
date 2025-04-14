
import React from "react";
import { motion } from "framer-motion";
import { PostData } from "./types";
import PostItem from "./PostItem";
import { getStatusIcon } from "./utils";
import { CheckCircle, Clock, LoaderCircle, XCircle } from "lucide-react";

interface AnimatedTabContentProps {
  status: string;
  posts: PostData[];
}

const AnimatedTabContent: React.FC<AnimatedTabContentProps> = ({ status, posts }) => {
  const filteredPosts = posts.filter(post => post.status === status);
  
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
      transition={{ duration: 0.2 }}
    >
      {filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <PostItem key={post.id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          {getStatusIconLarge(status)}
          <h3 className="font-medium text-xl">{getStatusLabel(status)}</h3>
          <p className="text-muted-foreground mt-2">لا توجد منشورات تطابق معايير البحث</p>
        </div>
      )}
    </motion.div>
  );
};

export default AnimatedTabContent;
