"use client";

import { useState } from "react";
import { Button, Input, Filters, DataTable, UserAvatar } from "@/components/ui";
import { Pencil, Trash2, MoreHorizontal, Download, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui";
import { useNotification } from "@/components/ui/Notification";
import { X } from "lucide-react";

export default function UsersPage() {
  const router = useRouter();
  const { showSuccess, NotificationContainer } = useNotification();
  const [activeTab, setActiveTab] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
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
  const [users, setUsers] = useState([
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
  const [trashedUsers, setTrashedUsers] = useState([]);

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

  // Delete logic
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };
  const handleDeleteConfirm = () => {
    if (activeTab === "all") {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setTrashedUsers((prev) => [...prev, userToDelete]);
      setActiveTab("trashed");
      showSuccess("Deleted successfully", "User has been moved to trash.");
    } else {
      setTrashedUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      showSuccess("Deleted successfully", "User has been permanently deleted.");
    }
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };
  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };

  // Columns
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
          {activeTab === "all" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/users/${row.id}/edit`)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500"
            onClick={() => handleDeleteClick(row)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Filtered data
  const filteredData = (activeTab === "all" ? users : trashedUsers)
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
      <NotificationContainer />
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
          <Button onClick={() => router.push("/users/add")}>Add User</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 mb-2">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "all"
                ? "border-primary text-primary"
                : "border-transparent text-secondary-500 hover:text-secondary-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("trashed")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "trashed"
                ? "border-primary text-primary"
                : "border-transparent text-secondary-500 hover:text-secondary-700"
            }`}
          >
            Trashed
          </button>
        </nav>
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

      {/* Delete Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">Delete User Account</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDeleteCancel}
                className="text-secondary-600 hover:text-secondary-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center text-lg font-medium text-secondary-900">
                Are you sure your want to delete this user account?
              </div>
              <div className="text-center text-secondary-600">
                Once this account is deleted, all of its resources and data will be moved to trash.
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 pb-6">
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete Account
              </Button>
              <Button variant="outline" onClick={handleDeleteCancel}>
                Decline
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
