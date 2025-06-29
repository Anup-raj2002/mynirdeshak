import React from "react";
import { Loader2 } from "lucide-react";

const LoadingPage = ({ text = "Loading..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700">
      <Loader2 className="animate-spin w-8 h-8 text-blue-600 mb-4" />
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};

export default LoadingPage;
