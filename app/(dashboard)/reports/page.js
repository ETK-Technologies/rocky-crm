"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Filters,
  DataTable,
  UserAvatar,
  PageHeader,
} from "@/components/ui";
import Icons from "@/components/icons";
import { Eye, Trash2, FileText, Download, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrescriptionPage() {
  const router = useRouter();
  const [filters, setFilters] = useState([
    {
      id: "prescribed",
      type: "date-range",
      label: "Prescribed:",
      value: { start: null, end: null },
      placeholder: "Select date",
    },
    {
      id: "category",
      type: "select",
      label: "Select Category",
      value: "",
      placeholder: "Select Category",
      options: [
        { value: "ed", label: "ED" },
        { value: "hair", label: "Hair" },
        { value: "mental-health", label: "Mental Health" },
        { value: "weight-loss", label: "Weight Loss (Body Optimization)" },
        {
          value: "new-consults-weight-loss",
          label: "New Consults Weight Loss (Body Optimization)",
        },
        {
          value: "new-consults-mental-health",
          label: "New Consults Mental Health",
        },
        {
          value: "follow-up-consults-weight-loss",
          label: "Follow Up Consults Weight Loss (Body Optimization)",
        },
        {
          value: "follow-up-consults-mental-health",
          label: "Follow Up Consults Mental Health",
        },
      ],
    },
    {
      id: "prescribedBy",
      type: "select",
      label: "Prescribed By",
      value: "",
      placeholder: "Select Prescriber",
      options: [
        { value: "catherine-puhl", label: "Catherine Puhl" },
        { value: "jenna-habib", label: "Jenna Habib (NP)" },
        { value: "joshua-belanger", label: "Joshua Belanger" },
      ],
    },
  ]);

  const [sortColumn, setSortColumn] = useState("prescriptionDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");

  // Prescription data from the image
  const [prescriptionData] = useState([
    {
      id: 93539,
      prescriptionNumber: "93539",
      patientName: "Kristen Bond",
      medications: "Ozempic®",
      prescribedBy: "Catherine Puhl",
      prescriptionDate: "August, 1 2025",
      createdOn: "August, 1 2025 10:22:33",
      orderNumber: "530352",
      status: "Active",
    },
    {
      id: 93538,
      prescriptionNumber: "93538",
      patientName: "Susan toth",
      medications: "Mounjaro® KwikPen",
      prescribedBy: "Jenna Habib (NP)",
      prescriptionDate: "August, 1 2025",
      createdOn: "August, 1 2025 10:12:48",
      orderNumber: "530348",
      status: "Active",
    },
    {
      id: 93537,
      prescriptionNumber: "93537",
      patientName: "Kathleen Burland",
      medications: "Ozempic®",
      prescribedBy: "Joshua Belanger",
      prescriptionDate: "August, 1 2025",
      createdOn: "August, 1 2025 09:54:58",
      orderNumber: "527133",
      status: "Active",
    },
    {
      id: 93536,
      prescriptionNumber: "93536",
      patientName: "Sydney Wood",
      medications: "Ozempic®",
      prescribedBy: "Joshua Belanger",
      prescriptionDate: "August, 1 2025",
      createdOn: "August, 1 2025 09:52:13",
      orderNumber: "530335",
      status: "Active",
    },
    {
      id: 93535,
      prescriptionNumber: "93535",
      patientName: "Andrew Elbaz",
      medications: "Ozempic®",
      prescribedBy: "Jenna Habib (NP)",
      prescriptionDate: "August, 1 2025",
      createdOn: "August, 1 2025 09:52:02",
      orderNumber: "530344",
      status: "Active",
    },
    {
      id: 93534,
      prescriptionNumber: "93534",
      patientName: "Madhavi Hamroll",
      medications: "Ozempic®",
      prescribedBy: "Jenna Habib (NP)",
      prescriptionDate: "August, 1 2025",
      createdOn: "August, 1 2025 09:38:36",
      orderNumber: "530331",
      status: "Active",
    },
  ]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
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

  const handleViewPrescription = (prescriptionId) => {
    router.push(`/prescription/view/${prescriptionId}`);
  };

  const handleDeletePrescription = (prescriptionId) => {
    console.log("Delete prescription:", prescriptionId);
  };

  const handleExportData = () => {
    console.log("Export data");
  };

  const handleGenerateInvoice = () => {
    console.log("Generate invoice");
  };

  const columns = [
    {
      id: "user",
      header: "User",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <FileText className="h-4 w-4 text-gray-600" />
          </div>
          <div>
            <div className="font-medium text-sm">
              Prescription #{row.prescriptionNumber}
            </div>
            <div className="text-sm text-gray-600">{row.patientName}</div>
          </div>
        </div>
      ),
    },
    {
      id: "medications",
      header: "Medications",
      sortable: true,
      cell: (row) => (
        <div className="font-medium text-sm">{row.medications}</div>
      ),
    },
    {
      id: "prescribedBy",
      header: "prescribed by:",
      sortable: true,
      cell: (row) => (
        <div className="font-medium text-sm">{row.prescribedBy}</div>
      ),
    },
    {
      id: "prescriptionDate",
      header: "Date on Prescription",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-medium text-sm">{row.prescriptionDate}</div>
          <div className="text-xs text-gray-600">
            Created on: {row.createdOn}
          </div>
        </div>
      ),
    },
    {
      id: "orderNumber",
      header: "#Order",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">#{row.orderNumber}</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                window.open(
                  `https://myrocky.ca/wp-admin/post.php?post=${row.orderNumber}&action=edit`,
                  "_blank"
                )
              }
              className="w-6 h-6 bg-purple-500 hover:bg-purple-600 p-0"
            >
              <span className="text-white text-xs font-bold">W</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/reports/view/${row.orderNumber}/`)}
              className="w-6 h-6 bg-purple-500 hover:bg-purple-600 p-0"
            >
              <span className="text-white text-xs font-bold">%</span>
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (row) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {row.status}
        </span>
      ),
    },
  ];

  // Sort and filter data
  const filteredData = prescriptionData
    .filter((prescription) => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          prescription.patientName.toLowerCase().includes(searchLower) ||
          prescription.medications.toLowerCase().includes(searchLower) ||
          prescription.prescribedBy.toLowerCase().includes(searchLower) ||
          prescription.status.toLowerCase().includes(searchLower) ||
          prescription.prescriptionNumber.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Apply other filters
      for (const filter of filters) {
        if (filter.type === "date-range") {
          if (filter.value?.start || filter.value?.end) {
            // For demo purposes, we'll skip date filtering since we're using relative dates
            // In real implementation, you'd convert relative dates to actual dates
          }
        } else if (filter.type === "select" && filter.value) {
          if (filter.id === "category") {
            // Category filtering logic would go here
          } else if (filter.id === "prescribedBy") {
            const prescriberValue = prescription.prescribedBy
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[()]/g, "");
            if (prescriberValue !== filter.value) return false;
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
          title="Prescription"
          actions={
            <div className="flex gap-2">
              <Button
                variant="default"
                size="default"
                onClick={handleExportData}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button
                variant="default"
                size="default"
                onClick={handleGenerateInvoice}
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Invoice
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
      />
    </div>
  );
}
