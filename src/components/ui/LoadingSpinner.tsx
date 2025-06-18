import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  message 
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  return (
    <div className="text-center">
      <div className={`animate-spin ${sizeClasses[size]} border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4`}></div>
      {message && <p className="text-gray-300">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;