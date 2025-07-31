"use client";

import { useState } from "react";
import { Button, Input, Filters, DataTable, UserAvatar } from "@/components/ui";
import { PageHeader } from "@/components/ui";
import Icons from "@/components/icons";
import { Pencil, Trash2, MoreHorizontal, Download, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui";
import { useNotification } from "@/components/ui/Notification";
import { X } from "lucide-react";

export default function UsersPage() {
  const router = useRouter();
  const { showSuccess, NotificationContainer } = useNotification();
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
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "(123) 456-7891",
      province: "QC",
      dateOfBirth: "1985-05-15",
      createdBy: { name: "Admin User", timestamp: "1 week ago" },
      updatedBy: { name: "Admin User", timestamp: "3 days ago" },
      tags: ["VIP"],
      status: "active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "(123) 456-7892",
      province: "ON",
      dateOfBirth: "1978-12-20",
      createdBy: { name: "Admin User", timestamp: "2 weeks ago" },
      updatedBy: { name: "Admin User", timestamp: "1 week ago" },
      tags: [],
      status: "trashed",
    },
  ]);
  const [trashedUsers, setTrashedUsers] = useState([
    {
      id: 4,
      name: "Deleted User",
      email: "deleted@example.com",
      phone: "(123) 456-7893",
      province: "BC",
      dateOfBirth: "1992-08-10",
      createdBy: { name: "Admin User", timestamp: "3 weeks ago" },
      updatedBy: { name: "Admin User", timestamp: "1 week ago" },
      tags: [],
      status: "trashed",
    },
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

  // Delete logic
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };
  const handleBulkDelete = () => {
    setUserToDelete({ ids: selectedRows, status: "bulk" });
    setShowDeleteDialog(true);
  };

  const handleBulkEmail = () => {
    console.log("Sending email to:", selectedRows);
    // Implement email functionality
  };

  const handleBulkExport = () => {
    console.log("Exporting users:", selectedRows);
    // Implement export functionality
  };

  // Update delete handler for bulk operations
  const handleDeleteConfirm = () => {
    if (userToDelete.status === "bulk") {
      setUsers((prev) => prev.filter((u) => !userToDelete.ids.includes(u.id)));
      setTrashedUsers((prev) => [
        ...prev,
        ...users
          .filter((u) => userToDelete.ids.includes(u.id))
          .map((u) => ({ ...u, status: "trashed" })),
      ]);
      showSuccess(
        "Deleted successfully",
        "Selected users have been moved to trash."
      );
    } else if (userToDelete.status === "active") {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setTrashedUsers((prev) => [
        ...prev,
        { ...userToDelete, status: "trashed" },
      ]);
      showSuccess("Deleted successfully", "User has been moved to trash.");
    } else {
      setTrashedUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      showSuccess("Deleted successfully", "User has been permanently deleted.");
    }
    setShowDeleteDialog(false);
    setUserToDelete(null);
    setSelectedRows([]);
  };
  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };

  // Columns
  const columns = [
    {
      id: "select",
      header: "",
      width: 40,
    },
    {
      id: "name",
      header: "Name",
      sortable: true,
      cell: (row) => (
        <div
          className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-md transition-colors"
          onClick={() => router.push(`/users/${row.id}/edit`)}
        >
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
    // {
    //   id: "status",
    //   header: "Status",
    //   sortable: true,
    //   cell: (row) => (
    //     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
    //       row.status === "active"
    //         ? "bg-green-100 text-green-800"
    //         : "bg-red-100 text-red-800"
    //     }`}>
    //       {row.status === "active" ? "Active" : "Trashed"}
    //     </span>
    //   ),
    // },
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
        <div className="flex justify-center gap-2">
          <div className="relative group flex flex-col items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/users/${row.id}/edit`)}
              className="bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
              Edit User
            </span>
          </div>
          <div className="relative group flex flex-col items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteClick(row)}
              className="bg-white hover:bg-gray-50 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
              Delete User
            </span>
          </div>
          <div className="relative group flex flex-col items-center">
            <Button
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
              More Actions
            </span>
          </div>
        </div>
      ),
    },
  ];

  // Combine all users and filter
  const allUsers = [...users, ...trashedUsers];
  const filteredData = allUsers
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
      <div className="mb-8">
        <PageHeader
          icon={Icons.Users}
          title="Users"
          description="Manage patient accounts, user permissions and information"
          actions={
            <div className="flex items-center gap-2">
              {selectedRows.length > 0 && (
                <>
                  <Button variant="outline" size="sm" onClick={handleBulkEmail}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkExport}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500"
                    onClick={handleBulkDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                </>
              )}
              <Button onClick={() => router.push("/users/add")}>
                Add User
              </Button>
            </div>
          }
        />
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
        selectable={true}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
      />

      {/* Delete Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">
                Delete User{" "}
                {userToDelete.status === "bulk" ? "Accounts" : "Account"}
              </h2>
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
                Are you sure you want to delete{" "}
                {userToDelete.status === "bulk"
                  ? "these user accounts"
                  : "this user account"}
                ?
              </div>
              <div className="text-center text-secondary-600">
                {userToDelete.status === "bulk"
                  ? `${userToDelete.ids.length} accounts will be moved to trash.`
                  : "Once this account is deleted, all of its resources and data will be moved to trash."}
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 pb-6">
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete {userToDelete.status === "bulk" ? "Accounts" : "Account"}
              </Button>
              <Button variant="outline" onClick={handleDeleteCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
