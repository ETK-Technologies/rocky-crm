"use client";

import React, { useState } from "react";
import { CalendarIcon, Trash2, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  DataTable,
} from "@/components/ui";
import { format } from "date-fns";

const SendToCreateLabs = ({ addedOrders, onRemoveOrder }) => {
  const [startDateTime, setStartDateTime] = useState("2025-08-01T00:00");
  const [endDateTime, setEndDateTime] = useState("2025-08-01T20:29");
  const [filterType, setFilterType] = useState({ value: "all", label: "All" });
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Convert string dates to Date objects for Calendar
  const startDateObj = startDateTime ? new Date(startDateTime) : null;
  const endDateObj = endDateTime ? new Date(endDateTime) : null;

  const handleStartDateChange = (date) => {
    if (date) {
      const dateString = date.toISOString().slice(0, 16);
      setStartDateTime(dateString);
    }
  };

  const handleEndDateChange = (date) => {
    if (date) {
      const dateString = date.toISOString().slice(0, 16);
      setEndDateTime(dateString);
    }
  };

  const handleGenerate = () => {
    console.log("Generating report with filters:", {
      startDateTime,
      endDateTime,
      filterType,
    });
    setIsReportGenerated(true);
  };

  const handlePreview = () => {
    console.log("Previewing all orders in the table");
  };

  const handleSort = (columnId, direction) => {
    setSortColumn(columnId);
    setSortDirection(direction);
  };

  const typeOptions = [
    { value: "all", label: "All" },
    { value: "compounded-semaglutide", label: "Compounded Semaglutide" },
    { value: "dissolvable-tadalafil", label: "Dissolvable Tadalafil" },
    { value: "sublingual-semaglutide", label: "Sublingual Semaglutide" },
  ];

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
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {row.status}
        </span>
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
  ];

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-secondary-900">Orders</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">
              Start Date & Time
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDateObj
                    ? format(startDateObj, "MMM d, yyyy h:mm a")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDateObj}
                  onSelect={handleStartDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">
              End Date & Time
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDateObj
                    ? format(endDateObj, "MMM d, yyyy h:mm a")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDateObj}
                  onSelect={handleEndDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">
              Type
            </label>
            <Select
              options={typeOptions}
              value={filterType}
              onChange={setFilterType}
              placeholder="Select type..."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">
              &nbsp;
            </label>
            <div className="flex gap-2">
              <Button
                variant="save"
                onClick={handleGenerate}
                className="flex-1"
              >
                Generate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table - Only show after generation */}
      {isReportGenerated && (
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Orders Report
                  </h3>
                  <p className="text-sm text-secondary-600">
                    Date Range:{" "}
                    {startDateObj
                      ? format(startDateObj, "MMM d, yyyy")
                      : startDateTime}{" "}
                    to{" "}
                    {endDateObj
                      ? format(endDateObj, "MMM d, yyyy")
                      : endDateTime}
                  </p>
                </div>
                <Button variant="outline" onClick={handlePreview}>
                  Preview
                </Button>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={addedOrders}
              onSort={handleSort}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              pageSize={10}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SendToCreateLabs;
