"use client";

import { useState } from "react";
import { Button, Input, Filters, DataTable, PageHeader } from "@/components/ui";
import Icons from "@/components/icons";
import { Download, FileText, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/ui/Notification";

export default function ReportsPage() {
  const router = useRouter();
  const { showSuccess, NotificationContainer } = useNotification();
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortColumn, setSortColumn] = useState("prescriptionDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter state
  const [filters, setFilters] = useState([
    {
      id: "prescribed",
      type: "date-range",
      label: "Prescribed",
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
        { value: "diabetes", label: "Diabetes" },
        { value: "weight-loss", label: "Weight Loss" },
        { value: "general", label: "General" },
      ],
    },
    {
      id: "prescribedBy",
      type: "select",
      label: "Prescribed By",
      value: "",
      placeholder: "Prescribed By",
      options: [
        { value: "pamela-bridgen", label: "Pamela Bridgen" },
        { value: "catherine-puhl", label: "Catherine Puhl" },
        { value: "joshua-belanger", label: "Joshua Belanger" },
      ],
    },
  ]);

  // Sample prescription data
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      prescriptionNumber: "93603",
      userName: "Wais Mohamed",
      medications: ["Ozempic®"],
      prescribedBy: "Pamela Bridgen",
      prescriptionDate: "2025-08-01",
      createdOn: "2025-08-01T13:47:59",
      orderNumber: "530474",
      status: "Active",
      category: "diabetes",
    },
    {
      id: 2,
      prescriptionNumber: "93604",
      userName: "Sarah Johnson",
      medications: ["Mounjaro®"],
      prescribedBy: "Catherine Puhl",
      prescriptionDate: "2025-08-01",
      createdOn: "2025-08-01T14:30:15",
      orderNumber: "530475",
      status: "Active",
      category: "weight-loss",
    },
    {
      id: 3,
      prescriptionNumber: "93605",
      userName: "Michael Chen",
      medications: ["Rybelsus®"],
      prescribedBy: "Joshua Belanger",
      prescriptionDate: "2025-08-01",
      createdOn: "2025-08-01T15:22:30",
      orderNumber: "530476",
      status: "Active",
      category: "diabetes",
    },
    {
      id: 4,
      prescriptionNumber: "93606",
      userName: "Emily Davis",
      medications: ["Mounjaro kwikpen"],
      prescribedBy: "Pamela Bridgen",
      prescriptionDate: "2025-08-01",
      createdOn: "2025-08-01T16:15:45",
      orderNumber: "530477",
      status: "Active",
      category: "weight-loss",
    },
    {
      id: 5,
      prescriptionNumber: "93607",
      userName: "David Wilson",
      medications: ["Ozempic®", "Metformin"],
      prescribedBy: "Catherine Puhl",
      prescriptionDate: "2025-08-01",
      createdOn: "2025-08-01T17:08:20",
      orderNumber: "530478",
      status: "Active",
      category: "diabetes",
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
  };

  // Filter and sort data
  const filteredData = prescriptions.filter((prescription) => {
    // Search query filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        prescription.userName.toLowerCase().includes(searchLower) ||
        prescription.prescriptionNumber.toLowerCase().includes(searchLower) ||
        prescription.orderNumber.toLowerCase().includes(searchLower) ||
        prescription.prescribedBy.toLowerCase().includes(searchLower) ||
        prescription.medications.some((med) =>
          med.toLowerCase().includes(searchLower)
        );

      if (!matchesSearch) return false;
    }

    // Date range filter
    const prescribedFilter = filters.find((f) => f.id === "prescribed");
    if (prescribedFilter?.value?.start || prescribedFilter?.value?.end) {
      const prescriptionDate = new Date(prescription.prescriptionDate);
      if (prescribedFilter.value.start) {
        const startDate = new Date(prescribedFilter.value.start);
        if (prescriptionDate < startDate) return false;
      }
      if (prescribedFilter.value.end) {
        const endDate = new Date(prescribedFilter.value.end);
        if (prescriptionDate > endDate) return false;
      }
    }

    // Category filter
    const categoryFilter = filters.find((f) => f.id === "category");
    if (categoryFilter?.value && categoryFilter.value !== "") {
      if (prescription.category !== categoryFilter.value) return false;
    }

    // Prescribed By filter
    const prescribedByFilter = filters.find((f) => f.id === "prescribedBy");
    if (prescribedByFilter?.value && prescribedByFilter.value !== "") {
      if (prescription.prescribedBy !== prescribedByFilter.value) return false;
    }

    return true;
  });

  // Sort filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    const modifier = sortDirection === "asc" ? 1 : -1;

    if (typeof aValue === "string") {
      return aValue.localeCompare(bValue) * modifier;
    }
    return (aValue - bValue) * modifier;
  });

  // Table columns configuration
  const columns = [
    {
      id: "user",
      header: "User",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <Icons.User className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <div className="font-medium text-secondary-900">
              Prescription #{row.prescriptionNumber}
            </div>
            <div className="text-sm text-secondary-600">{row.userName}</div>
          </div>
        </div>
      ),
    },
    {
      id: "medications",
      header: "Medications",
      sortable: false,
      cell: (row) => (
        <div className="space-y-1">
          {row.medications.map((medication, index) => (
            <div key={index} className="text-sm text-secondary-900">
              {medication}
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "prescribedBy",
      header: "Prescribed By",
      sortable: true,
      cell: (row) => (
        <div className="text-sm text-secondary-900">{row.prescribedBy}</div>
      ),
    },
    {
      id: "prescriptionDate",
      header: "Date on Prescription",
      sortable: true,
      cell: (row) => (
        <div className="space-y-1">
          <div className="text-sm text-secondary-900">
            {new Date(row.prescriptionDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="text-xs text-secondary-500">
            Created on:{" "}
            {new Date(row.createdOn).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            {new Date(row.createdOn).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
        </div>
      ),
    },
    {
      id: "order",
      header: "#Order",
      sortable: true,
      cell: (row) => (
        <>
          <div className="flex items-center justify-start gap-2">
            <span className="text-sm text-secondary-900">
              #{row.orderNumber}
            </span>
            <div className="relative group flex flex-col items-center">
              <Button variant="outline" size="sm">
                <svg
                  className="h-6 w-6 text-gray-900 hover:text-indigo-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  x="0px"
                  y="0px"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  ></path>
                </svg>
              </Button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                View on WordPress
              </span>
            </div>
            <div className="relative group flex flex-col items-center">
              <Button variant="outline" size="sm">
                <svg
                  className=" h-7 w-7 text-gray-900 hover:text-indigo-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  x="0px"
                  y="0px"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M 12 2 C 6.5 2 2 6.5 2 12 C 2 17.5 6.5 22 12 22 C 17.5 22 22 17.5 22 12 C 22 6.5 17.5 2 12 2 z M 12 3 C 17 3 21 7 21 12 C 21 17 17 21 12 21 C 7 21 3 17 3 12 C 3 7 7 3 12 3 z M 12 4 C 9.2 4 6.7007812 5.3996094 5.3007812 7.5996094 L 5.8007812 7.5996094 C 6.7007813 7.5996094 8 7.5 8 7.5 C 8.4 7.5 8.4996094 8.0992188 8.0996094 8.1992188 C 8.0996094 8.1992188 7.6992187 8.3007812 7.1992188 8.3007812 L 9.9003906 16.199219 L 11.699219 10.900391 L 10.699219 8.1992188 C 10.299219 8.1992188 9.9003906 8.0996094 9.9003906 8.0996094 C 9.5003906 8.0996094 9.5 7.4003906 10 7.4003906 C 10 7.4003906 11.299609 7.5 12.099609 7.5 C 12.899609 7.5 14.199219 7.4003906 14.199219 7.4003906 C 14.599219 7.4003906 14.700781 7.9996094 14.300781 8.0996094 C 14.300781 8.0996094 13.900391 8.1992187 13.400391 8.1992188 L 16.300781 16.199219 L 17.099609 13.5 C 17.099609 12.5 17.400391 11.7 17.400391 11 C 17.400391 10.2 16.999219 9.9003906 16.699219 9.4003906 C 16.299219 8.7003906 16 8.2 16 7.5 C 16 6.8 16.600781 6.0996094 17.300781 6.0996094 L 17.400391 6.0996094 C 16.000391 4.7996094 14.1 4 12 4 z M 19 8.1992188 C 19 8.4992188 18.999609 8.7 19.099609 9 C 19.099609 9.8 19.000781 10.999609 18.800781 11.599609 C 18.200781 13.499609 16.400391 18.699219 16.400391 18.699219 C 16.400391 18.699219 16.499609 18.699609 16.599609 18.599609 C 18.699609 17.199609 20 14.8 20 12 C 20 10.6 19.6 9.2992187 19 8.1992188 z M 4.6992188 8.6992188 C 4.1992188 9.6992188 4 10.8 4 12 C 4 15.2 5.8 17.899219 8.5 19.199219 L 4.6992188 8.6992188 z M 12.099609 12.699219 L 9.6992188 19.699219 C 10.399219 19.899219 11.2 20 12 20 C 12.9 20 13.799219 19.8 14.699219 19.5 C 14.699219 19.5 14.699609 19.400391 14.599609 19.400391 L 12.099609 12.699219 z"></path>
                </svg>
              </Button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                View
              </span>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (row) => (
        <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1.5 rounded-full text-xs font-medium">
          {row.status}
        </div>
      ),
    },
  ];

  const handleSort = (columnId, direction) => {
    setSortColumn(columnId);
    setSortDirection(direction);
  };

  const handleExportData = () => {
    showSuccess("Data exported successfully!");
  };

  const handleGenerateInvoice = () => {
    showSuccess("Invoice generated successfully!");
  };

  const handleViewPrescription = (prescription) => {
    router.push(`/prescriptions/view/${prescription.id}`);
  };

  const handleBulkExport = () => {
    if (selectedRows.length === 0) {
      showSuccess("Please select prescriptions to export");
      return;
    }
    showSuccess(`${selectedRows.length} prescriptions exported successfully!`);
  };

  const handleBulkInvoice = () => {
    if (selectedRows.length === 0) {
      showSuccess("Please select prescriptions to generate invoices");
      return;
    }
    showSuccess(`Invoices generated for ${selectedRows.length} prescriptions!`);
  };

  const actions = (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportData}
        className="h-9"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Data
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleGenerateInvoice}
        className="h-9"
      >
        <FileText className="w-4 h-4 mr-2" />
        Generate Invoice
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <NotificationContainer />

      <PageHeader
        icon={Icons.BarChart3}
        title="Reports"
        description="View and analyze prescription reports"
        actions={actions}
      />

      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleFilterReset}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        className="mb-6"
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {selectedRows.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkExport}
                className="h-8"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Selected ({selectedRows.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkInvoice}
                className="h-8"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Invoices ({selectedRows.length})
              </Button>
            </>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={sortedData}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        selectable
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        pageSize={10}
      />
    </div>
  );
}
