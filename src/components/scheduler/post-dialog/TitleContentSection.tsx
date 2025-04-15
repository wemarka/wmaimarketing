
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TitleContentSectionProps {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
}

const TitleContentSection: React.FC<TitleContentSectionProps> = ({
  title,
  content,
  setTitle,
  setContent,
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">عنوان المنشور</Label>
        <Input 
          id="title" 
          placeholder="أدخل عنواناً وصفياً" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">محتوى المنشور</Label>
        <Textarea 
          id="content" 
          placeholder="اكتب محتوى منشورك هنا..." 
          className="min-h-[100px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </>
  );
};

export default TitleContentSection;
