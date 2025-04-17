
import React, { useState, useMemo } from 'react';
import { Search, Check, ChevronDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export interface EventType {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface EventTypeSelectorProps {
  eventTypes: EventType[];
  selectedEventTypes: string[];
  onSelectEventType: (eventTypes: string[]) => void;
}

const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({
  eventTypes,
  selectedEventTypes,
  onSelectEventType
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  // Group events by category
  const eventsByCategory = useMemo(() => {
    const categories: Record<string, EventType[]> = {};
    
    eventTypes.forEach(event => {
      if (!categories[event.category]) {
        categories[event.category] = [];
      }
      categories[event.category].push(event);
    });
    
    return categories;
  }, [eventTypes]);
  
  // Filtered events based on search
  const filteredEventsByCategory = useMemo(() => {
    if (!searchQuery.trim()) {
      return eventsByCategory;
    }
    
    const result: Record<string, EventType[]> = {};
    
    Object.keys(eventsByCategory).forEach(category => {
      const filteredEvents = eventsByCategory[category].filter(
        event => 
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (filteredEvents.length > 0) {
        result[category] = filteredEvents;
      }
    });
    
    return result;
  }, [eventsByCategory, searchQuery]);
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  const toggleEventSelection = (eventId: string) => {
    if (selectedEventTypes.includes(eventId)) {
      onSelectEventType(selectedEventTypes.filter(id => id !== eventId));
    } else {
      onSelectEventType([...selectedEventTypes, eventId]);
    }
  };
  
  const selectAllInCategory = (category: string) => {
    const categoryEventIds = eventsByCategory[category].map(event => event.id);
    const currentlySelected = new Set(selectedEventTypes);
    const allInCategorySelected = categoryEventIds.every(id => currentlySelected.has(id));
    
    if (allInCategorySelected) {
      // Deselect all in this category
      onSelectEventType(selectedEventTypes.filter(id => !categoryEventIds.includes(id)));
    } else {
      // Select all in this category
      const newSelected = new Set([...selectedEventTypes, ...categoryEventIds]);
      onSelectEventType([...newSelected]);
    }
  };
  
  const clearSelection = () => {
    onSelectEventType([]);
  };
  
  const selectAll = () => {
    const allEventIds = eventTypes.map(event => event.id);
    onSelectEventType(allEventIds);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">أنواع الأحداث</label>
        <p className="text-xs text-muted-foreground mb-2">حدد أنواع الأحداث التي تريد استلام إشعارات لها</p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث عن نوع حدث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2">
          {selectedEventTypes.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearSelection}
              className="text-xs"
            >
              مسح التحديد ({selectedEventTypes.length})
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={selectAll}
            className="text-xs"
          >
            تحديد الكل
          </Button>
        </div>
      </div>
      
      {Object.keys(filteredEventsByCategory).length === 0 ? (
        <div className="text-center py-6 border rounded-md border-dashed">
          <p className="text-muted-foreground">لا توجد أحداث تطابق بحثك</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 pt-1 pb-1">
          {Object.keys(filteredEventsByCategory).map((category) => {
            const categoryEvents = filteredEventsByCategory[category];
            const allSelected = categoryEvents.every(event => 
              selectedEventTypes.includes(event.id)
            );
            const someSelected = categoryEvents.some(event => 
              selectedEventTypes.includes(event.id)
            ) && !allSelected;
            
            return (
              <Collapsible 
                key={category}
                open={expandedCategories[category] || searchQuery.length > 0}
                onOpenChange={() => toggleCategory(category)}
                className="border rounded-md overflow-hidden"
              >
                <CollapsibleTrigger asChild>
                  <div 
                    className={cn(
                      "flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors",
                      (expandedCategories[category] || searchQuery.length > 0) ? "border-b" : ""
                    )}
                    onClick={(e) => {
                      // Prevent this click from toggling the collapsible
                      e.stopPropagation();
                      toggleCategory(category);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className={cn(
                          "h-5 w-5 rounded border flex items-center justify-center",
                          allSelected ? "bg-primary border-primary" : someSelected ? "bg-primary/30 border-primary/30" : "bg-transparent"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectAllInCategory(category);
                        }}
                      >
                        {(allSelected || someSelected) && (
                          <Check className={cn("h-3 w-3", allSelected ? "text-white" : "text-white")} />
                        )}
                      </div>
                      <div className="font-medium">{category}</div>
                      <Badge variant="outline" className="text-xs">
                        {categoryEvents.length}
                      </Badge>
                    </div>
                    <ChevronDown 
                      className={cn(
                        "h-4 w-4 transition-transform", 
                        (expandedCategories[category] || searchQuery.length > 0) ? "transform rotate-180" : ""
                      )} 
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-1">
                    {categoryEvents.map((event) => (
                      <div 
                        key={event.id}
                        className={cn(
                          "flex items-center gap-3 p-3 hover:bg-muted/30 rounded-md cursor-pointer transition-colors",
                          selectedEventTypes.includes(event.id) ? "bg-muted/20" : ""
                        )}
                        onClick={() => toggleEventSelection(event.id)}
                      >
                        <div 
                          className={cn(
                            "h-5 w-5 rounded border flex items-center justify-center",
                            selectedEventTypes.includes(event.id) ? "bg-primary border-primary" : "bg-transparent"
                          )}
                        >
                          {selectedEventTypes.includes(event.id) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{event.name}</div>
                          <div className="text-xs text-muted-foreground">{event.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      )}
      
      {selectedEventTypes.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2 border-t pt-3">
          <div className="text-sm font-medium ml-2 self-center">الأحداث المحددة:</div>
          {selectedEventTypes.map(id => {
            const event = eventTypes.find(e => e.id === id);
            return event ? (
              <Badge 
                key={id} 
                variant="secondary"
                className="px-2 py-1 flex items-center gap-1"
              >
                {event.name}
                <button 
                  className="ml-1 hover:bg-muted rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleEventSelection(id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </Badge>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default EventTypeSelector;
