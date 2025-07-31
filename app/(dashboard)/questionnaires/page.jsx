"use client";

import { useState } from "react";
import QuestionnaireFilters from "./components/QuestionnaireFilters";
import QuestionnaireTable from "./components/QuestionnaireTable";
import Icons from "@/components/icons";
import { PageHeader } from "@/components/ui";

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
        <PageHeader
          icon={Icons.Forms}
          title="Users Submitted Questionnaires"
          description="Manage and review all submitted questionnaire responses"
        />
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
