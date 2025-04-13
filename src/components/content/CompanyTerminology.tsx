
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Search, Edit, Save, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TerminologyItem {
  id: string;
  term: string;
  definition: string;
  category: string;
}

const initialTerms: TerminologyItem[] = [
  { id: "1", term: "جمال طبيعي", definition: "مظهر طبيعي وصحي دون استخدام مستحضرات تجميل ظاهرة", category: "مفاهيم عامة" },
  { id: "2", term: "نضارة البشرة", definition: "بشرة صحية ومشرقة ومرطبة", category: "العناية بالبشرة" },
  { id: "3", term: "ترطيب عميق", definition: "ترطيب يصل إلى الطبقات العميقة من البشرة", category: "العناية بالبشرة" },
  { id: "4", term: "مستحضرات خالية من البارابين", definition: "منتجات لا تحتوي على مواد حافظة صناعية تعرف باسم البارابين", category: "مكونات" },
  { id: "5", term: "تغذية الشعر", definition: "توفير العناصر الغذائية اللازمة لصحة الشعر", category: "العناية بالشعر" },
];

const CompanyTerminology: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [terms, setTerms] = useState<TerminologyItem[]>(initialTerms);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTerm, setNewTerm] = useState({ term: "", definition: "", category: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ term: "", definition: "", category: "" });
  
  const handleAddNew = () => {
    if (!newTerm.term || !newTerm.definition || !newTerm.category) {
      toast({
        title: "حقول مطلوبة",
        description: "جميع الحقول مطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    const id = Date.now().toString();
    setTerms([...terms, { ...newTerm, id }]);
    setNewTerm({ term: "", definition: "", category: "" });
    setIsAdding(false);
    
    toast({
      title: "تمت الإضافة",
      description: "تمت إضافة المصطلح بنجاح",
    });
  };
  
  const handleEdit = (term: TerminologyItem) => {
    setEditingId(term.id);
    setEditForm({
      term: term.term,
      definition: term.definition,
      category: term.category,
    });
  };
  
  const handleSaveEdit = (id: string) => {
    if (!editForm.term || !editForm.definition || !editForm.category) {
      toast({
        title: "حقول مطلوبة",
        description: "جميع الحقول مطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    setTerms(terms.map(term => term.id === id ? { ...term, ...editForm } : term));
    setEditingId(null);
    
    toast({
      title: "تم التعديل",
      description: "تم تعديل المصطلح بنجاح",
    });
  };
  
  const handleDelete = (id: string) => {
    setTerms(terms.filter(term => term.id !== id));
    
    toast({
      title: "تم الحذف",
      description: "تم حذف المصطلح بنجاح",
    });
  };
  
  const filteredTerms = terms.filter(term => 
    term.term.includes(searchTerm) || 
    term.definition.includes(searchTerm) ||
    term.category.includes(searchTerm)
  );
  
  const categories = Array.from(new Set(terms.map(term => term.category)));

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">قاموس مصطلحات الشركة</h2>
          <p className="text-muted-foreground">
            إدارة وتنظيم المصطلحات والكلمات المفتاحية الخاصة بالعلامة التجارية
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن مصطلح..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Button onClick={() => setIsAdding(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            إضافة مصطلح
          </Button>
        </div>
      </div>
      
      {isAdding && (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>مصطلح جديد</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-term">المصطلح</Label>
                <Input 
                  id="new-term"
                  value={newTerm.term}
                  onChange={(e) => setNewTerm({...newTerm, term: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-category">التصنيف</Label>
                <Input 
                  id="new-category"
                  value={newTerm.category}
                  onChange={(e) => setNewTerm({...newTerm, category: e.target.value})}
                  placeholder="مثال: العناية بالبشرة، مكونات، إلخ"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="new-definition">التعريف</Label>
                <Textarea 
                  id="new-definition"
                  value={newTerm.definition}
                  onChange={(e) => setNewTerm({...newTerm, definition: e.target.value})}
                  rows={2}
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button onClick={handleAddNew}>حفظ المصطلح</Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-8">
        {categories.map(category => {
          const categoryTerms = filteredTerms.filter(term => term.category === category);
          if (categoryTerms.length === 0) return null;
          
          return (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-semibold">{category}</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {categoryTerms.map(term => (
                  <Card key={term.id}>
                    <CardContent className="p-4">
                      {editingId === term.id ? (
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Label htmlFor={`edit-term-${term.id}`}>المصطلح</Label>
                            <Input 
                              id={`edit-term-${term.id}`}
                              value={editForm.term}
                              onChange={(e) => setEditForm({...editForm, term: e.target.value})}
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <Label htmlFor={`edit-category-${term.id}`}>التصنيف</Label>
                            <Input 
                              id={`edit-category-${term.id}`}
                              value={editForm.category}
                              onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <Label htmlFor={`edit-definition-${term.id}`}>التعريف</Label>
                            <Textarea 
                              id={`edit-definition-${term.id}`}
                              value={editForm.definition}
                              onChange={(e) => setEditForm({...editForm, definition: e.target.value})}
                              rows={2}
                            />
                          </div>
                          
                          <div className="flex justify-end gap-2 mt-2">
                            <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                              إلغاء
                            </Button>
                            <Button size="sm" onClick={() => handleSaveEdit(term.id)}>
                              <Save className="h-3.5 w-3.5 mr-1" />
                              حفظ
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-lg">{term.term}</h4>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(term)}>
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDelete(term.id)}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{term.definition}</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
        
        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لم يتم العثور على مصطلحات</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyTerminology;
