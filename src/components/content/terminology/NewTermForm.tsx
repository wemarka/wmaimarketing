
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { TerminologyItem } from "./types";

interface NewTermFormProps {
  newTerm: Omit<TerminologyItem, "id">;
  setNewTerm: React.Dispatch<React.SetStateAction<Omit<TerminologyItem, "id">>>;
  onSave: () => void;
  onCancel: () => void;
}

const NewTermForm: React.FC<NewTermFormProps> = ({ newTerm, setNewTerm, onSave, onCancel }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>مصطلح جديد</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
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
          <Button onClick={onSave}>حفظ المصطلح</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewTermForm;
