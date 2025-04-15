
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Instagram, Facebook } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// TikTok Logo Component
const TikTokIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      className={className} 
      fill="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.321 5.562a5.124 5.124 0 0 1-.2-.042 7.173 7.173 0 0 1-4.139-1.879 7.31 7.31 0 0 1-2.156-4.276c-.008-.056-.014-.111-.02-.167H9.019v12.794a3.247 3.247 0 0 1-.869 2.371 3.276 3.276 0 0 1-4.791-4.462 3.276 3.276 0 0 1 4.27-.691V5.32a7.01 7.01 0 0 0-4.773 1.853A7.044 7.044 0 0 0 1.523 15a7.043 7.043 0 0 0 7.822 7.034 7 7 0 0 0 5.875-4.17 6.951 6.951 0 0 0 .591-2.829V9.45a10.985 10.985 0 0 0 6.189 1.913V7.591a7.013 7.013 0 0 1-2.68-2.029Z"/>
    </svg>
  );
};

// Email Icon Component
const EmailIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  );
};

interface PlatformTotals {
  instagram: number;
  facebook: number;
  tiktok: number;
  email: number;
}

interface PlatformStatsCardsProps {
  currentTotals: PlatformTotals;
  prevTotals: PlatformTotals;
  loading?: boolean;
}

const PlatformStatsCards: React.FC<PlatformStatsCardsProps> = ({ 
  currentTotals, 
  prevTotals, 
  loading = false 
}) => {
  // Calculate percentage changes
  const calculateChange = (current: number, previous: number): number => {
    if (previous === 0) return 100;
    return parseFloat(((current - previous) / previous * 100).toFixed(1));
  };

  const instagramChange = calculateChange(currentTotals.instagram, prevTotals.instagram);
  const facebookChange = calculateChange(currentTotals.facebook, prevTotals.facebook);
  const tiktokChange = calculateChange(currentTotals.tiktok, prevTotals.tiktok);
  const emailChange = calculateChange(currentTotals.email, prevTotals.email);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[1, 2, 3, 4].map((index) => (
          <Skeleton key={index} className="h-28 rounded-xl bg-muted/50" />
        ))}
      </div>
    );
  }

  const platforms = [
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5 text-pink-600" />,
      value: currentTotals.instagram.toLocaleString(),
      change: instagramChange,
      iconBg: "bg-pink-100"
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5 text-blue-600" />,
      value: currentTotals.facebook.toLocaleString(),
      change: facebookChange,
      iconBg: "bg-blue-100"
    },
    {
      name: "TikTok",
      icon: <TikTokIcon className="h-5 w-5 text-gray-800" />,
      value: currentTotals.tiktok.toLocaleString(),
      change: tiktokChange,
      iconBg: "bg-gray-100"
    },
    {
      name: "Email",
      icon: <EmailIcon className="h-5 w-5 text-purple-600" />,
      value: currentTotals.email.toLocaleString(),
      change: emailChange,
      iconBg: "bg-purple-100"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {platforms.map((platform, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-full ${platform.iconBg}`}>
                {platform.icon}
              </div>
              <div className={`flex items-center gap-1 ${platform.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {platform.change >= 0 ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span className="text-xs">{Math.abs(platform.change)}%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{platform.name}</p>
              <p className="text-2xl font-medium">{platform.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlatformStatsCards;
