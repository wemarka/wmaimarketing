
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Video, Music, RotateCw, PlaySquare, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VideoGenerator = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [duration, setDuration] = useState([15]);
  const [style, setStyle] = useState("glamour");

  const handleGenerate = () => {
    setLoading(true);
    
    // Simulate video generation
    setTimeout(() => {
      setLoading(false);
      setVideoGenerated(true);
      
      toast({
        title: "Video Generated",
        description: "Your marketing video is ready to preview and download!",
      });
    }, 4000);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-2">AI Video Generator</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Create stunning product showcase videos with AI. Customize duration, style, 
          music, and text to create engaging video content for your beauty products.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-6">Video Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium">Duration</label>
                      <span className="text-sm text-muted-foreground">{duration[0]} seconds</span>
                    </div>
                    <Slider
                      value={duration}
                      min={10}
                      max={30}
                      step={5}
                      onValueChange={setDuration}
                      className="my-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Style</label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="glamour">Glamour & Luxury</SelectItem>
                        <SelectItem value="natural">Natural & Authentic</SelectItem>
                        <SelectItem value="vibrant">Vibrant & Colorful</SelectItem>
                        <SelectItem value="minimal">Minimalist</SelectItem>
                        <SelectItem value="tutorial">Tutorial Style</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Music Type</label>
                    <Select defaultValue="upbeat">
                      <SelectTrigger>
                        <SelectValue placeholder="Select music" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upbeat">Upbeat & Energetic</SelectItem>
                        <SelectItem value="soft">Soft & Gentle</SelectItem>
                        <SelectItem value="luxury">Luxury & Elegant</SelectItem>
                        <SelectItem value="trending">Trending</SelectItem>
                        <SelectItem value="none">No Music</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Headline Text</label>
                    <Input placeholder="NEW: Ruby Sunrise Lipstick" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Text</label>
                    <Textarea placeholder="Available Now | 15% off with code RUBY15" />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating Video...
                      </>
                    ) : (
                      <>
                        <Video className="h-4 w-4 mr-2" />
                        Generate Video
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
                <h2 className="text-xl font-medium mb-6">Preview</h2>
                
                {loading ? (
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="h-10 w-10 mb-4 animate-spin mx-auto text-beauty-purple" />
                      <p className="text-muted-foreground">Creating your video...</p>
                      <p className="text-xs text-muted-foreground mt-1">This may take a few moments</p>
                    </div>
                  </div>
                ) : videoGenerated ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                      {/* This would be a real video player in production */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-beauty-lightpurple/80 text-white p-2 rounded-lg">
                          <PlaySquare className="h-12 w-12" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                        <h3 className="text-xl font-bold mb-1">NEW: Ruby Sunrise Lipstick</h3>
                        <p className="text-sm">Available Now | 15% off with code RUBY15</p>
                      </div>
                      
                      {/* Simulated video thumbnail */}
                      <img 
                        src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop" 
                        alt="Video preview" 
                        className="w-full h-full object-cover opacity-60"
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">Ruby Sunrise Video</h3>
                        <p className="text-sm text-muted-foreground">{duration[0]} seconds • {style} style</p>
                      </div>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
                    <Video className="h-16 w-16 mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground">Configure your settings and generate a video</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {videoGenerated && (
              <Card className="mt-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-medium mb-4">Music Selection</h2>
                  
                  <div className="space-y-3">
                    {["Energetic Pop", "Elegant Piano", "Modern Beats"].map((track, index) => (
                      <div key={index} className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded-full p-2">
                            <Music className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{track}</p>
                            <p className="text-xs text-muted-foreground">Perfect match for {style} style</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoGenerator;
