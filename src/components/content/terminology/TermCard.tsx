
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { TerminologyItem } from "./types";

interface TermCardProps {
  term: TerminologyItem;
  onEdit: (term: TerminologyItem) => void;
  onDelete: (id: string) => void;
}

const TermCard: React.FC<TermCardProps> = ({ term, onEdit, onDelete }) => {
  return (
    <Card key={term.id}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-lg">{term.term}</h4>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(term)}>
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(term.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{term.definition}</p>
      </CardContent>
    </Card>
  );
};

export default TermCard;
