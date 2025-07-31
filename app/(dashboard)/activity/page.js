"use client";

import { useState } from "react";
import { Button, Input, Filters, DataTable, UserAvatar } from "@/components/ui";
import { PageHeader } from "@/components/ui";
import Icons from "@/components/icons";
import { Pencil, Trash2, MoreHorizontal, Download, Mail } from "lucide-react";

export default function ActivityPage() {
  const [filters, setFilters] = useState([
    {
      id: "date",
      type: "date-range",
      label: "Date",
      value: { start: null, end: null },
      placeholder: "Select date",
    },
    {
      id: "users",
      type: "select",
      label: "Users",
      value: "",
      placeholder: "Select Users",
      options: [
        { value: "ali-galal", label: "Ali Galal" },
        { value: "michel-mansour", label: "Michel Mansour" },
        { value: "sarah-johnson", label: "Sarah Johnson" },
        { value: "david-wilson", label: "David Wilson" },
      ],
    },
    {
      id: "module",
      type: "select",
      label: "Module",
      value: "",
      placeholder: "Select Module",
      options: [
        { value: "orders", label: "Orders" },
        { value: "users", label: "Users" },
        { value: "products", label: "Products" },
        { value: "customers", label: "Customers" },
      ],
    },
    {
      id: "event",
      type: "select",
      label: "Logs Event",
      value: "",
      placeholder: "Select Logs Event",
      options: [
        { value: "view", label: "View" },
        { value: "create", label: "Create" },
        { value: "update", label: "Update" },
        { value: "delete", label: "Delete" },
        { value: "print", label: "Print" },
      ],
    },
  ]);

  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");

  // Example activity log data - replace with actual data fetching
  const [activityLogs] = useState([
    {
      id: 1,
      username: "Ali Galal",
      module: "Orders",
      description: "admin View #527733 order details",
      ip: "172.69.130.32",
      createdAt: "2025-07-30 14:10:24",
    },
    {
      id: 2,
      username: "Michel Mansour",
      module: "Users",
      description: "admin Create new user account for John Smith",
      ip: "172.70.80.209",
      createdAt: "2025-07-29 16:45:12",
    },
    {
      id: 3,
      username: "Ali Galal",
      module: "Orders",
      description: "admin View #527776 order details",
      ip: "172.69.130.32",
      createdAt: "2025-07-30 14:10:22",
    },
    {
      id: 4,
      username: "Michel Mansour",
      module: "Orders",
      description:
        "Michel Mansour(Role: admin) Print Packing Slip for order number #525456",
      ip: "172.70.80.209",
      createdAt: "2025-07-30 14:10:21",
    },
    {
      id: 5,
      username: "Sarah Johnson",
      module: "Products",
      description: "admin Update product information for SKU #PRD-001",
      ip: "172.71.45.123",
      createdAt: "2025-07-28 09:30:15",
    },
    {
      id: 6,
      username: "Ali Galal",
      module: "Orders",
      description: "admin View #527825 order details",
      ip: "172.69.130.32",
      createdAt: "2025-07-30 14:10:19",
    },
    {
      id: 7,
      username: "David Wilson",
      module: "Customers",
      description: "admin Delete customer record for ID #CUST-789",
      ip: "172.72.90.45",
      createdAt: "2025-07-27 11:20:33",
    },
    {
      id: 8,
      username: "Ali Galal",
      module: "Orders",
      description: "admin View #527687 order details",
      ip: "172.69.130.32",
      createdAt: "2025-07-30 14:10:17",
    },
    {
      id: 9,
      username: "Michel Mansour",
      module: "Users",
      description: "admin Update user permissions for admin role",
      ip: "172.70.80.209",
      createdAt: "2025-07-26 15:45:22",
    },
    {
      id: 10,
      username: "Sarah Johnson",
      module: "Products",
      description: "admin Create new product category 'Electronics'",
      ip: "172.71.45.123",
      createdAt: "2025-07-25 13:15:45",
    },
    {
      id: 11,
      username: "David Wilson",
      module: "Customers",
      description: "admin View customer details for ID #CUST-456",
      ip: "172.72.90.45",
      createdAt: "2025-07-24 10:30:18",
    },
    {
      id: 12,
      username: "Ali Galal",
      module: "Orders",
      description: "admin View #527790 order details",
      ip: "172.69.130.32",
      createdAt: "2025-07-30 14:10:16",
    },
    {
      id: 13,
      username: "Michel Mansour",
      module: "Users",
      description: "admin Delete user account for inactive user",
      ip: "172.70.80.209",
      createdAt: "2025-07-23 14:20:55",
    },
    {
      id: 14,
      username: "Sarah Johnson",
      module: "Products",
      description: "admin View product inventory for warehouse #1",
      ip: "172.71.45.123",
      createdAt: "2025-07-22 16:40:12",
    },
    {
      id: 15,
      username: "David Wilson",
      module: "Customers",
      description: "admin Create new customer group 'VIP Members'",
      ip: "172.72.90.45",
      createdAt: "2025-07-21 09:15:30",
    },
    {
      id: 16,
      username: "Ali Galal",
      module: "Orders",
      description: "admin View #527764 order details",
      ip: "172.69.130.33",
      createdAt: "2025-07-30 14:10:17",
    },
    {
      id: 17,
      username: "Michel Mansour",
      module: "Users",
      description: "admin Print user activity report for July 2025",
      ip: "172.70.80.209",
      createdAt: "2025-07-20 11:25:40",
    },
    {
      id: 18,
      username: "Sarah Johnson",
      module: "Products",
      description: "admin Update product pricing for all electronics",
      ip: "172.71.45.123",
      createdAt: "2025-07-19 13:50:25",
    },
    {
      id: 19,
      username: "David Wilson",
      module: "Customers",
      description: "admin Export customer data to CSV format",
      ip: "172.72.90.45",
      createdAt: "2025-07-18 15:35:18",
    },
    {
      id: 20,
      username: "Ali Galal",
      module: "Orders",
      description: "admin View #527790 order details",
      ip: "172.69.130.32",
      createdAt: "2025-07-30 14:10:16",
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

  const columns = [
    {
      id: "id",
      header: "#",
      sortable: true,
      className: "w-16",
    },
    {
      id: "username",
      header: "Username",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <UserAvatar
            user={{
              name: row.username,
              email: `${row.username
                .toLowerCase()
                .replace(" ", ".")}@example.com`,
            }}
            size="sm"
            className="flex-shrink-0"
          />
          <div className="font-medium">{row.username}</div>
        </div>
      ),
    },
    {
      id: "module",
      header: "Module",
      sortable: true,
    },
    {
      id: "description",
      header: "Description",
      sortable: true,
      cell: (row) => (
        <div className="max-w-md truncate" title={row.description}>
          {row.description}
        </div>
      ),
    },
    {
      id: "ip",
      header: "IP",
      sortable: true,
      className: "w-32",
    },
    {
      id: "createdAt",
      header: "Created at",
      sortable: true,
      className: "w-40",
    },
  ];

  // Sort and filter data
  const filteredData = activityLogs
    .filter((log) => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          log.username.toLowerCase().includes(searchLower) ||
          log.module.toLowerCase().includes(searchLower) ||
          log.description.toLowerCase().includes(searchLower) ||
          log.ip.includes(searchQuery);
        if (!matchesSearch) return false;
      }

      // Apply other filters
      for (const filter of filters) {
        if (filter.type === "date-range") {
          if (filter.value?.start || filter.value?.end) {
            const logDate = new Date(log.createdAt);
            if (filter.value.start && logDate < filter.value.start)
              return false;
            if (filter.value.end && logDate > filter.value.end) return false;
          }
        } else if (filter.type === "select" && filter.value) {
          if (filter.id === "users") {
            const userValue = log.username.toLowerCase().replace(/\s+/g, "-");
            if (userValue !== filter.value) return false;
          } else if (filter.id === "module") {
            if (log.module.toLowerCase() !== filter.value) return false;
          } else if (filter.id === "event") {
            const eventType = log.description.toLowerCase();
            if (!eventType.includes(filter.value)) return false;
          }
        }
      }

      return true;
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
      <div className="mb-8">
        <PageHeader
          icon={Icons.Activity}
          title="Activity Logs"
          description="Monitor and track all system activities and user actions"
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
      />
    </div>
  );
}
