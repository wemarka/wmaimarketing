
import React, { useState } from "react";
import { CheckCircle2, Clock, Circle, ChevronDown, ChevronUp, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TimelineItemProps {
  phase: string;
  duration: string;
  status: "complete" | "in-progress" | "planned";
  description?: string;
  startDate?: string;
  endDate?: string;
  tasks?: Array<{
    name: string;
    status: "complete" | "in-progress" | "pending";
    assignee?: string;
    priority?: "low" | "medium" | "high";
  }>;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  phase, 
  duration, 
  status, 
  description,
  startDate,
  endDate,
  tasks = []
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const completedTasks = tasks.filter(task => task.status === "complete").length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div className="border border-slate-100 rounded-lg transition-all duration-200 hover:shadow-sm mb-5">
      <div className="flex flex-col md:flex-row md:items-center p-4 rounded-md hover:bg-slate-50">
        <div className="flex items-center mb-2 md:mb-0">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
            status === "complete" ? "bg-green-100 text-green-600" : 
            status === "in-progress" ? "bg-amber-100 text-amber-600" : 
            "bg-slate-100 text-slate-500"
          }`}>
            {status === "complete" && <CheckCircle2 className="h-6 w-6" />}
            {status === "in-progress" && <Clock className="h-6 w-6" />}
            {status === "planned" && <Circle className="h-6 w-6" />}
          </div>
          <div className="ms-4 mr-auto">
            <p className="font-medium">{phase}</p>
            <p className="text-sm text-muted-foreground">{duration}</p>
          </div>
        </div>
        <div className="flex items-center ml-14 md:ml-auto">
          {description && (
            <p className="text-sm text-muted-foreground max-w-md mr-4 hidden md:block">{description}</p>
          )}
          <div className={`flex-shrink-0 text-sm font-medium px-3 py-1 rounded-full ${
            status === "complete" ? "bg-green-100 text-green-600" : 
            status === "in-progress" ? "bg-amber-100 text-amber-600" : 
            "bg-slate-100 text-slate-500"
          }`}>
            {status === "complete" && <span>مكتملة</span>}
            {status === "in-progress" && <span>قيد التنفيذ</span>}
            {status === "planned" && <span>مخطط لها</span>}
          </div>
        </div>
      </div>
      
      {description && (
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground mt-2 md:hidden ml-14">{description}</p>
          
          <div className="flex justify-end mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs flex items-center" 
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  <span>إخفاء التفاصيل</span>
                  <ChevronUp className="h-4 w-4 mr-1" />
                </>
              ) : (
                <>
                  <span>عرض التفاصيل</span>
                  <ChevronDown className="h-4 w-4 mr-1" />
                </>
              )}
            </Button>
          </div>
          
          {expanded && (
            <div className="bg-slate-50 p-4 rounded-md mt-2 text-sm border border-slate-100 animate-fade-in">
              <h4 className="font-medium mb-2">تفاصيل المرحلة</h4>
              <p>{description}</p>
              
              {/* Timeline dates */}
              {(startDate || endDate) && (
                <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-200">
                  {startDate && (
                    <div className="flex items-center text-slate-700">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-xs">تاريخ البدء: {startDate}</span>
                    </div>
                  )}
                  {endDate && (
                    <div className="flex items-center text-slate-700">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-xs">تاريخ الانتهاء المتوقع: {endDate}</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Tasks section */}
              {tasks.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className={`font-medium ${
                      status === "complete" ? "text-green-600" : 
                      status === "in-progress" ? "text-amber-600" : 
                      "text-slate-700"
                    }`}>
                      المهام ({completedTasks}/{totalTasks})
                    </h5>
                    <span className="text-xs text-muted-foreground">{progressPercentage}% مكتمل</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-3">
                    <div 
                      className={`h-full rounded-full ${
                        status === "complete" ? "bg-green-500" : 
                        status === "in-progress" ? "bg-amber-500" : 
                        "bg-slate-400"
                      }`} 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  
                  {/* Task list */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="tasks" className="border-none">
                      <AccordionTrigger className="py-2 text-sm hover:no-underline">
                        <span>قائمة المهام</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 mt-2">
                          {tasks.map((task, index) => (
                            <li key={index} className="flex items-start">
                              <div className={`mt-0.5 h-5 w-5 flex-shrink-0 rounded-full flex items-center justify-center ${
                                task.status === "complete" ? "bg-green-100 text-green-600" : 
                                task.status === "in-progress" ? "bg-amber-100 text-amber-600" : 
                                "bg-slate-100 text-slate-400"
                              }`}>
                                {task.status === "complete" ? 
                                  <CheckCircle2 className="h-3 w-3" /> : 
                                  task.status === "in-progress" ? 
                                  <Clock className="h-3 w-3" /> : 
                                  <Circle className="h-3 w-3" />
                                }
                              </div>
                              <div className="mr-2 flex-1">
                                <p className={`text-sm ${task.status === "complete" ? "line-through text-muted-foreground" : ""}`}>
                                  {task.name}
                                </p>
                                {(task.assignee || task.priority) && (
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {task.assignee && (
                                      <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">
                                        {task.assignee}
                                      </span>
                                    )}
                                    {task.priority && (
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        task.priority === "high" ? "bg-red-50 text-red-600" : 
                                        task.priority === "medium" ? "bg-amber-50 text-amber-600" : 
                                        "bg-blue-50 text-blue-600"
                                      }`}>
                                        {task.priority === "high" ? "أولوية عالية" : 
                                        task.priority === "medium" ? "أولوية متوسطة" : 
                                        "أولوية منخفضة"}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
              
              {/* Status specific content */}
              {status === "in-progress" && tasks.length === 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <h5 className="text-amber-600 font-medium">المهام الجارية:</h5>
                  <ul className="list-disc mr-5 mt-1 space-y-1">
                    <li>تطوير واجهة إدارة المستخدمين</li>
                    <li>إنشاء نظام الأدوار والصلاحيات</li>
                    <li>تطوير سجل نشاط المستخدمين</li>
                  </ul>
                </div>
              )}
              
              {status === "complete" && tasks.length === 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200 text-green-600">
                  <span className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span>اكتملت جميع المهام بنجاح</span>
                  </span>
                </div>
              )}
              
              {status === "planned" && tasks.length === 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center text-slate-700">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>لم يتم تخطيط المهام التفصيلية بعد</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimelineItem;
