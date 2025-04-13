
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { TerminologyItem } from "./types";

interface EditTermFormProps {
  editForm: Omit<TerminologyItem, "id">;
  setEditForm: React.Dispatch<React.SetStateAction<Omit<TerminologyItem, "id">>>;
  onSave: () => void;
  onCancel: () => void;
  termId: string;
}

const EditTermForm: React.FC<EditTermFormProps> = ({ 
  editForm, 
  setEditForm, 
  onSave, 
  onCancel, 
  termId 
}) => {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor={`edit-term-${termId}`}>المصطلح</Label>
        <Input 
          id={`edit-term-${termId}`}
          value={editForm.term}
          onChange={(e) => setEditForm({...editForm, term: e.target.value})}
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor={`edit-category-${termId}`}>التصنيف</Label>
        <Input 
          id={`edit-category-${termId}`}
          value={editForm.category}
          onChange={(e) => setEditForm({...editForm, category: e.target.value})}
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor={`edit-definition-${termId}`}>التعريف</Label>
        <Textarea 
          id={`edit-definition-${termId}`}
          value={editForm.definition}
          onChange={(e) => setEditForm({...editForm, definition: e.target.value})}
          rows={2}
        />
      </div>
      
      <div className="flex justify-end gap-2 mt-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          إلغاء
        </Button>
        <Button size="sm" onClick={onSave}>
          <Save className="h-3.5 w-3.5 mr-1" />
          حفظ
        </Button>
      </div>
    </div>
  );
};

export default EditTermForm;
