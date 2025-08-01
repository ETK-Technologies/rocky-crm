import { useState, useMemo } from "react";

const defaultFilters = {
    status: "All",
    province: "All",
    orderType: "All",
    product: "All",
    category: "All",
    createdDateFrom: "",
    createdDateTo: "",
    updatedDateFrom: "",
    updatedDateTo: "",
    search: "",
};

function useOrderFilters(data) {
    const [filters, setFilters] = useState(defaultFilters);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const filteredOrders = useMemo(() => {
        let filtered = [...data];

        if (filters.status !== "All") {
            filtered = filtered.filter(order => order.status === filters.status);
        }
        if (filters.province !== "All") {
            filtered = filtered.filter(order => order.province === filters.province);
        }
        if (filters.orderType !== "All") {
            filtered = filtered.filter(order => order.orderType === filters.orderType);
        }
        if (filters.product !== "All") {
            filtered = filtered.filter(order => order.product === filters.product);
        }
        if (filters.category && filters.category !== "All") {
            filtered = filtered.filter(order => order.category === filters.category);
        }
        if (filters.createdDateFrom) {
            filtered = filtered.filter(order => order.createdDate >= filters.createdDateFrom);
        }
        if (filters.createdDateTo) {
            filtered = filtered.filter(order => order.createdDate <= filters.createdDateTo);
        }
        if (filters.updatedDateFrom) {
            filtered = filtered.filter(order => order.updatedDate >= filters.updatedDateFrom);
        }
        if (filters.updatedDateTo) {
            filtered = filtered.filter(order => order.updatedDate <= filters.updatedDateTo);
        }
        if (filters.search) {
            filtered = filtered.filter(order =>
                order.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                order.id.toString().includes(filters.search)
            );
        }
        return filtered;
    }, [data, filters]);

    const total = filteredOrders.length;
    const paginatedOrders = filteredOrders.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    // Reset page when filters change
    const setFiltersWithReset = (newFilters) => {
        setFilters(newFilters);
        setPage(1);
    };

    return {
        filteredOrders: paginatedOrders,
        filters,
        setFilters: setFiltersWithReset,
        page,
        setPage,
        pageSize,
        setPageSize,
        total,
    };
}

export default useOrderFilters;