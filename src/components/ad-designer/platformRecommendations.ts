
export interface PlatformRecommendation {
  styles: string[];
  callToAction: string[];
  colorRecommendations: string[];
}

export interface PlatformRecommendations {
  [key: string]: PlatformRecommendation;
}

export const platformRecommendations: PlatformRecommendations = {
  instagram: {
    styles: ["modern", "minimal"],
    callToAction: ["shop_now", "learn_more"],
    colorRecommendations: ["#833AB4", "#405DE6", "#FD1D1D"],
  },
  facebook: {
    styles: ["bold", "modern"],
    callToAction: ["shop_now", "learn_more", "sign_up"],
    colorRecommendations: ["#1877F2", "#4267B2", "#3578E5"],
  },
  pinterest: {
    styles: ["elegant", "minimal"],
    callToAction: ["shop_now", "learn_more", "book_now"],
    colorRecommendations: ["#E60023", "#BD081C", "#CB2027"],
  }
};

// Default recommendation when platform is not found
export const defaultRecommendation: PlatformRecommendation = {
  styles: ["modern"],
  callToAction: ["shop_now"],
  colorRecommendations: ["#9b87f5"],
};

export const getPlatformRecommendation = (platform: string): PlatformRecommendation => {
  return platformRecommendations[platform] || defaultRecommendation;
};
