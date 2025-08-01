"use client";

import Icons from "@/components/icons";
import { Button, DataTable, Filters, PageHeader } from "@/components/ui";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Scanner() {
  const router = useRouter();

  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
      id: "doc_type",
      type: "select",
      label: "Document Type",
      value: "",
      placeholder: "Select Document Type",
      options: [
        { value: "prescription", label: "Prescription" },
        { value: "photo_id", label: "Photo ID" },
        { value: "lab_reports", label: "Lab Reports" },
        { value: "other", label: "Other" },
      ],
    },
  ]);

  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Example data - replace with actual data fetching
  const [scannedDocuments] = useState(
    Array.from({ length: 100 }, (_, i) => {
      const id = i + 1;
      const types = ["Prescription", "Photo ID", "Lab Reports", "Other"];
      const type = types[i % types.length];
      const title = `${type} ${id}`;
      const order = (12345 + i).toString();
      // Cycle through October 2023 for dates
      const day = ((i % 30) + 1).toString().padStart(2, "0");
      const date = `2023-10-${day}`;
      return { id, title, order, type, date };
    })
  );

  const columns = [
    {
      id: "title",
      header: "Title",
      sortable: true,
      cell: (row) => row.title,
    },

    {
      id: "order",
      header: "order",
      sortable: true,
      cell: (row) => row.order,
    },

    {
      id: "type",
      header: "type",
      sortable: true,
      cell: (row) => row.type,
    },

    {
      id: "date",
      header: "Date",
      sortable: true,
      cell: (row) => row.date,
    },

    {
      id: "actions",
      header: "Actions",
      className: "text-right",
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToEditPage(row.id)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

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


  const goToCreatePage = () => {
    router.push("/scanner/create");
  }

  // Sort and filter data
  const filteredData = scannedDocuments
    .filter((prescriptions) => {
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

  const handleSort = (columnId, direction) => {
    setSortColumn(columnId);
    setSortDirection(direction);
  };

  const goToEditPage = (id) => {
   router.push(`/scanner/edit/${id}`);
  };
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <PageHeader
            icon={Icons.Scanner}
            title="Document Scanner"
            description="Manage and scan documents efficiently."
            actions={
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
                <Button onClick={() => goToCreatePage()}>Add New Scan</Button>
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
          selectable
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
        />
      </div>
    </>
  );
}
