
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Award, RotateCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ImageUpload = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
      
      setAnalysis(null);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    
    setAnalyzing(true);
    
    // Simulate AI analysis with a timeout
    setTimeout(() => {
      // Sample analysis result
      const analysisResult = {
        productType: "Lipstick",
        color: "#CF4B6A",
        colorName: "Ruby Red",
        lighting: "Soft, diffused lighting",
        angle: "45° side angle",
        recommendations: [
          "Increase contrast for better color representation",
          "Consider a closer shot to highlight texture",
          "Add more vibrant backdrop to make the product stand out"
        ]
      };
      
      setAnalysis(analysisResult);
      setAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Your product has been successfully analyzed!",
      });
    }, 2500);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-2">Product Image Upload & Analysis</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Upload your beauty product image and our AI will analyze its characteristics, 
          including product type, angle, lighting, and color.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4">Upload Image</h2>
              
              {!preview ? (
                <label className="border-2 border-dashed border-border rounded-lg h-64 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-all">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground mb-1">Click or drag and drop</p>
                  <p className="text-xs text-muted-foreground">SVG, PNG, JPG (max. 5MB)</p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <div className="relative border rounded-lg overflow-hidden h-64">
                  <img
                    src={preview}
                    alt="Product preview"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setFile(null);
                        setPreview(null);
                        setAnalysis(null);
                      }}
                    >
                      Change Image
                    </Button>
                  </div>
                </div>
              )}
              
              <Button 
                className="w-full mt-4" 
                disabled={!file || analyzing}
                onClick={handleAnalyze}
              >
                {analyzing ? (
                  <>
                    <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Image'
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4">Analysis Results</h2>
              
              {analysis ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Award className="h-6 w-6 text-beauty-gold mt-0.5" />
                    <div>
                      <h3 className="font-medium">Product Identified</h3>
                      <p className="text-2xl text-beauty-purple font-medium">{analysis.productType}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Color Analysis</h3>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full border" 
                        style={{ backgroundColor: analysis.color }}
                      />
                      <span>{analysis.colorName} ({analysis.color})</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Image Properties</h3>
                    <ul className="space-y-2">
                      <li className="text-sm">Lighting: {analysis.lighting}</li>
                      <li className="text-sm">Angle: {analysis.angle}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Recommendations</h3>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {analysis.recommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                  <p>Upload and analyze an image to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ImageUpload;
