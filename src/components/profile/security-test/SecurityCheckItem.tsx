
import React from "react";
import { CheckCircle2, XCircle, AlertTriangle, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { SecurityCheck } from "./types";

interface SecurityCheckItemProps {
  check: SecurityCheck;
}

const SecurityCheckItem = ({ check }: SecurityCheckItemProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case "passed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-300" />;
    }
  };

  return (
    <motion.div
      key={check.id}
      className={`flex items-start gap-3 p-3 rounded-md border ${
        check.status === "running" ? "border-blue-200 bg-blue-50" :
        check.status === "passed" ? "border-green-200 bg-green-50" : 
        check.status === "warning" ? "border-amber-200 bg-amber-50" :
        check.status === "failed" ? "border-red-200 bg-red-50" :
        "border-gray-200"
      }`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mt-0.5">
        {getStatusIcon(check.status)}
      </div>
      <div>
        <div className="font-medium">{check.name}</div>
        {check.message && (
          <p className="text-sm mt-1">
            {check.message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default SecurityCheckItem;
