import React from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorAlertProps {
  error: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  return (
    <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
        <p className="text-red-300">{error}</p>
      </div>
    </div>
  );
};

export default ErrorAlert;