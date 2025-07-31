"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

const QuickActionsFilter = ({
  actions,
  activeAction,
  onActionChange,
  className = "",
}) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkForArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkForArrows();
    window.addEventListener("resize", checkForArrows);
    return () => window.removeEventListener("resize", checkForArrows);
  }, []);

  const handleScroll = () => {
    checkForArrows();
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("relative", className)}>
      {showLeftArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-100"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div
        className="overflow-x-auto relative no-scrollbar"
        ref={scrollContainerRef}
        onScroll={handleScroll}
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div className="flex items-center relative min-w-max pl-0 pr-8">
          {actions.map((action) => (
            <div key={action} className="relative">
              <button
                onClick={() => onActionChange(action)}
                className={`font-medium transition-all duration-200 px-4 py-2 whitespace-nowrap relative ${
                  action === "All" ? "pl-0" : ""
                } ${
                  activeAction === action
                    ? "text-secondary-900"
                    : "text-secondary-500 hover:text-secondary-700"
                }`}
              >
                {action}
              </button>
              {activeAction === action && (
                <div
                  className="absolute h-0.5 bg-primary-600 z-20"
                  style={{
                    bottom: "-10px",
                    left: action === "All" ? "0" : "16px",
                    right: action === "All" ? "8px" : "16px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {showRightArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-100"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      <div className="relative mt-2 mb-6">
        <div className="h-px w-full bg-secondary-300" />
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default QuickActionsFilter;
