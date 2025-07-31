"use client";
import { useState } from "react";
import { Button, DataTable, Filters, UserAvatar } from "@/components/ui";
import {
  Download,
  Mail,
  MoreHorizontal,
  Pencil,
  Router,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
export default function PrescriptionsPage() {
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

  // Example data - replace with actual data fetching
  const [prescriptions] = useState([
    {
      id: 1,
      patientName: "John Doe",
      medication: [
        {
          name: "Aspirne1",
          dose: "1.5 mg",
        },
      ],
      prescriber: "Dr. Smith",
      prescribed_date: "29 Jul, 2025",
      dosage: "100mg",
      frequency: "Once daily",
      startDate: "2023-01-01",
      endDate: "2023-01-10",
      status: "active",
      orderStatus: "Under Review",
    },
    // Add more example prescriptions...
  ]);

  const columns = [
    {
      id: "patientName",
      header: "Patient",
      sortable: true,
      cell: (row) => (
        <div
          className="flex items-center gap-3 hover:cursor-pointer"
        >
          <UserAvatar
            user={{
              name: row.patientName,
            }}
            size="sm"
          />
          <div onClick={() => goToViewPage(row.id)}>
            <div className="text-sm text-secondary-500 hover:underline">
              prescriptions #{row.id}
            </div>
            <div className="font-medium">{row.patientName}</div>
          </div>
        </div>
      ),
    },

    {
      id: "medication",
      header: "Medication",
      sortable: true,
      cell: (row) => (
        <ul className="list-disc">
          {row.medication.map((medication, index) => (
            <li key={index}>
              <b>{medication.name}</b> -{" "}
              <span className="font-medium bg-gray-100 px-2 py-1 text-xs rounded">
                {medication.dose}
              </span>
            </li>
          ))}
        </ul>
      ),
    },

    {
      id: "prescriber",
      header: "Prescriber",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <UserAvatar
            user={{
              name: row.prescriber,
            }}
            size="sm"
          />
          <div>
            <div className="font-medium">{row.prescriber}</div>
          </div>
        </div>
      ),
    },

    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (row) => (
        <>
          {row.status == "active" ? (
            <div className="text-green-700 font-medium">Active</div>
          ) : (
            <div className="text-red-700 font-medium">Inactive</div>
          )}
        </>
      ),
    },

    {
      id: "order",
      header: "#Order",
      sortable: true,
      cell: (row) => (
        <>
          <div className="flex items-center flex-col gap-2">
            <p className="text-sm text-gray-500 font-bold">#{row.id}</p>

            <p>
              <svg
                className="mr-2 h-7 w-7 text-gray-900 hover:text-indigo-900"
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
            </p>

            <p>
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
            </p>
          </div>
        </>
      ),
    },

    {
      id: "rx_copy",
      header: "Rx Copy",
      sortable: true,
      cell: (row) => (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-clipboard-copy-icon lucide-clipboard-copy"
          >
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            <path d="M16 4h2a2 2 0 0 1 2 2v4" />
            <path d="M21 14H11" />
            <path d="m15 10-4 4 4 4" />
          </svg>
        </>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      className: "text-right",
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <Button variant="ghost" size="sm" onClick = {() => goToEditPage(row.id)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Sort and filter data
  const filteredData = prescriptions
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
    router.push(`/prescriptions/create`);
  };

  const goToViewPage = (id) => {
    router.push(`/prescriptions/view/${id}`);
  };


  const goToEditPage = (id) => {
    router.push(`/prescriptions/edit/${id}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-secondary-900">Prescriptions</h1>
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
          <Button onClick={() => goToCreatePage()}>Add Prescriptions</Button>
        </div>
      </div>

      {/* Filters with inline search */}
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleFilterReset}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Prescriptions Table */}
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
  );
}
