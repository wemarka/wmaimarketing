
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

export interface EventType {
  id: string;
  name: string;
  description: string;
  category?: string;
}

interface EventTypeSelectorProps {
  eventTypes: EventType[];
  selectedEventTypes: string[];
  onSelectEventType: (ids: string[]) => void;
  title?: string;
  maxHeight?: string;
  showSearch?: boolean;
}

const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({
  eventTypes,
  selectedEventTypes,
  onSelectEventType,
  title = "اختر الأحداث",
  maxHeight = "400px",
  showSearch = true,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Group event types by category
  const eventsByCategory = React.useMemo(() => {
    const grouped: Record<string, EventType[]> = {};
    
    eventTypes.forEach((event) => {
      const category = event.category || 'عام';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(event);
    });
    
    return grouped;
  }, [eventTypes]);
  
  // Filter events based on search query
  const filteredEventTypes = React.useMemo(() => {
    if (!searchQuery.trim()) return eventsByCategory;
    
    const filtered: Record<string, EventType[]> = {};
    
    Object.keys(eventsByCategory).forEach(category => {
      const events = eventsByCategory[category].filter(
        event => 
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (events.length > 0) {
        filtered[category] = events;
      }
    });
    
    return filtered;
  }, [eventsByCategory, searchQuery]);
  
  const handleToggleEvent = (eventId: string) => {
    if (selectedEventTypes.includes(eventId)) {
      onSelectEventType(selectedEventTypes.filter(id => id !== eventId));
    } else {
      onSelectEventType([...selectedEventTypes, eventId]);
    }
  };
  
  const handleSelectAllInCategory = (category: string) => {
    const categoryEventIds = eventsByCategory[category].map(event => event.id);
    const allSelected = categoryEventIds.every(id => selectedEventTypes.includes(id));
    
    if (allSelected) {
      // Deselect all in category
      onSelectEventType(selectedEventTypes.filter(id => !categoryEventIds.includes(id)));
    } else {
      // Select all in category
      const newSelected = new Set([...selectedEventTypes, ...categoryEventIds]);
      onSelectEventType([...newSelected]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">{title}</h3>
      
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="البحث عن الأحداث..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
      
      <ScrollArea className={`rounded-md border p-2`} style={{ maxHeight }}>
        <div className="space-y-4 pr-4">
          {Object.keys(filteredEventTypes).length > 0 ? (
            Object.entries(filteredEventTypes).map(([category, events]) => (
              <div key={category} className="space-y-2">
                <div 
                  className="flex items-center justify-between cursor-pointer py-1"
                  onClick={() => handleSelectAllInCategory(category)}
                >
                  <h4 className="font-medium">{category}</h4>
                  <Badge variant="outline">
                    {events.filter(event => selectedEventTypes.includes(event.id)).length}/{events.length}
                  </Badge>
                </div>
                
                <div className="grid gap-2">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className={`flex items-start space-x-2 space-x-reverse border rounded-md p-2 ${
                        selectedEventTypes.includes(event.id)
                          ? 'bg-primary/5 border-primary/20'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleToggleEvent(event.id)}
                    >
                      <Checkbox
                        id={`event-${event.id}`}
                        checked={selectedEventTypes.includes(event.id)}
                        onCheckedChange={() => handleToggleEvent(event.id)}
                        className="mt-1 ml-2"
                      />
                      <div className="flex-1">
                        <label 
                          htmlFor={`event-${event.id}`}
                          className="font-medium cursor-pointer block"
                        >
                          {event.name}
                        </label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              لم يتم العثور على أحداث مطابقة
            </div>
          )}
        </div>
      </ScrollArea>
      
      {selectedEventTypes.length > 0 && (
        <div className="flex justify-between items-center text-sm">
          <span>تم اختيار {selectedEventTypes.length} من أصل {eventTypes.length}</span>
          <button 
            onClick={() => onSelectEventType([])}
            className="text-primary hover:underline"
          >
            إلغاء الاختيار
          </button>
        </div>
      )}
    </div>
  );
};

export default EventTypeSelector;
