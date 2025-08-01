"use client";

import { useState } from "react";
import {
  Button,
  Card,
  DataTable,
  Input,
  PageHeader,
  UserAvatar,
} from "@/components/ui";
import Icons from "@/components/icons";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { set } from "date-fns";
import OrdersTable from "../orders/ordersPageComponents/components/OrdersTable";

export default function DataFetch() {
  const [activeTab, setActiveTab] = useState("users");
  const [FoundUsers, setFoundUsers] = useState(false);
  const [FoundOrders, setFoundOrders] = useState(false);

  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
    setFoundUsers(false);
    setFoundOrders(false);
  };
  const handleUserSearch = (e) => {
    e.preventDefault();

    setFoundUsers(true);
  };
  const handleOrderSearch = (e) => {
    e.preventDefault();
    // TODO: Add order search logic here
    // Example: const orderId = e.target.elements.orderId.value;
    setFoundOrders(true);
  };

  // Columns
  const UsersColumns = [
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
  ]);

  const [orders, setOrders] = useState([{
    id: 500001,
    name: "Alice Smith",
    tags: ["Body Optimization Program"],
    date: "2024-01-10T09:00:00.000Z",
    createdDate: "2024-01-10T09:00:00.000Z",
    updatedDate: "2024-01-15T10:00:00.000Z",
    province: "Ontario",
    orderType: "New",
    product: "Body Optimization Program",
    status: "Pending payment",
    shipping: "Alice Smith, Ontario",
    total: 250,
    payment: "Credit Card",
    items: ["Body Optimization Program"],
    prescription: ["Body Optimization Program"],
    category: "Body Optimization",
  },
  ]);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <PageHeader
            icon={Icons.DataFetch}
            title="Missing Data Fetch Tool"
            description="This tool is designed to help you fetch missing data efficiently."
          />
        </div>

        <Card className="px-4">
          <div className="flex gap-2 ">
            <Button
              variant={activeTab === "users" ? "default" : "outline"}
              onClick={() => handleActiveTabChange("users")}
            >
              Users
            </Button>
            <Button
              variant={activeTab === "orders" ? "default" : "outline"}
              onClick={() => handleActiveTabChange("orders")}
            >
              Orders
            </Button>
          </div>

          <hr />

          {activeTab === "users" && (
            <div className="Users mt-4">
              <h1 className="text-lg font-medium leading-6 text-gray-900">
                Users
              </h1>
              <p className="mt-1 mb-4 max-w-2xl text-sm text-gray-500">
                Search users by email address
              </p>

              <form
                className="flex gap-4 mb-8 items-center"
                onSubmit={handleUserSearch}
              >
                <Input
                  className="w-1/4"
                  placeholder="Search by email"
                  name="email"
                  type="email"
                  autoComplete="off"
                />
                <Button type="submit">Search</Button>
              </form>

              {FoundUsers && (
                <>
                  {/* Table */}
                  <DataTable columns={UsersColumns} data={users} />
                </>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="Orders mt-4">
              <h1 className="text-lg font-medium leading-6 text-gray-900">
                Orders
              </h1>
              <p className="mt-1 mb-4 max-w-2xl text-sm text-gray-500">
                Search orders by providing WP order id.
              </p>

              <form
                className="flex gap-4 items-center mb-8"
                onSubmit={handleOrderSearch}
              >
                <Input
                  className="w-1/4"
                  placeholder="Search by WP order ID"
                  name="orderId"
                  type="text"
                  autoComplete="off"
                />
                <Button type="submit">Search</Button>
              </form>

              {FoundOrders && (
                <>
                  <OrdersTable
                    orders={orders}
                  />
                </>
              )}
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
