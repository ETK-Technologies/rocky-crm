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
      {/* Category Filters */}
      <div className="bg-white rounded-lg border border-secondary-200 p-4 shadow-sm">
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-secondary-700 mb-3">
            Quick Filters
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary-600 text-white shadow-md"
                  : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200 hover:text-secondary-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-lg border border-secondary-200 shadow-sm">
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
    </div>
  );
};

export default QuestionnaireFilters;
