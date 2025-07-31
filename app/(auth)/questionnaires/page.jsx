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
      <h1 className="text-2xl font-bold mb-6">
        Users Submitted Questionnaires
      </h1>

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
