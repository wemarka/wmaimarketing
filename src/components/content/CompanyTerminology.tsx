
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { TerminologyItem, initialTerms } from "./terminology/types";
import NewTermForm from "./terminology/NewTermForm";
import TerminologyList from "./terminology/TerminologyList";

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
        <NewTermForm
          newTerm={newTerm}
          setNewTerm={setNewTerm}
          onSave={handleAddNew}
          onCancel={() => setIsAdding(false)}
        />
      )}
      
      <TerminologyList 
        terms={terms}
        editingId={editingId}
        editForm={editForm}
        setEditForm={setEditForm}
        onEdit={handleEdit}
        onSave={handleSaveEdit}
        onDelete={handleDelete}
        onCancelEdit={() => setEditingId(null)}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default CompanyTerminology;
