
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loadingStyles?: string;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  loadingStyles,
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // إضافة خاصية loading='lazy' للصور لتحسين الأداء
  // إلا إذا كانت الصورة ذات أولوية عالية
  const loadingAttr = priority ? 'eager' : 'lazy';
  
  // المسارات الصحيحة للصور باستخدام قاعدة تصغير الصور
  const getSizedImageUrl = () => {
    if (src.startsWith('http') || src.startsWith('data:')) {
      return src; // لا يمكن تغيير الصور الخارجية أو الصور المضمنة
    }
    
    // تحقق ما إذا كان مكتبة الصور بالفعل تدعم أحجام متعددة
    if (src.includes('?w=') || src.includes('&w=')) {
      return src;
    }
    
    // إضافة عرض محدد للصورة إذا تم توفيره
    if (width) {
      const separator = src.includes('?') ? '&' : '?';
      return `${src}${separator}w=${width}`;
    }
    
    return src;
  };
  
  // استخدام حدث تحميل لإظهار الصورة بعد اكتمال التحميل
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  // التعامل مع أخطاء تحميل الصورة
  const handleError = () => {
    setError(true);
    setIsLoaded(true); // لإخفاء حالة التحميل
  };
  
  return (
    <div className="relative" style={{ width, height }}>
      {!isLoaded && !error && (
        <Skeleton 
          className={cn(
            "absolute inset-0", 
            loadingStyles
          )} 
          style={{ width: '100%', height: '100%' }}
        />
      )}
      
      {error ? (
        <div 
          className={cn(
            "flex items-center justify-center bg-muted text-muted-foreground",
            className
          )}
          style={{ width: '100%', height: '100%' }}
        >
          <span className="text-xs">فشل تحميل الصورة</span>
        </div>
      ) : (
        <img
          src={getSizedImageUrl()}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          loading={loadingAttr}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
