
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "planned";
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  target: string;
  audience: string;
  owner: {
    name: string;
    avatar?: string;
  };
}

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        // Mocked data for now - in a real application, this would be fetched from an API
        const mockCampaigns: Campaign[] = [
          {
            id: "1",
            title: "حملة مستحضرات الجمال الشتوية",
            description: "حملة ترويجية لمنتجات العناية بالبشرة خلال فصل الشتاء",
            status: "active",
            progress: 45,
            budget: 5000,
            spent: 2250,
            startDate: "2025-03-01",
            endDate: "2025-05-15",
            target: "زيادة المبيعات 20%",
            audience: "النساء 25-40 عام",
            owner: {
              name: "سارة أحمد",
              avatar: "/avatars/sarah.png"
            }
          },
          {
            id: "2",
            title: "إطلاق منتج جديد - كريم مرطب",
            description: "إطلاق كريم الترطيب المكثف الجديد في الأسواق",
            status: "active",
            progress: 70,
            budget: 3000,
            spent: 2100,
            startDate: "2025-04-01",
            endDate: "2025-04-30",
            target: "10000 عميل جديد",
            audience: "جميع الفئات العمرية",
            owner: {
              name: "محمد علي",
              avatar: "/avatars/mohammed.png"
            }
          },
          {
            id: "3",
            title: "عروض العيد",
            description: "عروض خاصة بمناسبة العيد على جميع المنتجات",
            status: "planned",
            progress: 0,
            budget: 7000,
            spent: 0,
            startDate: "2025-05-01",
            endDate: "2025-06-15",
            target: "زيادة المبيعات 35%",
            audience: "عملاء جدد وحاليين",
            owner: {
              name: "نورة سعيد",
              avatar: "/avatars/noura.png"
            }
          }
        ];
        
        setCampaigns(mockCampaigns);
        setError(null);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
        toast({
          title: "خطأ في جلب البيانات",
          description: "تعذر تحميل بيانات الحملات",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [toast]);

  return { campaigns, loading, error };
};
