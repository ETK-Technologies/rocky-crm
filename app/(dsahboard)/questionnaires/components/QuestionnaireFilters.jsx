"use client";

import { Filters } from "@/components/ui";
import { useState } from "react";

const QuestionnaireFilters = ({
  onFiltersChange,
  onCategoryChange,
  onSearchChange,
}) => {
  const [filters, setFilters] = useState([
    {
      id: "created",
      type: "date-range",
      label: "Created",
      placeholder: "Select date range",
      value: { start: null, end: null },
    },
    {
      id: "updated",
      type: "date-range",
      label: "Updated",
      placeholder: "Select date range",
      value: { start: null, end: null },
    },
    {
      id: "province",
      type: "select",
      label: "Select Province",
      placeholder: "Select Province",
      value: "",
      options: [
        { value: "british-columbia", label: "British Columbia" },
        { value: "alberta", label: "Alberta" },
        { value: "ontario", label: "Ontario" },
        { value: "quebec", label: "Quebec" },
        { value: "nova-scotia", label: "Nova Scotia" },
        { value: "new-brunswick", label: "New Brunswick" },
      ],
    },
    {
      id: "tag",
      type: "select",
      label: "Select Tag",
      placeholder: "Select Tag",
      value: "",
      options: [
        { value: "out-of-refills", label: "Out of refills" },
        { value: "flagged", label: "Flagged" },
        { value: "unverified-missing-id", label: "Unverified, Missing ID" },
        {
          value: "needs-immediate-attention",
          label: "Needs Immediate Attention",
        },
        { value: "delayed", label: "Delayed" },
        {
          value: "missing-or-incomplete-questionnaire",
          label: "Missing or Incomplete Questionnaire",
        },
        { value: "pending-consent", label: "Pending Consent" },
        { value: "possible-dose-change", label: "Possible Dose Change" },
        { value: "pending-consultation", label: "Pending Consultation" },
        {
          value: "pending-response-from-patient",
          label: "Pending Response from Patient",
        },
        {
          value: "special-delivery-instructions",
          label: "Special Delivery Instructions",
        },
        { value: "duplicate", label: "Duplicate" },
      ],
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "ED",
    "Hair",
    "Mental Health",
    "Weight Loss",
    "Weight Loss (Consented)",
    "Smoking Cessation",
    "Slow Mine",
    "Show Pending",
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleFilterReset = () => {
    const resetFilters = filters.map((filter) => ({
      ...filter,
      value: filter.type === "date-range" ? { start: null, end: null } : "",
    }));
    setFilters(resetFilters);
    setSearchQuery("");
    setActiveCategory("All");
    onFiltersChange?.(resetFilters);
    onCategoryChange?.("All");
    onSearchChange?.("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  const handleApply = () => {
    onFiltersChange?.(filters);
  };

  return (
    <div className="space-y-4">
      {/* Advanced Filters */}
      <div>
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleFilterReset}
          onApply={handleApply}
          className="border-0 shadow-none bg-transparent"
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
        />
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex items-center relative">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`font-medium transition-all duration-200 relative px-4 py-2 ${
                activeCategory === category
                  ? "text-secondary-900"
                  : "text-secondary-500 hover:text-secondary-700"
              }`}
            >
              {category}
              {activeCategory === category && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary-600 -mx-1 z-10"></div>
              )}
            </button>
          ))}
        </div>
        <div className="h-px bg-secondary-300 mt-2"></div>
      </div>
    </div>
  );
};

export default QuestionnaireFilters;
