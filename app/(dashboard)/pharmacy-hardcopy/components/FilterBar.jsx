import React from 'react';
import { Filters } from '@/components/ui';

const FilterBar = ({
    filters,
    onFilterChange,
    onReset,
    searchQuery,
    onSearchChange,
}) => {
    return (
        <Filters
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onReset}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
        />
    );
};

export default FilterBar; 