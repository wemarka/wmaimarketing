
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Loader2, Download, Image as ImageIcon, Sparkles, Instagram, Facebook, Pinterest } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AdGenerator = () => {
  const { toast } = useToast();
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
        title: "Images Generated",
        description: "Your AI ad images are ready!",
      });
    }, 3000);
  };

  const platforms = {
    instagram: {
      icon: <Instagram className="h-4 w-4" />,
      label: "Instagram",
    },
    facebook: {
      icon: <Facebook className="h-4 w-4" />,
      label: "Facebook", 
    },
    pinterest: {
      icon: <Pinterest className="h-4 w-4" />,
      label: "Pinterest", 
    },
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-2">AI Ad Image Generator</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Create stunning ad images for your beauty products with AI. Choose your platform, 
          style, and let our AI generate beautiful marketing visuals.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-6">Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform</label>
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
                    <label className="block text-sm font-medium mb-2">Style</label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="soft">Soft & Delicate</SelectItem>
                        <SelectItem value="bold">Bold & Vibrant</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                        <SelectItem value="natural">Natural Beauty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Season</label>
                    <Select value={season} onValueChange={setSeason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spring">Spring</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="fall">Fall</SelectItem>
                        <SelectItem value="winter">Winter</SelectItem>
                        <SelectItem value="holiday">Holiday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium">Creativity</label>
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
                    className="w-full mt-4" 
                    onClick={handleGenerate}
                    disabled={generating}
                  >
                    {generating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Images
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-6">Generated Images</h2>
                
                {generating ? (
                  <div className="h-64 flex flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin mb-4 text-beauty-purple" />
                    <p className="text-muted-foreground">Creating your perfect beauty ads...</p>
                  </div>
                ) : generatedImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {generatedImages.map((img, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border">
                        <img src={img} alt={`Generated ad ${index + 1}`} className="w-full h-48 object-cover" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-16 w-16 mb-4 text-muted-foreground/50" />
                    <p>Adjust your settings and generate beautiful ad images</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdGenerator;
