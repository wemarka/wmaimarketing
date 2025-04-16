
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopPerformersCard = () => {
  const performers = [
    {
      name: "Bessie Cooper",
      role: "Director",
      avatar: null,
      initials: "BC",
      rating: 4.5
    },
    {
      name: "Albert Flores",
      role: "Designer",
      avatar: null,
      initials: "AF",
      rating: 4.7
    },
    {
      name: "Guy Hawkins",
      role: "Development lead",
      avatar: null,
      initials: "GH",
      rating: 4.4
    }
  ];

  return (
    <Card className="overflow-hidden border-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">TOP performers</h3>
        
        <div className="space-y-4">
          {performers.map((performer, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={performer.avatar || undefined} />
                  <AvatarFallback className="bg-[#3a7a89]/10 text-[#3a7a89]">
                    {performer.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">{performer.name}</p>
                  <p className="text-xs text-gray-500">{performer.role}</p>
                </div>
              </div>
              <div className="text-lg font-semibold text-[#3a7a89]">
                {performer.rating}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformersCard;
