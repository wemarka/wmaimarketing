
export interface VideoSettingsType {
  title: string;
  subtitle: string;
  cta: string;
  animation?: AnimationType;
  duration?: number;
  textPosition?: TextPositionType;
  textColor?: string;
  backgroundColor?: string;
  textEffect?: TextEffectType;
  overlayOpacity?: number;
  watermark?: boolean;
  theme?: string;
  stylePreset?: StylePresetType;
}

export type TemplateType = "zoom" | "pan" | "rotate";
export type AnimationType = "fade" | "slide" | "zoom";
export type TextPositionType = "top" | "center" | "bottom";
export type TextEffectType = "none" | "typing" | "fade" | "bounce";
export type StylePresetType = "classic" | "modern" | "minimal";

export interface VideoTemplateProps {
  selectedImage: string | null;
  settings: VideoSettingsType;
  template: TemplateType;
}

export interface VideoTheme {
  name: string;
  textColor: string;
  backgroundColor: string;
  overlayOpacity: number;
  preview?: string;
}

export const VIDEO_THEMES: VideoTheme[] = [
  {
    name: "كلاسيكي",
    textColor: "#ffffff",
    backgroundColor: "transparent",
    overlayOpacity: 60,
    preview: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7))"
  },
  {
    name: "مشرق",
    textColor: "#ffffff",
    backgroundColor: "rgba(249, 115, 22, 0.7)",
    overlayOpacity: 40,
    preview: "linear-gradient(to bottom, rgba(249, 115, 22, 0.3), rgba(249, 115, 22, 0.7))"
  },
  {
    name: "أنيق",
    textColor: "#f1f1f1",
    backgroundColor: "rgba(139, 92, 246, 0.5)",
    overlayOpacity: 50,
    preview: "linear-gradient(to bottom, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.5))"
  },
  {
    name: "داكن",
    textColor: "#ffffff",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    overlayOpacity: 70,
    preview: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))"
  },
  {
    name: "نابض",
    textColor: "#ffffff",
    backgroundColor: "rgba(16, 185, 129, 0.6)",
    overlayOpacity: 45,
    preview: "linear-gradient(to bottom, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.6))"
  },
  {
    name: "ناعم",
    textColor: "#ffffff",
    backgroundColor: "rgba(236, 72, 153, 0.5)",
    overlayOpacity: 40,
    preview: "linear-gradient(to bottom, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.5))"
  }
];

export const STYLE_PRESETS = {
  classic: {
    name: "كلاسيكي",
    description: "شكل كلاسيكي مع نص واضح ومساحات متوازنة للأقسام المختلفة في الفيديو"
  },
  modern: {
    name: "عصري",
    description: "تصميم عصري مع تأثيرات انتقالية سلسة وعناصر متحركة"
  },
  minimal: {
    name: "بسيط",
    description: "تصميم بسيط يركز على المنتج مع الحد الأدنى من العناصر النصية"
  }
};
