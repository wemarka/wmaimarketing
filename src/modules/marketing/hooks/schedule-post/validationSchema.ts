
import * as z from 'zod';

// Define the validation schema for scheduling posts
export const schedulePostSchema = z.object({
  title: z.string().min(1, "العنوان مطلوب").max(100, "العنوان طويل جدًا"),
  content: z.string().min(1, "المحتوى مطلوب").max(2000, "المحتوى طويل جدًا"),
  mediaUrls: z.array(z.string()).optional(),
  platform: z.string().min(1, "يجب اختيار منصة"),
  scheduledAt: z.string(),
  campaignId: z.string().optional(),
  crossPostAccountIds: z.array(z.string()).optional()
});

// Export the type inferred from the schema
export type SchedulePostFormSchema = z.infer<typeof schedulePostSchema>;
