
import { useState, useEffect } from 'react';

/**
 * هوك مخصص لإضافة مهلة زمنية للقيم
 * مفيد للقيم التي تتغير بسرعة مثل مدخلات البحث
 * @param value القيمة المراد إضافة مهلة زمنية لها
 * @param delay المهلة الزمنية بالمللي ثانية
 * @returns القيمة بعد انتهاء المهلة
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // تعيين مؤقت لتحديث القيمة بعد انتهاء المهلة
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // تنظيف المؤقت عند تغيير القيمة أو عند إلغاء تحميل المكون
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
