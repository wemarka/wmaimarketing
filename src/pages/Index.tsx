
import React from "react";
import Layout from "@/components/layout/Layout";
import FeatureCard from "@/components/dashboard/FeatureCard";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingPosts from "@/components/dashboard/UpcomingPosts";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Image, 
  FileText, 
  Video, 
  CalendarDays,
  BarChart,
  Eye, 
  Heart,
  MousePointerClick
} from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1>Beauty AI Marketing Suite</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            The all-in-one AI-powered marketing platform for beauty products
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Eye className="h-5 w-5 text-beauty-purple" />}
            title="Total Impressions"
            value="15.2K"
            change="12%"
            positive={true}
          />
          <StatCard
            icon={<Heart className="h-5 w-5 text-beauty-pink" />}
            title="Engagement Rate"
            value="4.8%"
            change="0.5%"
            positive={true}
          />
          <StatCard
            icon={<MousePointerClick className="h-5 w-5 text-beauty-gold" />}
            title="Conversion Rate"
            value="2.1%"
            change="0.2%"
            positive={false}
          />
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Features</h2>
          <Button variant="outline">View All</Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <FeatureCard
            icon={<Upload className="h-5 w-5" />}
            title="Product Image Upload & Analysis"
            description="Upload product images and get AI analysis of colors, angles, and product details."
            href="/image-upload"
            iconColor="bg-beauty-pink/20 text-beauty-pink"
          />
          <FeatureCard
            icon={<Image className="h-5 w-5" />}
            title="AI Ad Image Generator"
            description="Create stunning marketing images with customizable styles and backgrounds."
            href="/ad-generator"
            iconColor="bg-beauty-purple/20 text-beauty-purple"
          />
          <FeatureCard
            icon={<FileText className="h-5 w-5" />}
            title="Content Creator"
            description="Generate platform-specific captions and hashtags in multiple languages."
            href="/content-creator"
            iconColor="bg-beauty-gold/20 text-beauty-gold"
          />
          <FeatureCard
            icon={<Video className="h-5 w-5" />}
            title="Video Generator"
            description="Create short marketing videos with motion text, effects, and music."
            href="/video-generator"
            iconColor="bg-blue-100 text-blue-600"
          />
          <FeatureCard
            icon={<CalendarDays className="h-5 w-5" />}
            title="Publishing & Scheduler"
            description="Schedule and publish your content across multiple social platforms."
            href="/scheduler"
            iconColor="bg-green-100 text-green-700"
          />
          <FeatureCard
            icon={<BarChart className="h-5 w-5" />}
            title="Performance Analytics"
            description="Track engagement, reach, and conversion metrics for your campaigns."
            href="/analytics"
            iconColor="bg-purple-100 text-purple-700"
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <RecentActivity />
          <UpcomingPosts />
        </div>
        
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="bg-beauty-purple/10 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Upgrade to Pro</h3>
                <p className="text-muted-foreground">
                  Get access to unlimited AI generations, advanced analytics, and priority support
                </p>
              </div>
              <Button>Upgrade Now</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t divide-x">
            <div className="p-4 text-center">
              <p className="text-2xl font-semibold mb-1">50+</p>
              <p className="text-sm text-muted-foreground">AI templates</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-semibold mb-1">Unlimited</p>
              <p className="text-sm text-muted-foreground">Content generation</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-semibold mb-1">Priority</p>
              <p className="text-sm text-muted-foreground">Support & updates</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
