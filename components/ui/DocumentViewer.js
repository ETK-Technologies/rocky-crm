"use client";

import { useState, useEffect } from "react";

export default function DocumentViewer({
  documentUrl,
  fileName = "Document",
  className = "",
}) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Add timeout to handle cases where onLoad doesn't fire
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 3000); // 3 second timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div
      className={`border border-secondary-200 rounded-lg overflow-hidden ${className}`}
    >
      {/* PDF Viewer */}
      <div className="bg-white">
        {isLoading && (
          <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-secondary-600"></div>
            <span className="ml-2 text-sm sm:text-base text-secondary-600">
              Loading PDF...
            </span>
          </div>
        )}

        <iframe
          src={documentUrl}
          title={fileName}
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] border-0"
          onLoad={handleLoad}
          style={{ display: isLoading ? "none" : "block" }}
        />
      </div>
    </div>
  );
}
