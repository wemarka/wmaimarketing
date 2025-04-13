
export interface VideoSettingsType {
  title: string;
  subtitle: string;
  cta: string;
  animation?: "fade" | "slide" | "zoom";
  duration?: number;
  textPosition?: "top" | "center" | "bottom";
  textColor?: string;
  backgroundColor?: string;
}

export type TemplateType = "zoom" | "pan" | "rotate";

export interface VideoTemplateProps {
  selectedImage: string | null;
  settings: VideoSettingsType;
  template: TemplateType;
}
