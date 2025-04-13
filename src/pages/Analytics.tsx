
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, Users, Eye, MousePointerClick, ShoppingBag } from "lucide-react";

// Sample data for charts
const viewsData = [
  { name: "Apr 7", value: 420 },
  { name: "Apr 8", value: 380 },
  { name: "Apr 9", value: 510 },
  { name: "Apr 10", value: 620 },
  { name: "Apr 11", value: 750 },
  { name: "Apr 12", value: 830 },
  { name: "Apr 13", value: 920 },
];

const engagementData = [
  { name: "Apr 7", likes: 140, comments: 32, shares: 18 },
  { name: "Apr 8", likes: 120, comments: 28, shares: 15 },
  { name: "Apr 9", likes: 180, comments: 35, shares: 24 },
  { name: "Apr 10", likes: 220, comments: 42, shares: 31 },
  { name: "Apr 11", likes: 280, comments: 55, shares: 40 },
  { name: "Apr 12", likes: 310, comments: 60, shares: 45 },
  { name: "Apr 13", likes: 350, comments: 68, shares: 52 },
];

const Analytics = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="mb-1">Analytics Dashboard</h1>
            <p className="text-muted-foreground max-w-2xl">
              Track your marketing performance and understand what resonates with your audience.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select defaultValue="7days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Impressions</p>
                  <p className="text-2xl font-semibold">4,238</p>
                  <div className="flex items-center mt-1 text-green-600 text-sm">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>12% from last week</span>
                  </div>
                </div>
                <div className="bg-beauty-pink/20 p-2 rounded-md">
                  <Eye className="h-5 w-5 text-beauty-pink" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Engagement Rate</p>
                  <p className="text-2xl font-semibold">5.2%</p>
                  <div className="flex items-center mt-1 text-green-600 text-sm">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>2.4% from last week</span>
                  </div>
                </div>
                <div className="bg-beauty-purple/20 p-2 rounded-md">
                  <Users className="h-5 w-5 text-beauty-purple" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Click Rate</p>
                  <p className="text-2xl font-semibold">2.8%</p>
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    <span>0.5% from last week</span>
                  </div>
                </div>
                <div className="bg-beauty-gold/20 p-2 rounded-md">
                  <MousePointerClick className="h-5 w-5 text-beauty-gold" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Conversions</p>
                  <p className="text-2xl font-semibold">156</p>
                  <div className="flex items-center mt-1 text-green-600 text-sm">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>8% from last week</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-2 rounded-md">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Audience Growth</CardTitle>
              <CardDescription>Daily impressions over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#9b87f5" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Platform Breakdown</CardTitle>
              <CardDescription>Content performance by platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 ">
                      <div className="bg-pink-100 p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4 w-4 text-pink-600">
                          <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                      </div>
                      <span>Instagram</span>
                    </div>
                    <span className="font-medium">64%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 rounded-full" style={{ width: "64%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-4 w-4 text-blue-600">
                          <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                        </svg>
                      </div>
                      <span>Facebook</span>
                    </div>
                    <span className="font-medium">26%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "26%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4 w-4 text-gray-700">
                          <path fill="currentColor" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                        </svg>
                      </div>
                      <span>TikTok</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gray-700 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>Likes, comments and shares over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chart">
              <TabsList className="mb-4">
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="detail">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chart">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="likes" stackId="a" fill="#9b87f5" name="Likes" />
                    <Bar dataKey="comments" stackId="a" fill="#FFD6E0" name="Comments" />
                    <Bar dataKey="shares" stackId="a" fill="#D4AF37" name="Shares" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="detail">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">Likes</th>
                        <th className="text-left p-3">Comments</th>
                        <th className="text-left p-3">Shares</th>
                        <th className="text-left p-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {engagementData.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3">{item.name}</td>
                          <td className="p-3">{item.likes}</td>
                          <td className="p-3">{item.comments}</td>
                          <td className="p-3">{item.shares}</td>
                          <td className="p-3 font-medium">{item.likes + item.comments + item.shares}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;
