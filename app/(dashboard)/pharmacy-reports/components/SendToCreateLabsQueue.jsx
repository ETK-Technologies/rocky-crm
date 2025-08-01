"use client";

import React, { useState } from "react";
import { Trash2, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  Button,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  FormCard,
  DataTable,
} from "@/components/ui";

const SendToCreateLabsQueue = ({
  orderUrls,
  setOrderUrls,
  addedOrders,
  onAddOrders,
  onRemoveOrder,
  onPreview,
}) => {
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Sample data from the image
  const sampleOrders = [
    {
      id: 528021,
      customerName: "Duncan Stewart",
      updatedAt: "1 day ago",
      createdAt: "29 Jul, 2025 15:51:00",
      status: "Shipped",
      statusDate: "on 29 Jul, 2025",
      total: "$126",
      orderItems: "Tadalafil X 1 (Dosage: 10mg)",
    },
    {
      id: 528022,
      customerName: "Rafal Szalek",
      updatedAt: "6 hours ago",
      createdAt: "30 Jul, 2025 10:30:00",
      status: "Processing",
      statusDate: "",
      total: "$89",
      orderItems: "Cialis® X 1 (Dosage: 5mg)",
    },
    {
      id: 528023,
      customerName: "Tannis Peacock",
      updatedAt: "2 hours ago",
      createdAt: "31 Jul, 2025 14:15:00",
      status: "Shipped",
      statusDate: "on 31 Jul, 2025",
      total: "$156",
      orderItems: "Viagra® X 1 (Dosage: 25mg)",
    },
    {
      id: 528024,
      customerName: "IURIE Baciu-mihailov",
      updatedAt: "1 hour ago",
      createdAt: "31 Jul, 2025 16:45:00",
      status: "Processing",
      statusDate: "",
      total: "$203",
      orderItems: "Essential T-Boost X 1",
    },
    {
      id: 528025,
      customerName: "David Mercier",
      updatedAt: "30 minutes ago",
      createdAt: "31 Jul, 2025 17:30:00",
      status: "Shipped",
      statusDate: "on 31 Jul, 2025",
      total: "$298",
      orderItems: "Cialis® X 1, Viagra® X 1",
    },
    {
      id: 528026,
      customerName: "Patrick Morgan",
      updatedAt: "15 minutes ago",
      createdAt: "31 Jul, 2025 18:00:00",
      status: "Processing",
      statusDate: "",
      total: "$134",
      orderItems: "Essential Night Boost X 1",
    },
    {
      id: 528027,
      customerName: "Stephen Walker",
      updatedAt: "5 minutes ago",
      createdAt: "31 Jul, 2025 18:20:00",
      status: "Shipped",
      statusDate: "on 31 Jul, 2025",
      total: "$167",
      orderItems: "Essential Gut Relief X 1",
    },
    {
      id: 528028,
      customerName: "Philip Paradine",
      updatedAt: "1 minute ago",
      createdAt: "31 Jul, 2025 18:25:00",
      status: "Processing",
      statusDate: "",
      total: "$189",
      orderItems: "Tadalafil X 1 (Dosage: 20mg)",
    },
    {
      id: 528029,
      customerName: "Tryston Matthew Palmer",
      updatedAt: "Just now",
      createdAt: "31 Jul, 2025 18:30:00",
      status: "Processing",
      statusDate: "",
      total: "$445",
      orderItems:
        "Essential T-Boost X 1, Essential Night Boost X 1, Essential Gut Relief X 1",
    },
  ];

  const handlePreview = () => {
    onPreview();
    setIsReportGenerated(true);
  };

  const handleTablePreview = () => {
    console.log("Previewing all orders in the queue table");
  };

  const handleSort = (columnId, direction) => {
    setSortColumn(columnId);
    setSortDirection(direction);
  };

  // Column definitions for DataTable
  const columns = [
    {
      id: "id",
      header: "Order ID",
      sortable: true,
      cell: (row) => <span className="font-medium">{row.id}</span>,
    },
    {
      id: "customerName",
      header: "Customer Name",
      sortable: true,
    },
    {
      id: "updatedAt",
      header: "Updated At",
      sortable: true,
      cell: (row) => (
        <span className="text-secondary-600">{row.updatedAt}</span>
      ),
    },
    {
      id: "createdAt",
      header: "Created At",
      sortable: true,
      cell: (row) => (
        <span className="text-secondary-600">{row.createdAt}</span>
      ),
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (row) => (
        <div className="flex flex-col">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              row.status === "Shipped"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {row.status}
          </span>
          {row.statusDate && (
            <span className="text-xs text-secondary-500 mt-1">
              {row.statusDate}
            </span>
          )}
        </div>
      ),
    },
    {
      id: "total",
      header: "Total",
      sortable: true,
      cell: (row) => <span className="font-medium">{row.total}</span>,
    },
    {
      id: "orderItems",
      header: "Order Items",
      sortable: true,
      cell: (row) => (
        <span className="text-secondary-600">{row.orderItems}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      sortable: false,
      cell: (row) => (
        <Button
          variant="ghost-delete"
          size="sm"
          onClick={() => onRemoveOrder(row.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Order URLs Input */}
      <FormCard
        className="p-0"
        title="Orders"
        description="Please enter order URLs, separated by commas"
        placeholder="Enter order URLs..."
        buttonText="Add"
        buttonVariant="add"
        inputType="text"
        inputValue={orderUrls}
        onInputChange={setOrderUrls}
        onSubmit={onAddOrders}
        buttonPosition="end"
      />

      {/* Orders Table - Show when there's data */}
      {sampleOrders.length > 0 && (
        <>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-secondary-900">
                  Orders Queue
                </h3>
                <p className="text-sm text-secondary-600">
                  Orders in queue for processing
                </p>
              </div>
              <Button variant="outline" onClick={handleTablePreview}>
                Preview
              </Button>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={sampleOrders}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            pageSize={10}
          />
        </>
      )}
    </div>
  );
};

export default SendToCreateLabsQueue;
