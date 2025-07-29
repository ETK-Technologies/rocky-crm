"use client";

import { useState } from "react";
import { Button, Input, Filters, DataTable, UserAvatar } from "@/components/ui";
import { Pencil, Trash2, MoreHorizontal, Download, Mail } from "lucide-react";

export default function UsersPage() {
  const [filters, setFilters] = useState([
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
    {
      id: "province",
      type: "select",
      label: "Province",
      value: "",
      placeholder: "Select Province",
      options: [
        { value: "ON", label: "Ontario" },
        { value: "QC", label: "Quebec" },
        // Add other provinces
      ],
    },
    {
      id: "status",
      type: "select",
      label: "Status",
      value: "",
      placeholder: "Select Status",
      options: [
        { value: "active", label: "Active" },
        { value: "trashed", label: "Trashed" },
      ],
    },
  ]);

  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // Example data - replace with actual data fetching
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "(123) 456-7890",
      province: "ON",
      dateOfBirth: "1990-01-01",
      createdBy: { name: "Admin User", timestamp: "2 days ago" },
      updatedBy: { name: "Admin User", timestamp: "1 day ago" },
      tags: [],
    },
    // Add more example users...
  ]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to data
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

  const handleBulkAction = (action) => {
    switch (action) {
      case "delete":
        console.log("Delete users:", selectedRows);
        break;
      case "export":
        console.log("Export users:", selectedRows);
        break;
      case "email":
        console.log("Email users:", selectedRows);
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      id: "name",
      header: "Name",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <UserAvatar
            user={{
              name: row.name,
              email: row.email,
            }}
            size="sm"
          />
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-secondary-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: "tags",
      header: "Tags",
      sortable: true,
      cell: (row) => (row.tags.length ? row.tags.join(", ") : "N/A"),
    },
    {
      id: "phone",
      header: "Phone Number",
      sortable: true,
    },
    {
      id: "province",
      header: "Province",
      sortable: true,
    },
    {
      id: "dateOfBirth",
      header: "Date Of Birth",
      sortable: true,
    },
    {
      id: "createdBy",
      header: "Created By",
      sortable: true,
      cell: (row) => (
        <div className="text-sm">
          <div>{row.createdBy.name}</div>
          <div className="text-secondary-500">{row.createdBy.timestamp}</div>
        </div>
      ),
    },
    {
      id: "updatedBy",
      header: "Updated By",
      sortable: true,
      cell: (row) => (
        <div className="text-sm">
          <div>{row.updatedBy.name}</div>
          <div className="text-secondary-500">{row.updatedBy.timestamp}</div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      className: "text-right",
      cell: (row) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Sort and filter data
  const filteredData = users
    .filter((user) => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.includes(searchQuery)
      );
    })
    .sort((a, b) => {
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-secondary-900">Users</h1>
        <div className="flex gap-2">
          {selectedRows.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("email")}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("export")}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500"
                onClick={() => handleBulkAction("delete")}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            </>
          )}
          <Button>Add User</Button>
        </div>
      </div>

      {/* Filters with inline search */}
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleFilterReset}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        selectable
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
      />
    </div>
  );
}
