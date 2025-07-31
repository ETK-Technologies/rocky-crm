"use client";
import React, { useState } from "react";
import FilterBar from "./components/FilterBar";
import OrdersTable from "./components/OrdersTable";
import ordersData from "./data/ordersData";
import { Button, QuickActionsFilter } from "@/components/ui";
import { PageHeader } from "@/components/ui";
import Icons from "@/components/icons";
import { Trash2, Eye } from "lucide-react";

const orderStatusActions = [
  "All",
  "Pending Payment",
  "Medical Review",
  "Processing",
  "Shipped",
  "Failed",
  "Cancelled",
  "Refunded",
  "Trashed",
  "Cancellation Fee Applied",
  "Consultation Complete",
];

const defaultFilters = [
  {
    id: "status",
    type: "select",
    label: "Status",
    value: "",
    placeholder: "Select Status",
    options: [
      { value: "Pending payment", label: "Pending payment" },
      { value: "Medical Review", label: "Medical Review" },
      { value: "Processing", label: "Processing" },
      { value: "Shipped", label: "Shipped" },
    ],
  },
  {
    id: "province",
    type: "select",
    label: "Province",
    value: "",
    placeholder: "Select Province",
    options: [
      { value: "Ontario", label: "Ontario" },
      { value: "Quebec", label: "Quebec" },
      { value: "British Columbia", label: "British Columbia" },
      // ...add all provinces
    ],
  },
  {
    id: "orderType",
    type: "select",
    label: "Order Type",
    value: "",
    placeholder: "Select Order Type",
    options: [
      { value: "New", label: "New" },
      { value: "Renewal", label: "Renewal" },
      { value: "Created by admin", label: "Created by admin" },
      { value: "Others", label: "Others" },
    ],
  },
  {
    id: "category",
    type: "select",
    label: "Category",
    value: "",
    placeholder: "Select Category",
    options: [
      { value: "Body Optimization", label: "Body Optimization" },
      { value: "Sexual Health", label: "Sexual Health" },
      { value: "Hair Loss", label: "Hair Loss" },
      { value: "Mental Health", label: "Mental Health" },
      { value: "Recovery", label: "Recovery" },
    ],
  },
  {
    id: "created",
    type: "date-range",
    label: "Created",
    value: { start: null, end: null },
    placeholder: "Select date",
  },
  {
    id: "updated",
    type: "date-range",
    label: "Updated",
    value: { start: null, end: null },
    placeholder: "Select date",
  },
];

function filterOrders(data, filters, searchQuery, activeStatus) {
  return data.filter((order) => {
    // First check active status filter
    if (activeStatus !== "All" && order.status !== activeStatus) {
      return false;
    }

    let match = true;
    filters.forEach((filter) => {
      if (filter.type === "select" && filter.value) {
        match = match && order[filter.id] === filter.value;
      }
      if (
        filter.type === "date-range" &&
        filter.value.start &&
        filter.value.end
      ) {
        const dateField =
          filter.id === "created" ? "createdDate" : "updatedDate";
        match =
          match &&
          order[dateField] >= filter.value.start &&
          order[dateField] <= filter.value.end;
      }
    });
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      match =
        match &&
        (order.name.toLowerCase().includes(q) ||
          order.id.toString().includes(q));
    }
    return match;
  });
}

const OrderPage = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [activeStatus, setActiveStatus] = useState("All");

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFilterReset = () => {
    setFilters(
      defaultFilters.map((f) => ({
        ...f,
        value: f.type === "date-range" ? { start: null, end: null } : "",
      }))
    );
    setSearchQuery("");
  };

  const handleSort = (columnId, direction) => {
    setSortColumn(columnId);
    setSortDirection(direction);
  };

  const filteredData = filterOrders(
    ordersData,
    filters,
    searchQuery,
    activeStatus
  ).sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    const modifier = sortDirection === "asc" ? 1 : -1;
    if (typeof aValue === "string") {
      return aValue.localeCompare(bValue) * modifier;
    }
    return (aValue - bValue) * modifier;
  });

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <PageHeader
          icon={Icons.Orders}
          title="Orders"
          description="Track and manage all prescription orders and their statuses"
          actions={
            selectedRows.length > 0 && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert("Bulk view")}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500"
                  onClick={() => alert("Bulk delete")}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            )
          }
        />
      </div>
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleFilterReset}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <QuickActionsFilter
        actions={orderStatusActions}
        activeAction={activeStatus}
        onActionChange={setActiveStatus}
      />
      <OrdersTable
        orders={filteredData}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        selectable
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        pageSize={pageSize}
      />
    </div>
  );
};

export default OrderPage;
