
import React from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface PhaseCardProps {
  phaseNumber: number;
  title: string;
  status: "complete" | "in-progress" | "planned";
  items: { text: string; done: boolean }[];
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phaseNumber, title, status, items }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>المرحلة {phaseNumber}: {title}</CardTitle>
            <CardDescription>
              {status === "complete" && "مكتملة"}
              {status === "in-progress" && "قيد التنفيذ"}
              {status === "planned" && "مخطط لها"}
            </CardDescription>
          </div>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
            status === "complete" ? "bg-green-100 text-green-600" : 
            status === "in-progress" ? "bg-amber-100 text-amber-600" : 
            "bg-slate-100 text-slate-500"
          }`}>
            {status === "complete" && <CheckCircle2 className="h-6 w-6" />}
            {status === "in-progress" && <Clock className="h-6 w-6" />}
            {status === "planned" && <span className="font-semibold">{phaseNumber}</span>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center ${
                item.done ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
              }`}>
                {item.done ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs">•</span>}
              </div>
              <span className={item.done ? "line-through text-muted-foreground" : ""}>{item.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PhaseCard;
