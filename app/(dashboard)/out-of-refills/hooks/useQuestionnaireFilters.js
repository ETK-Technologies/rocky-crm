import { useState, useMemo } from 'react';
import { questionnaireData, provinceFilterOptions } from '../data/questionnaireData';

export const useQuestionnaireFilters = () => {
    const [filters, setFilters] = useState([
        {
            id: "created",
            type: "date-range",
            label: "Created",
            value: { start: null, end: null },
            placeholder: "Select date start",
        },
        {
            id: "updated",
            type: "date-range",
            label: "Updated",
            value: { start: null, end: null },
            placeholder: "Select date start",
        },
        {
            id: "province",
            type: "select",
            label: "Select Province",
            value: "",
            placeholder: "Select Province",
            options: provinceFilterOptions,
        },
        {
            id: "user",
            type: "search",
            label: "Search for a user",
            value: "",
            placeholder: "Search for a user",
        },
    ]);

    const [sortColumn, setSortColumn] = useState("date");
    const [sortDirection, setSortDirection] = useState("desc");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [activeStatusFilter, setActiveStatusFilter] = useState("All");
    const statusFilterActions = ["All", "Filled", "Unfilled"];

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleFilterReset = () => {
        setFilters(
            filters.map((filter) => ({
                ...filter,
                value: filter.type === "date-range" ? { start: null, end: null } : "",
            }))
        );
        setSearchQuery("");
        setActiveStatusFilter("All");
    };

    const handleSort = (columnId, direction) => {
        setSortColumn(columnId);
        setSortDirection(direction);
    };

    const filteredData = useMemo(() => {
        return questionnaireData
            .filter((questionnaire) => {
                // Apply status filter
                if (activeStatusFilter === "Filled" && questionnaire.status !== "Filled")
                    return false;
                if (activeStatusFilter === "Unfilled" && questionnaire.status !== "Unfilled")
                    return false;

                // Apply search filter (search by user name or questionnaire ID)
                if (searchQuery) {
                    const searchLower = searchQuery.toLowerCase();
                    const userMatch = questionnaire.user.name.toLowerCase().includes(searchLower);
                    const idMatch = questionnaire.user.questionnaireId.toString().includes(searchQuery);

                    if (!userMatch && !idMatch) return false;
                }

                // Apply user filter
                const userFilter = filters.find(f => f.id === "user");
                if (userFilter && userFilter.value) {
                    const userLower = userFilter.value.toLowerCase();
                    const userMatch = questionnaire.user.name.toLowerCase().includes(userLower);
                    const idMatch = questionnaire.user.questionnaireId.toString().includes(userFilter.value);

                    if (!userMatch && !idMatch) return false;
                }

                // Apply province filter
                const provinceFilter = filters.find(f => f.id === "province");
                if (provinceFilter && provinceFilter.value) {
                    const provinceOption = provinceFilterOptions.find(opt => opt.value === provinceFilter.value);
                    if (provinceOption && questionnaire.province !== provinceOption.label) return false;
                }

                // Apply date range filters
                const createdFilter = filters.find(f => f.id === "created");
                if (createdFilter && (createdFilter.value.start || createdFilter.value.end)) {
                    const createdDate = new Date(questionnaire.date.created);
                    if (createdFilter.value.start) {
                        const startDate = new Date(createdFilter.value.start);
                        if (createdDate < startDate) return false;
                    }
                    if (createdFilter.value.end) {
                        const endDate = new Date(createdFilter.value.end);
                        if (createdDate > endDate) return false;
                    }
                }

                const updatedFilter = filters.find(f => f.id === "updated");
                if (updatedFilter && (updatedFilter.value.start || updatedFilter.value.end)) {
                    // For updated filter, we'll use the updated timestamp
                    // Since we don't have exact updated dates, we'll skip this for now
                    // In a real implementation, you'd have actual updated timestamps
                }

                return true;
            })
            .sort((a, b) => {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];
                const modifier = sortDirection === "asc" ? 1 : -1;

                if (sortColumn === "date") {
                    // Sort by created date
                    return (new Date(a.date.created) - new Date(b.date.created)) * modifier;
                }

                if (typeof aValue === "string") {
                    return aValue.localeCompare(bValue) * modifier;
                }
                return (aValue - bValue) * modifier;
            });
    }, [filters, searchQuery, sortColumn, sortDirection, activeStatusFilter]);

    return {
        filters,
        setFilters,
        sortColumn,
        sortDirection,
        searchQuery,
        setSearchQuery,
        selectedRows,
        setSelectedRows,
        filteredData,
        activeStatusFilter,
        setActiveStatusFilter,
        statusFilterActions,
        handleFilterChange,
        handleFilterReset,
        handleSort,
    };
}; 