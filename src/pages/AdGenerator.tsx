
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Loader2, Download, Image as ImageIcon, Sparkles, Instagram, Facebook, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionTitle from "@/components/dashboard/SectionTitle";

const AdGenerator = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [generating, setGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [style, setStyle] = useState("luxury");
  const [season, setSeason] = useState("summer");
  const [creativity, setCreativity] = useState([50]);

  const handleGenerate = () => {
    setGenerating(true);
    
    // For the demo, we'll use placeholder images
    setTimeout(() => {
      // Placeholder images (in a real app, these would be AI-generated)
      const images = [
        "https://images.unsplash.com/photo-1631730359585-38a4935cbcae?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596704017254-9b5e2a025acf?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599733589046-75ed6419a6fa?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614093302611-8efc4de12407?q=80&w=500&auto=format&fit=crop",
      ];
      
      setGeneratedImages(images);
      setGenerating(false);
      
      toast({
        title: t("common.success"),
        description: t("adGenerator.successMessage", "Your AI ad images are ready!"),
      });
    }, 3000);
  };

  const platforms = {
    instagram: {
      icon: <Instagram className="h-4 w-4" />,
      label: t("adGenerator.platforms.instagram", "Instagram"),
    },
    facebook: {
      icon: <Facebook className="h-4 w-4" />,
      label: t("adGenerator.platforms.facebook", "Facebook"), 
    },
    pinterest: {
      icon: <Share2 className="h-4 w-4" />,
      label: t("adGenerator.platforms.pinterest", "Pinterest"), 
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <Layout>
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <SectionTitle
          title={t("adGenerator.title", "AI Ad Image Generator")}
          subtitle={t("adGenerator.subtitle", "Create stunning ad images for your beauty products with AI")}
          icon={<Sparkles className="h-5 w-5" />}
          variant="gradient"
          size="lg"
          animated={true}
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <Card className="overflow-hidden border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-6">{t("adGenerator.settings", "Settings")}</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("adGenerator.platform", "Platform")}</label>
                    <Tabs
                      defaultValue="instagram"
                      value={selectedPlatform}
                      onValueChange={setSelectedPlatform}
                      className="w-full"
                    >
                      <TabsList className="w-full">
                        {Object.entries(platforms).map(([key, { icon, label }]) => (
                          <TabsTrigger key={key} value={key} className="flex-1">
                            <div className="flex items-center gap-1">
                              {icon}
                              <span className="hidden sm:inline">{label}</span>
                            </div>
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("adGenerator.style", "Style")}</label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("adGenerator.selectStyle", "Select style")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="luxury">{t("adGenerator.styles.luxury", "Luxury")}</SelectItem>
                        <SelectItem value="soft">{t("adGenerator.styles.soft", "Soft & Delicate")}</SelectItem>
                        <SelectItem value="bold">{t("adGenerator.styles.bold", "Bold & Vibrant")}</SelectItem>
                        <SelectItem value="minimalist">{t("adGenerator.styles.minimalist", "Minimalist")}</SelectItem>
                        <SelectItem value="natural">{t("adGenerator.styles.natural", "Natural Beauty")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{t("adGenerator.season", "Season")}</label>
                    <Select value={season} onValueChange={setSeason}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("adGenerator.selectSeason", "Select season")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spring">{t("adGenerator.seasons.spring", "Spring")}</SelectItem>
                        <SelectItem value="summer">{t("adGenerator.seasons.summer", "Summer")}</SelectItem>
                        <SelectItem value="fall">{t("adGenerator.seasons.fall", "Fall")}</SelectItem>
                        <SelectItem value="winter">{t("adGenerator.seasons.winter", "Winter")}</SelectItem>
                        <SelectItem value="holiday">{t("adGenerator.seasons.holiday", "Holiday")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium">{t("adGenerator.creativity", "Creativity")}</label>
                      <span className="text-sm text-muted-foreground">{creativity[0]}%</span>
                    </div>
                    <Slider
                      value={creativity}
                      min={0}
                      max={100}
                      step={10}
                      onValueChange={setCreativity}
                      className="my-2"
                    />
                  </div>
                  
                  <Button 
                    className="w-full mt-4 relative overflow-hidden group" 
                    onClick={handleGenerate}
                    disabled={generating}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {generating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {t("common.generating", "Generating...")}
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2 group-hover:animate-ping" />
                          {t("adGenerator.generateButton", "Generate Images")}
                        </>
                      )}
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <Card className="h-full border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-6">{t("adGenerator.generatedImages", "Generated Images")}</h2>
                
                <AnimatePresence mode="wait">
                  {generating ? (
                    <motion.div 
                      key="loading"
                      className="h-64 flex flex-col items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                      <p className="text-muted-foreground">{t("adGenerator.creatingAds", "Creating your perfect beauty ads...")}</p>
                    </motion.div>
                  ) : generatedImages.length > 0 ? (
                    <motion.div 
                      key="grid"
                      className="grid grid-cols-2 gap-4"
                      initial="hidden"
                      animate="visible"
                      variants={containerVariants}
                    >
                      {generatedImages.map((img, index) => (
                        <motion.div 
                          key={index} 
                          className="relative group rounded-lg overflow-hidden border"
                          variants={imageVariants}
                          whileHover="hover"
                        >
                          <img src={img} alt={`Generated ad ${index + 1}`} className="w-full h-48 object-cover" />
                          <motion.div 
                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            <Button variant="secondary" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              {t("common.download", "Download")}
                            </Button>
                          </motion.div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="empty"
                      className="h-64 flex flex-col items-center justify-center text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ImageIcon className="h-16 w-16 mb-4 text-muted-foreground/50" />
                      <p>{t("adGenerator.adjustSettings", "Adjust your settings and generate beautiful ad images")}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default AdGenerator;
