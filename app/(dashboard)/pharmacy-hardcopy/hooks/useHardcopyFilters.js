import { useState, useMemo } from 'react';
import { hardcopyData, productFilterOptions } from '../data/hardcopyData';

export const useHardcopyFilters = () => {
    const [filters, setFilters] = useState([
        {
            id: "hardcopyDate",
            type: "date-range",
            label: "Hardcopy Date",
            value: { start: null, end: null },
            placeholder: "Select date",
        },
        {
            id: "product",
            type: "select",
            label: "Product",
            value: "",
            placeholder: "Select Product",
            options: productFilterOptions,
        },
        {
            id: "orderStatus",
            type: "select",
            label: "Order Status",
            value: "",
            placeholder: "Select Status",
            options: [
                { value: "shipped", label: "Shipped" },
                { value: "processing", label: "Processing" },
                { value: "pending", label: "Pending" },
            ],
        },
    ]);

    const [sortColumn, setSortColumn] = useState("hardcopyDate");
    const [sortDirection, setSortDirection] = useState("desc");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);

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
    };

    const handleSort = (columnId, direction) => {
        setSortColumn(columnId);
        setSortDirection(direction);
    };

    const filteredData = useMemo(() => {
        return hardcopyData
            .filter((hardcopy) => {
                // Apply search filter (search by patient name, rx number, or medication names)
                if (searchQuery) {
                    const searchLower = searchQuery.toLowerCase();
                    const patientMatch =
                        hardcopy.patient.name.toLowerCase().includes(searchLower) ||
                        hardcopy.patient.rxNumber.includes(searchQuery);

                    const medicationMatch = hardcopy.medications.some(med =>
                        med.name.toLowerCase().includes(searchLower)
                    );

                    if (!patientMatch && !medicationMatch) return false;
                }

                // Apply product filter
                const productFilter = filters.find(f => f.id === "product");
                if (productFilter && productFilter.value) {
                    const hasMatchingProduct = hardcopy.medications.some(med => {
                        const productOption = productFilterOptions.find(opt => opt.value === productFilter.value);
                        return productOption && med.name === productOption.label;
                    });
                    if (!hasMatchingProduct) return false;
                }

                // Apply order status filter
                const statusFilter = filters.find(f => f.id === "orderStatus");
                if (statusFilter && statusFilter.value) {
                    if (hardcopy.order.status.toLowerCase() !== statusFilter.value) return false;
                }

                // Apply date range filter
                const dateFilter = filters.find(f => f.id === "hardcopyDate");
                if (dateFilter && (dateFilter.value.start || dateFilter.value.end)) {
                    const hardcopyDate = new Date(hardcopy.hardcopyDate);
                    if (dateFilter.value.start) {
                        const startDate = new Date(dateFilter.value.start);
                        if (hardcopyDate < startDate) return false;
                    }
                    if (dateFilter.value.end) {
                        const endDate = new Date(dateFilter.value.end);
                        if (hardcopyDate > endDate) return false;
                    }
                }

                return true;
            })
            .sort((a, b) => {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];
                const modifier = sortDirection === "asc" ? 1 : -1;

                if (sortColumn === "hardcopyDate") {
                    return (new Date(aValue) - new Date(bValue)) * modifier;
                }

                if (typeof aValue === "string") {
                    return aValue.localeCompare(bValue) * modifier;
                }
                return (aValue - bValue) * modifier;
            });
    }, [filters, searchQuery, sortColumn, sortDirection]);

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
        handleFilterChange,
        handleFilterReset,
        handleSort,
    };
}; 