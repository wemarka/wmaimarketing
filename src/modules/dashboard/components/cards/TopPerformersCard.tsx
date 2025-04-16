
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopPerformersCard = () => {
  // Sample team members data
  const teamMembers = [
    { name: "محمد احمد", role: "مصمم", performance: 92, avatar: "", initials: "م أ", color: "bg-purple-500" },
    { name: "سارة علي", role: "مطور", performance: 86, avatar: "", initials: "س ع", color: "bg-blue-500" },
    { name: "أحمد خالد", role: "مسوق", performance: 79, avatar: "", initials: "أ خ", color: "bg-green-500" }
  ];

  return (
    <Card className="overflow-hidden border-none shadow-md h-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">أفضل المؤدين</h3>
        
        <div className="space-y-4">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 ml-3">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className={`${member.color} text-white`}>
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#3a7a89]" 
                    style={{ width: `${member.performance}%` }} 
                  />
                </div>
                <span className="ml-2 text-sm font-medium">{member.performance}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformersCard;
