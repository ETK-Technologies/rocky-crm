"use client";

import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  Button,
  Input,
  Select,
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
  FileDownload,
  DataTable,
} from "@/components/ui";
import { format } from "date-fns";

const ZonnicReport = ({ zonnicData, onGenerateReport, onDownloadExcel }) => {
  const [startDate, setStartDate] = useState("2025-07-01");
  const [endDate, setEndDate] = useState("2025-07-29");
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Convert string dates to Date objects for Calendar
  const startDateObj = startDate ? new Date(startDate) : null;
  const endDateObj = endDate ? new Date(endDate) : null;

  const handleStartDateChange = (date) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setStartDate(dateString);
    }
  };

  const handleEndDateChange = (date) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setEndDate(dateString);
    }
  };

  const handleGenerateReport = () => {
    onGenerateReport();
    setIsReportGenerated(true);
  };

  const handleSort = (columnId, direction) => {
    setSortColumn(columnId);
    setSortDirection(direction);
  };

  // Column definitions for DataTable
  const columns = [
    {
      id: "date",
      header: "Date",
      sortable: true,
    },
    {
      id: "productName",
      header: "Product Name",
      sortable: true,
    },
    {
      id: "productUnit",
      header: "Product Unit",
      sortable: true,
    },
    {
      id: "unit",
      header: "Unit (pouches)",
      sortable: true,
    },
    {
      id: "province",
      header: "Province",
      sortable: true,
    },
    {
      id: "orders",
      header: "Orders",
      sortable: true,
      cell: (row) => <span className="font-medium">{row.orders}</span>,
    },
    {
      id: "sleeves",
      header: "Sleeves",
      sortable: true,
      cell: (row) => <span className="font-medium">{row.sleeves}</span>,
    },
    {
      id: "totalSales",
      header: "Total Sales ($)",
      sortable: true,
      cell: (row) => <span className="font-medium">{row.totalSales}</span>,
    },
    {
      id: "totalBeforeTax",
      header: "Total Before Tax ($)",
      sortable: true,
      cell: (row) => (
        <span className="text-secondary-600">{row.totalBeforeTax}</span>
      ),
    },
    {
      id: "totalTax",
      header: "Total Tax ($)",
      sortable: true,
      cell: (row) => <span className="text-secondary-600">{row.totalTax}</span>,
    },
    {
      id: "totalExcise",
      header: "Total Excise",
      sortable: true,
      cell: (row) => (
        <span className="text-secondary-600">{row.totalExcise}</span>
      ),
    },
    {
      id: "singleSleeve",
      header: "Single Sleeve",
      sortable: true,
      cell: (row) => (
        <span className="text-secondary-600">{row.singleSleeve}</span>
      ),
    },
    {
      id: "twoSleeves",
      header: "2 Sleeves",
      sortable: true,
      cell: (row) => (
        <span className="text-secondary-600">{row.twoSleeves}</span>
      ),
    },
    {
      id: "moreThanTwoSleeves",
      header: ">2 Sleeves",
      sortable: true,
      cell: (row) => (
        <span className="text-secondary-600">{row.moreThanTwoSleeves}</span>
      ),
    },
  ];

  const handleDownloadExcel = () => {
    // Create CSV content
    const headers = [
      "Sn",
      "Date",
      "Product Name",
      "Product Unit",
      "Unit (pouches)",
      "Province",
      "Orders",
      "Sleeves",
      "Total Sales ($)",
      "Total Before Tax ($)",
      "Total Tax ($)",
      "Total Excise",
      "Single Sleeve",
      "2 Sleeves",
      ">2 Sleeves",
    ];
    const csvContent = [
      headers.join(","),
      ...zonnicData.map((item, index) =>
        [
          index + 1,
          item.date,
          item.productName,
          item.productUnit,
          item.unit,
          item.province,
          item.orders,
          item.sleeves,
          item.totalSales,
          item.totalBeforeTax,
          item.totalTax,
          item.totalExcise,
          item.singleSleeve,
          item.twoSleeves,
          item.moreThanTwoSleeves,
        ].join(",")
      ),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zonnic-report-${format(new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    // For PDF download, we'll use a simple approach
    const printContent = `
      <html>
        <head>
          <title>Zonnic Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Zonnic Report</h1>
          <p><strong>Date Range:</strong> ${startDate} to ${endDate}</p>
          <table>
            <thead>
              <tr>
                <th>Sn</th>
                <th>Date</th>
                <th>Product Name</th>
                <th>Product Unit</th>
                <th>Unit (pouches)</th>
                <th>Province</th>
                <th>Orders</th>
                <th>Sleeves</th>
                <th>Total Sales ($)</th>
                <th>Total Before Tax ($)</th>
                <th>Total Tax ($)</th>
                <th>Total Excise</th>
                <th>Single Sleeve</th>
                <th>2 Sleeves</th>
                <th>>2 Sleeves</th>
              </tr>
            </thead>
            <tbody>
              ${zonnicData
                .map(
                  (item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.date}</td>
                  <td>${item.productName}</td>
                  <td>${item.productUnit}</td>
                  <td>${item.unit}</td>
                  <td>${item.province}</td>
                  <td>${item.orders}</td>
                  <td>${item.sleeves}</td>
                  <td>${item.totalSales}</td>
                  <td>${item.totalBeforeTax}</td>
                  <td>${item.totalTax}</td>
                  <td>${item.totalExcise}</td>
                  <td>${item.singleSleeve}</td>
                  <td>${item.twoSleeves}</td>
                  <td>${item.moreThanTwoSleeves}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDateObj ? format(startDateObj, "PPP") : "Pick a date"}
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
              End Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDateObj ? format(endDateObj, "PPP") : "Pick a date"}
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
        </div>

        <div className="flex justify-start">
          <Button variant="save" onClick={handleGenerateReport}>
            Generate
          </Button>
        </div>
      </div>

      {/* Download Buttons - Only show after generation */}
      {isReportGenerated && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileDownload
              fileName={`zonnic-report-${format(new Date(), "yyyy-MM-dd")}.csv`}
              fileType="excel"
              fileSize="Generated on demand"
              onDownload={handleDownloadExcel}
            />
          </div>
        </div>
      )}

      {/* Preview Table - Only show after generation */}
      {isReportGenerated && (
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-secondary-900">
                Zonnic Report
              </h3>
              <p className="text-sm text-secondary-600">
                Date Range: {startDate} to {endDate}
              </p>
            </div>
            <DataTable
              columns={columns}
              data={zonnicData}
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

export default ZonnicReport;
