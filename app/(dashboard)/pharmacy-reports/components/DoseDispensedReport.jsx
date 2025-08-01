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

const DoseDispensedReport = ({
  doseFilters,
  setDoseFilters,
  doseFilterOptions,
  onGenerateReport,
}) => {
  const [startDate, setStartDate] = useState("2025-07-01");
  const [endDate, setEndDate] = useState("2025-07-31");
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Sample dose dispensed data
  const [doseData, setDoseData] = useState([
    {
      id: 1,
      orderId: "ORD-001",
      dateDispensed: "2025-07-15",
      patientName: "Shaddy Elsha",
      drug: "Wegovy®",
      dateOfShipping: "2025-07-16",
      dose: "3mg",
      totalUnitDispensed: 30,
    },
    {
      id: 2,
      orderId: "ORD-002",
      dateDispensed: "2025-07-18",
      patientName: "John Doe",
      drug: "Ozempic®",
      dateOfShipping: "2025-07-19",
      dose: "5mg",
      totalUnitDispensed: 28,
    },
    {
      id: 3,
      orderId: "ORD-003",
      dateDispensed: "2025-07-20",
      patientName: "Jane Smith",
      drug: "Saxenda®",
      dateOfShipping: "2025-07-21",
      dose: "3mg",
      totalUnitDispensed: 25,
    },
    {
      id: 4,
      orderId: "ORD-004",
      dateDispensed: "2025-07-22",
      patientName: "Mike Johnson",
      drug: "Mounjaro®",
      dateOfShipping: "2025-07-23",
      dose: "10mg",
      totalUnitDispensed: 32,
    },
    {
      id: 5,
      orderId: "ORD-005",
      dateDispensed: "2025-07-25",
      patientName: "Sarah Wilson",
      drug: "Rybelsus®",
      dateOfShipping: "2025-07-26",
      dose: "7mg",
      totalUnitDispensed: 27,
    },
  ]);

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
      id: "orderId",
      header: "Order ID",
      sortable: true,
      cell: (row) => <span className="font-medium">{row.orderId}</span>,
    },
    {
      id: "dateDispensed",
      header: "Date Dispensed",
      sortable: true,
      cell: (row) => (
        <span className="text-secondary-600">{row.dateDispensed}</span>
      ),
    },
    {
      id: "patientName",
      header: "Patient Name",
      sortable: true,
    },
    {
      id: "drug",
      header: "Drug(Product)",
      sortable: true,
      cell: (row) => <span className="font-medium">{row.drug}</span>,
    },
    {
      id: "dateOfShipping",
      header: "Date Of Shipping",
      sortable: true,
      cell: (row) => (
        <span className="text-secondary-600">{row.dateOfShipping}</span>
      ),
    },
    {
      id: "dose",
      header: "Dose",
      sortable: true,
      cell: (row) => <span className="font-medium">{row.dose}</span>,
    },
    {
      id: "totalUnitDispensed",
      header: "Total Unit Dispensed",
      sortable: true,
      cell: (row) => (
        <span className="font-medium">{row.totalUnitDispensed}</span>
      ),
    },
  ];

  const handleDownloadExcel = () => {
    // Create CSV content
    const headers = [
      "Sn",
      "Order ID",
      "Date Dispensed",
      "Patient Name",
      "Drug(Product)",
      "Date Of Shipping",
      "Dose",
      "Total Unit Dispensed",
    ];
    const csvContent = [
      headers.join(","),
      ...doseData.map((item, index) =>
        [
          index + 1,
          item.orderId,
          item.dateDispensed,
          item.patientName,
          item.drug,
          item.dateOfShipping,
          item.dose,
          item.totalUnitDispensed,
        ].join(",")
      ),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dose-dispensed-report-${format(
      new Date(),
      "yyyy-MM-dd"
    )}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    // For PDF download, we'll use a simple approach
    // In a real implementation, you might want to use a library like jsPDF
    const printContent = `
      <html>
        <head>
          <title>Dose Dispensed Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Dose Dispensed Report</h1>
          <p><strong>Date Range:</strong> ${startDate} to ${endDate}</p>
          <table>
            <thead>
              <tr>
                <th>Sn</th>
                <th>Order ID</th>
                <th>Date Dispensed</th>
                <th>Patient Name</th>
                <th>Drug(Product)</th>
                <th>Date Of Shipping</th>
                <th>Dose</th>
                <th>Total Unit Dispensed</th>
              </tr>
            </thead>
            <tbody>
              ${doseData
                .map(
                  (item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.orderId}</td>
                  <td>${item.dateDispensed}</td>
                  <td>${item.patientName}</td>
                  <td>${item.drug}</td>
                  <td>${item.dateOfShipping}</td>
                  <td>${item.dose}</td>
                  <td>${item.totalUnitDispensed}</td>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">
              Report View
            </label>
            <Select
              options={doseFilterOptions.details}
              value={doseFilters.detail}
              onChange={(value) =>
                setDoseFilters({ ...doseFilters, detail: value })
              }
              className="w-full"
            />
          </div>
          {/* Report Action - Only show when Report View is "Summary" */}
          {doseFilters.detail?.value === "summary" ? (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">
                Report Action
              </label>
              <Select
                options={[
                  { value: "view", label: "View Report" },
                  { value: "download", label: "Download Report" },
                  { value: "email", label: "Email Report" },
                  { value: "print", label: "Print Report" },
                ]}
                value={
                  doseFilters.reportAction || {
                    value: "view",
                    label: "View Report",
                  }
                }
                onChange={(value) =>
                  setDoseFilters({ ...doseFilters, reportAction: value })
                }
                className="w-full"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-700">
                &nbsp;
              </label>
              <div className="h-9"></div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">
              Patient
            </label>
            <Select
              options={doseFilterOptions.patients}
              value={doseFilters.patient}
              onChange={(value) =>
                setDoseFilters({ ...doseFilters, patient: value })
              }
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">
              Program
            </label>
            <Select
              options={doseFilterOptions.programs}
              value={doseFilters.program}
              onChange={(value) =>
                setDoseFilters({ ...doseFilters, program: value })
              }
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">
              Dosage
            </label>
            <Select
              options={doseFilterOptions.dosages}
              value={doseFilters.dosage}
              onChange={(value) =>
                setDoseFilters({ ...doseFilters, dosage: value })
              }
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700">
              Status
            </label>
            <Select
              options={doseFilterOptions.statuses}
              value={doseFilters.status}
              onChange={(value) =>
                setDoseFilters({ ...doseFilters, status: value })
              }
              className="w-full"
            />
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
              fileName={`dose-dispensed-report-${format(
                new Date(),
                "yyyy-MM-dd"
              )}.pdf`}
              fileType="pdf"
              fileSize="Generated on demand"
              onDownload={handleDownloadPDF}
            />
            <FileDownload
              fileName={`dose-dispensed-report-${format(
                new Date(),
                "yyyy-MM-dd"
              )}.csv`}
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
                Dose Dispensed Report
              </h3>
              <p className="text-sm text-secondary-600">
                Date Range: {startDate} to {endDate}
              </p>
            </div>
            <DataTable
              columns={columns}
              data={doseData}
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

export default DoseDispensedReport;
