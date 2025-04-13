
import React from "react";
import { TerminologyItem } from "./types";
import TermCard from "./TermCard";
import EditTermForm from "./EditTermForm";

interface TerminologyListProps {
  terms: TerminologyItem[];
  editingId: string | null;
  editForm: Omit<TerminologyItem, "id">;
  setEditForm: React.Dispatch<React.SetStateAction<Omit<TerminologyItem, "id">>>;
  onEdit: (term: TerminologyItem) => void;
  onSave: (id: string) => void;
  onDelete: (id: string) => void;
  onCancelEdit: () => void;
  searchTerm: string;
}

const TerminologyList: React.FC<TerminologyListProps> = ({
  terms,
  editingId,
  editForm,
  setEditForm,
  onEdit,
  onSave,
  onDelete,
  onCancelEdit,
  searchTerm
}) => {
  const filteredTerms = terms.filter(term => 
    term.term.includes(searchTerm) || 
    term.definition.includes(searchTerm) ||
    term.category.includes(searchTerm)
  );
  
  const categories = Array.from(new Set(terms.map(term => term.category)));

  if (filteredTerms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">لم يتم العثور على مصطلحات</p>
      </div>
    );
  }

  return (
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
                      <EditTermForm 
                        editForm={editForm}
                        setEditForm={setEditForm}
                        onSave={() => onSave(term.id)}
                        onCancel={onCancelEdit}
                        termId={term.id}
                      />
                    ) : (
                      <TermCard 
                        term={term} 
                        onEdit={onEdit} 
                        onDelete={onDelete} 
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Importing here to avoid circular dependency
import { Card, CardContent } from "@/components/ui/card";

export default TerminologyList;
