
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Search, MoreVertical, ArrowUpDown, Tag } from "lucide-react";

interface ContentItem {
  id: number;
  title: string;
  type: string;
  campaign: string;
  product: string;
  status: string;
  created: string;
  scheduled: string | null;
}

interface ContentOrganizerProps {
  items?: ContentItem[];
}

const ContentOrganizer: React.FC<ContentOrganizerProps> = ({ 
  items = [] 
}) => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof ContentItem>("created");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Toggle selection of an item
  const toggleItemSelection = (id: number) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedItems(newSelection);
  };

  // Toggle selection of all items
  const toggleSelectAll = () => {
    if (selectedItems.size === filteredItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredItems.map(item => item.id)));
    }
  };

  // Handle sort
  const handleSort = (field: keyof ContentItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort items
  const filteredItems = items
    .filter(item => {
      if (!searchQuery) return true;
      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (aValue === null) aValue = '';
      if (bValue === null) bValue = '';
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === "asc" ? comparison : -comparison;
      }
      
      return sortDirection === "asc" 
        ? (aValue > bValue ? 1 : -1)
        : (aValue < bValue ? 1 : -1);
    });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>تنظيم المحتوى</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <TabsList>
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="campaigns">الحملات</TabsTrigger>
              <TabsTrigger value="products">المنتجات</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                <Input 
                  placeholder="بحث..." 
                  className="pl-8 w-[200px]"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>فلترة حسب</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>الحالة</DropdownMenuItem>
                  <DropdownMenuItem>النوع</DropdownMenuItem>
                  <DropdownMenuItem>التاريخ</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <TabsContent value="all">
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox
                        checked={selectedItems.size === filteredItems.length && filteredItems.length > 0}
                        onCheckedChange={toggleSelectAll}
                        aria-label="تحديد الكل"
                      />
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("title")}
                        className="flex items-center hover:bg-transparent p-0"
                      >
                        العنوان
                        <ArrowUpDown className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("campaign")}
                        className="flex items-center hover:bg-transparent p-0"
                      >
                        الحملة
                        <ArrowUpDown className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("product")}
                        className="flex items-center hover:bg-transparent p-0"
                      >
                        المنتج
                        <ArrowUpDown className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("scheduled")}
                        className="flex items-center hover:bg-transparent p-0"
                      >
                        التاريخ
                        <ArrowUpDown className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        لا توجد عناصر لعرضها
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedItems.has(item.id)}
                            onCheckedChange={() => toggleItemSelection(item.id)}
                            aria-label={`تحديد ${item.title}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Tag className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{item.campaign || "-"}</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.product || "-"}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.status === "مجدول" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                              item.status === "منشور" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                              item.status === "مسودة" ? "bg-slate-100 text-slate-800 hover:bg-slate-200" :
                              "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.scheduled || "-"}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>عرض</DropdownMenuItem>
                              <DropdownMenuItem>تعديل</DropdownMenuItem>
                              <DropdownMenuItem>جدولة</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">حذف</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="campaigns">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {['حملة الصيف', 'العودة للمدارس', 'عروض نهاية العام'].map((campaign) => (
                <Card key={campaign}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{campaign}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 10) + 1} منشور
                    </div>
                    <div className="mt-2 flex gap-1">
                      <Badge variant="outline">صور</Badge>
                      <Badge variant="outline">فيديو</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {['كريم الترطيب', 'مجموعة العناية بالشعر', 'أحمر الشفاه الجديد', 'قناع الوجه'].map((product) => (
                <Card key={product}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{product}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 8) + 1} منشور
                    </div>
                    <div className="mt-2 flex gap-1">
                      <Badge variant="outline">منشور</Badge>
                      <Badge variant="outline">إعلان</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentOrganizer;
