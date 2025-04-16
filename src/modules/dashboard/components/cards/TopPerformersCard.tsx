
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

const TopPerformersCard = () => {
  // Sample team members data with improved structure
  const teamMembers = [
    { name: "محمد احمد", role: "مصمم", performance: 92, avatar: "", initials: "م أ", color: "bg-purple-500" },
    { name: "سارة علي", role: "مطور", performance: 86, avatar: "", initials: "س ع", color: "bg-blue-500" },
    { name: "أحمد خالد", role: "مسوق", performance: 79, avatar: "", initials: "أ خ", color: "bg-green-500" },
    { name: "فاطمة محمود", role: "محلل", performance: 84, avatar: "", initials: "ف م", color: "bg-amber-500" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <Card className="overflow-hidden border-none shadow-md h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className={cn(
              "w-8 h-8 rounded-full bg-[#3a7a89]/10 flex items-center justify-center ml-3"
            )}>
              <Users className="h-4 w-4 text-[#3a7a89]" />
            </div>
            <h3 className="text-lg font-semibold text-[#3a7a89]">أفضل المؤدين</h3>
          </div>
          <div className="bg-[#f5f5f5] rounded-full py-1 px-3">
            <span className="text-xs text-gray-500">شهري</span>
          </div>
        </div>
        
        <motion.div 
          className="space-y-5"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {teamMembers.map((member, idx) => (
            <motion.div 
              key={idx} 
              variants={listItem}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <Avatar className="h-10 w-10 ml-3 border-2 border-gray-100 shadow-sm">
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
                <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden ml-2">
                  <motion.div 
                    className="h-full bg-[#3a7a89]" 
                    initial={{ width: 0 }}
                    animate={{ width: `${member.performance}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: "easeOut" }} 
                  />
                </div>
                <span className="text-sm font-medium">{member.performance}%</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-6 pt-4 border-t border-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <button className="text-sm text-[#3a7a89] hover:underline flex items-center justify-center w-full">
            عرض كل الفريق
          </button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default TopPerformersCard;
