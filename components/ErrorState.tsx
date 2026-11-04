"use client";

import { getErrorMessage } from "@/lib/error/errorHandler";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  error: any;
  onRetry?: () => void;
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">

      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />

      <h2 className="text-xl font-semibold mb-2">
        Something went wrong
      </h2>

      <p className="text-gray-500 mb-6">
        {getErrorMessage(error)}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-primary-700 text-white px-5 py-2 rounded-md"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      )}

    </div>
  );
};

export default ErrorState;