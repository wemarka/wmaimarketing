
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  getSocialAccounts, 
  connectAccount, 
  disconnectAccount,
  getPlatformStats,
  getSuggestedPostingTimes,
  crossPostContent,
  SocialAccount,
  ConnectAccountParams,
  PlatformStats
} from "../services/integrationService";

export const useSocialIntegration = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats[]>([]);
  const [suggestedTimes, setSuggestedTimes] = useState<{day: string, hour: number, score: number}[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  
  useEffect(() => {
    loadSocialAccounts();
    loadPlatformStats();
  }, []);

  const loadSocialAccounts = async () => {
    setIsLoading(true);
    try {
      const accountsData = await getSocialAccounts();
      setAccounts(accountsData);
    } catch (error) {
      console.error("Error loading social accounts:", error);
      toast.error("فشل في تحميل الحسابات المرتبطة");
    } finally {
      setIsLoading(false);
    }
  };

  const loadPlatformStats = async () => {
    try {
      const stats = await getPlatformStats();
      setPlatformStats(stats);
    } catch (error) {
      console.error("Error loading platform stats:", error);
    }
  };

  const handleConnectAccount = async (params: ConnectAccountParams) => {
    setIsConnecting(true);
    try {
      const newAccount = await connectAccount(params);
      setAccounts(prev => [...prev, newAccount]);
      toast.success("تم ربط الحساب بنجاح");
      return newAccount;
    } catch (error) {
      console.error("Error connecting account:", error);
      toast.error("فشل في ربط الحساب");
      throw error;
    } finally {
      setIsConnecting(false);
      setSelectedPlatform(null);
    }
  };

  const handleDisconnectAccount = async (accountId: string) => {
    try {
      await disconnectAccount(accountId);
      setAccounts(prev => prev.filter(account => account.id !== accountId));
      toast.success("تم إلغاء ربط الحساب بنجاح");
    } catch (error) {
      console.error("Error disconnecting account:", error);
      toast.error("فشل في إلغاء ربط الحساب");
    }
  };

  const loadSuggestedPostingTimes = async (platform: string) => {
    try {
      const times = await getSuggestedPostingTimes(platform);
      setSuggestedTimes(times);
      return times;
    } catch (error) {
      console.error("Error loading suggested posting times:", error);
      return [];
    }
  };

  const handleCrossPostContent = async (
    content: string, 
    mediaUrls: string[], 
    platforms: string[]
  ) => {
    try {
      const results = await crossPostContent(content, mediaUrls, platforms);
      
      // Count successes and failures
      const successes = results.filter(r => r.status === "success").length;
      const failures = results.filter(r => r.status === "error").length;
      
      if (failures === 0) {
        toast.success(`تم النشر بنجاح على ${successes} منصة`);
      } else if (successes === 0) {
        toast.error("فشل النشر على جميع المنصات");
      } else {
        toast.warning(`تم النشر بنجاح على ${successes} منصة وفشل على ${failures} منصة`);
      }
      
      return results;
    } catch (error) {
      console.error("Error cross-posting content:", error);
      toast.error("حدث خطأ أثناء محاولة النشر المتعدد");
      throw error;
    }
  };

  return {
    accounts,
    platformStats,
    suggestedTimes,
    isLoading,
    isConnecting,
    selectedPlatform,
    setSelectedPlatform,
    loadSocialAccounts,
    loadPlatformStats,
    loadSuggestedPostingTimes,
    handleConnectAccount,
    handleDisconnectAccount,
    handleCrossPostContent
  };
};
