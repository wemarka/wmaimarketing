
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
}

export type TemplateType = "zoom" | "pan" | "rotate";
export type AnimationType = "fade" | "slide" | "zoom";
export type TextPositionType = "top" | "center" | "bottom";
export type TextEffectType = "none" | "typing" | "fade" | "bounce";

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
}

export const VIDEO_THEMES: VideoTheme[] = [
  {
    name: "كلاسيكي",
    textColor: "#ffffff",
    backgroundColor: "transparent",
    overlayOpacity: 60
  },
  {
    name: "مشرق",
    textColor: "#ffffff",
    backgroundColor: "rgba(249, 115, 22, 0.7)",
    overlayOpacity: 40
  },
  {
    name: "أنيق",
    textColor: "#f1f1f1",
    backgroundColor: "rgba(139, 92, 246, 0.5)",
    overlayOpacity: 50
  },
  {
    name: "داكن",
    textColor: "#ffffff",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    overlayOpacity: 70
  }
];
