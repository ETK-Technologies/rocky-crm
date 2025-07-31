"use client";

import { useState } from "react";
import QuestionnaireFilters from "./components/QuestionnaireFilters";
import QuestionnaireTable from "./components/QuestionnaireTable";

const QuestionnairesPage = () => {
  const [filters, setFilters] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl">
            <svg
              className="w-6 h-6 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">
              Users Submitted Questionnaires
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1 h-4 bg-primary-600 rounded-full"></div>
              <p className="text-secondary-600 text-sm">
                Manage and review all submitted questionnaire responses
              </p>
            </div>
          </div>
        </div>
      </div>

      <QuestionnaireFilters
        onFiltersChange={handleFiltersChange}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />

      <div className="mt-8">
        <QuestionnaireTable
          filters={filters}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default QuestionnairesPage;
