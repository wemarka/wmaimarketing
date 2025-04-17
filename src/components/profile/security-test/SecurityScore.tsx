
import React from "react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { SecurityCheck } from "./types";

interface SecurityScoreProps {
  securityChecks: SecurityCheck[];
  progress: number;
  isRunning: boolean;
}

const SecurityScore = ({ securityChecks, progress, isRunning }: SecurityScoreProps) => {
  if (!isRunning && progress === 0) return null;
  
  const completed = securityChecks.filter(check => check.status !== "pending" && check.status !== "running");
  if (completed.length === 0) return null;
  
  const passed = securityChecks.filter(check => check.status === "passed").length;
  const warnings = securityChecks.filter(check => check.status === "warning").length;
  const score = Math.round(((passed + (warnings * 0.5)) / securityChecks.length) * 100);
  
  let scoreClass = "text-red-500";
  if (score >= 70) scoreClass = "text-green-500";
  else if (score >= 40) scoreClass = "text-amber-500";
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-xl font-bold mb-2">
        درجة الأمان: <span className={scoreClass}>{score}%</span>
      </div>
      <Progress value={score} className="h-2 w-full" />
    </motion.div>
  );
};

export default SecurityScore;
